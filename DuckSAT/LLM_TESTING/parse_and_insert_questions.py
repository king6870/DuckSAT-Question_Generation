import os
import json
import re
import base64
from bs4 import BeautifulSoup
from ducksat_integration import store_question_in_ducksat

def parse_html_questions(html_file):
    """Parse the SAT questions HTML file and extract question data"""
    with open(html_file, 'r', encoding='utf-8') as f:
        soup = BeautifulSoup(f.read(), 'html.parser')

    questions = []
    question_divs = soup.find_all('div', class_='question')

    for i, div in enumerate(question_divs, 1):
        # Extract category and subtopic
        category_tag = div.find('span', class_='category-tag')
        subtopic_tag = div.find('span', class_='subtopic-tag')

        category = category_tag.text.strip() if category_tag else 'Math'  # Default to Math for geometry questions
        subtopic = subtopic_tag.text.strip() if subtopic_tag else 'Geometry'

        # Map Writing to Reading since both are reading-writing module
        if category == 'Writing':
            category = 'Reading'

        # Extract question text
        question_h2 = div.find('h2')
        question_text = question_h2.text.strip() if question_h2 else ''

        # Extract passage or text to edit
        passage = div.find('div', class_='passage')
        text_to_edit = div.find('div', class_='text-to-edit')

        content = ''
        if passage:
            content = passage.text.strip()
        elif text_to_edit:
            content = text_to_edit.text.strip()

        # Extract question (if separate from h2)
        question_p = div.find('p', string=re.compile(r'Question:', re.I))
        if question_p:
            question_text = question_p.text.replace('Question:', '').strip()

        # Extract explanation
        explanation_h3 = div.find('h3', string='Explanation:')
        explanation = ''
        if explanation_h3:
            explanation_p = explanation_h3.find_next_sibling('p')
            if explanation_p:
                explanation = explanation_p.text.strip()

        # Extract answers
        answers_h3 = div.find('h3', string='Answers:')
        answers = ''
        if answers_h3:
            answers_p = answers_h3.find_next_sibling('p')
            if answers_p:
                answers = answers_p.text.strip()

        # Extract diagram spec if exists
        spec = None
        diagram_div = div.find('div', class_='diagram')
        if diagram_div:
            script_tag = diagram_div.find_next_sibling('script')
            if script_tag:
                script_content = script_tag.string
                # Extract the spec variable
                spec_match = re.search(r'const spec\d+ = ({.*?});', script_content, re.DOTALL)
                if spec_match:
                    spec_str = spec_match.group(1)
                    try:
                        spec = json.loads(spec_str)
                    except json.JSONDecodeError:
                        print(f"Failed to parse spec for question {i}")

        # Determine correct answer from explanation or answers
        correct_answer = 0  # Default to first
        if 'Correct answer:' in explanation:
            correct_match = re.search(r'Correct answer:\s*([A-D])', explanation, re.I)
            if correct_match:
                letter = correct_match.group(1).upper()
                correct_answer = ord(letter) - ord('A')
        elif 'Choice B' in explanation or 'B)' in answers:
            # Fallback heuristics
            if 'B)' in answers or 'Choice B' in explanation:
                correct_answer = 1

        # Prepare data for storage
        question_data = {
            'category': category,
            'subtopic': subtopic,
            'question': question_text,
            'explanation': explanation,
            'answers': answers,
            'spec': spec,
            'diagram_desc': content if category == 'Math' or (category == 'Reading' and 'Data Interpretation' in subtopic) else '',
            'content': content
        }

        questions.append(question_data)

    return questions

def main():
    html_file = 'sat_questions.html'
    if not os.path.exists(html_file):
        print(f"HTML file {html_file} not found.")
        return

    print("Parsing HTML file...")
    questions = parse_html_questions(html_file)
    print(f"Found {len(questions)} questions.")

    print("Inserting questions into database...")
    inserted_count = 0
    for i, q_data in enumerate(questions, 1):
        print(f"Inserting question {i}: {q_data['category']} - {q_data['subtopic']}")
        question_id = store_question_in_ducksat(q_data)
        if question_id:
            inserted_count += 1
            print(f"✅ Inserted with ID: {question_id}")
        else:
            print("❌ Failed to insert")

    print(f"\nCompleted: {inserted_count}/{len(questions)} questions inserted successfully.")

if __name__ == "__main__":
    main()
