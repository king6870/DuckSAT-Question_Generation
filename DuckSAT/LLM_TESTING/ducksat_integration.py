import os
import sys
import re
import json
import base64
import uuid

# DuckSAT integration functions for LLM TESTING

def parse_answers_to_options(answers_text):
    """Parse answers text into options array and determine correct answer index"""
    # Look for patterns like "A) option1 B) option2 C) option3 D) option4"
    # or "A. option1 B. option2 C. option3 D. option4"
    options = []
    correct_answer = 0

    # Split by letter patterns
    pattern = r'([A-D])[).]\s*([^A-D]+?)(?=[A-D][).]|\Z)'
    matches = re.findall(pattern, answers_text, re.IGNORECASE)

    if matches:
        for letter, option_text in matches:
            options.append(option_text.strip())
            # Assume first option is correct for now - this could be improved
            if letter.upper() == 'A':
                correct_answer = 0
    else:
        # Fallback: split by newlines or common separators
        lines = [line.strip() for line in answers_text.split('\n') if line.strip()]
        for line in lines[:4]:  # Take up to 4 options
            # Remove leading letters/numbers if present
            cleaned = re.sub(r'^[A-D][).]\s*', '', line, flags=re.IGNORECASE)
            options.append(cleaned)

    # Ensure we have exactly 4 options
    while len(options) < 4:
        options.append("")

    return options[:4], correct_answer

def determine_difficulty_and_subtopic(question_text, diagram_desc, category, subtopic):
    """Determine difficulty and subtopic based on question content"""
    text = (question_text + " " + diagram_desc).lower()

    # For SAT, use the provided subtopic, normalized
    subtopic_normalized = subtopic.lower().replace(' ', '-').replace('(', '').replace(')', '').replace(',', '').replace('–', '-').replace('&', 'and')

    # Determine difficulty based on complexity
    word_count = len(question_text.split())
    if 'complex' in text or 'advanced' in text or word_count > 50 or category == 'Math':
        difficulty = 'hard'
    elif 'calculate' in text or 'find' in text or 'determine' in text or word_count > 30:
        difficulty = 'medium'
    else:
        difficulty = 'easy'

    return difficulty, subtopic_normalized

def generate_image_from_vega_spec(spec, diagram_desc):
    """Generate image from Vega spec and save to DuckSAT public directory"""
    try:
        # Try to use DuckSAT's image generation service
        sys.path.append('../ducksat-app')
        try:
            from services.imageGenerationService import imageGenerationService
            chart_config = {
                'type': 'coordinate-plane',
                'description': diagram_desc,
                'width': 600,
                'height': 400,
                'vegaSpec': spec
            }
            image_url = imageGenerationService.generateSVGChart(chart_config)
            return image_url
        except ImportError:
            pass

        # Fallback: render using selenium and save to file
        from selenium import webdriver
        from selenium.webdriver.chrome.service import Service
        from webdriver_manager.chrome import ChromeDriverManager

        html_content = f"""<!DOCTYPE html>
<html>
<head>
<script src="https://cdn.jsdelivr.net/npm/vega@5"></script>
</head>
<body>
<div id="vis" style="width: 600px; height: 400px;"></div>
<script>
const spec = {json.dumps(spec)};
const view = new vega.View(vega.parse(spec)).renderer('canvas').initialize('#vis').runAsync();
</script>
</body>
</html>"""

        temp_file = 'temp_diagram.html'
        with open(temp_file, 'w') as f:
            f.write(html_content)

        options = webdriver.ChromeOptions()
        options.add_argument('--headless')
        options.add_argument('--no-sandbox')
        options.add_argument('--disable-dev-shm-usage')
        options.add_argument('--window-size=600,400')

        driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=options)
        driver.get(f'file://{os.path.abspath(temp_file)}')
        import time
        time.sleep(3)  # Wait for rendering

        canvas = driver.find_element('id', 'vis').find_element('tag name', 'canvas')
        screenshot = canvas.screenshot_as_png
        driver.quit()
        os.remove(temp_file)

        if screenshot:
            # Save to DuckSAT public directory
            os.makedirs('../ducksat-app/public/generated-images', exist_ok=True)
            filename = f"chart-{uuid.uuid4()}.png"
            filepath = f"../ducksat-app/public/generated-images/{filename}"

            with open(filepath, 'wb') as f:
                f.write(screenshot)

            return f"/generated-images/{filename}"

    except Exception as e:
        print(f"Image generation failed: {e}")

    return None

def store_question_in_ducksat(question_data):
    """Store question in DuckSAT database using direct SQL"""
    import psycopg2
    from dotenv import load_dotenv
    import json

    load_dotenv()
    database_url = os.getenv('DATABASE_URL')
    if not database_url:
        print("DATABASE_URL not found, skipping database storage")
        return None

    conn = None
    try:
        conn = psycopg2.connect(database_url)
        cur = conn.cursor()

        category = question_data.get('category', 'Math')
        subtopic_raw = question_data.get('subtopic', 'General')

        # Map category to moduleType and topic
        if category == 'Math':
            moduleType = 'math'
            topic_name = 'Math'
            topic_desc = 'SAT Math topics'
        elif category == 'Reading':
            moduleType = 'reading-writing'
            topic_name = 'Reading'
            topic_desc = 'SAT Reading topics'
        else:  # Writing
            moduleType = 'reading-writing'
            topic_name = 'Writing'
            topic_desc = 'SAT Writing and Language topics'

        # Parse answers
        options, correct_answer = parse_answers_to_options(question_data['answers'])

        # Determine metadata
        difficulty, subtopic = determine_difficulty_and_subtopic(
            question_data['question'],
            question_data.get('diagram_desc', ''),
            category,
            subtopic_raw
        )

        # Generate image only for Math or Reading data interp with spec
        image_url = None
        if question_data.get('spec') and (category == 'Math' or (category == 'Reading' and 'data interpretation' in subtopic_raw.lower())):
            image_url = generate_image_from_vega_spec(
                question_data['spec'],
                question_data.get('diagram_desc', '')
            )

        # Find topic
        cur.execute("SELECT id FROM topics WHERE name = %s", (topic_name,))
        topic_row = cur.fetchone()
        if not topic_row:
            print(f"Topic '{topic_name}' not found in database")
            return None
        topic_id = topic_row[0]

        # Find or create subtopic
        cur.execute("SELECT id FROM subtopics WHERE name = %s AND \"topicId\" = %s", (subtopic, topic_id))
        subtopic_row = cur.fetchone()
        if not subtopic_row:
            cur.execute("""
                INSERT INTO subtopics ("topicId", name, description)
                VALUES (%s, %s, %s)
                RETURNING id
            """, (topic_id, subtopic, f'{subtopic_raw} questions'))
            subtopic_id = cur.fetchone()[0]
        else:
            subtopic_id = subtopic_row[0]

        # Prepare explanation with content if needed
        explanation = question_data['explanation']
        content = question_data.get('content', '')
        if content:
            if category == 'Reading':
                explanation = f"Passage: {content}\n\n{explanation}"
            elif category == 'Writing':
                explanation = f"Text to Edit: {content}\n\n{explanation}"

        # Prepare chartData
        chartData = None
        if question_data.get('spec'):
            chartData = {
                'description': question_data.get('diagram_desc', ''),
                'interactionType': 'point-placement' if category == 'Math' else 'none',
                'graphType': 'coordinate-plane' if category == 'Math' else 'chart',
                'vegaSpec': question_data['spec']
            }

        # Time estimate based on category
        time_estimate = 120 if category == 'Math' else 90 if category == 'Reading' else 60

        # Create question
        cur.execute("""
            INSERT INTO questions (
                "subtopicId", "moduleType", difficulty, category, subtopic,
                question, options, "correctAnswer", explanation,
                "imageUrl", "chartData", "timeEstimate", source, tags
            )
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
            RETURNING id
        """, (
            subtopic_id, moduleType, difficulty, topic_name, subtopic,
            question_data['question'], json.dumps(options), correct_answer, explanation,
            image_url, json.dumps(chartData) if chartData else None, time_estimate,
            'LLM TESTING Generated', [difficulty, category.lower(), subtopic]
        ))
        question_id = cur.fetchone()[0]

        # Update subtopic count
        cur.execute("""
            UPDATE subtopics
            SET "currentCount" = "currentCount" + 1
            WHERE id = %s
        """, (subtopic_id,))

        conn.commit()
        print(f"✅ Question stored in DuckSAT database with ID: {question_id}")
        return question_id

    except Exception as e:
        print(f"Failed to store question in database: {e}")
        if conn:
            conn.rollback()
        return None
    finally:
        if conn:
            conn.close()
