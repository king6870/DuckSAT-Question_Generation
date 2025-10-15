
import os
import argparse
import json
import re
import requests
import openai
import webbrowser
import base64
import time
import sys
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from dotenv import load_dotenv

# DuckSAT integration is handled in ducksat_integration.py
DUCKSAT_AVAILABLE = True

# Import DuckSAT integration functions
try:
    from ducksat_integration import store_question_in_ducksat
    DUCKSAT_INTEGRATION_AVAILABLE = True
except ImportError:
    DUCKSAT_INTEGRATION_AVAILABLE = False
    print("Warning: DuckSAT integration functions not available.")

try:
    OpenAI = openai.OpenAI
except AttributeError:
    OpenAI = None

def load_llms_config():
    try:
        config_path = os.path.join(os.path.dirname(__file__), 'llms_config.json')
        with open(config_path, 'r') as f:
            return json.load(f)
    except FileNotFoundError:
        return {}

def parse_llm1(response, subtopic_category):
    if subtopic_category == "Reading":
        passage_match = re.search(r'Passage:\s*(.*?)\s*Question:', response, re.DOTALL | re.IGNORECASE)
        question_match = re.search(r'Question:\s*(.*?)\s*Explanation:', response, re.DOTALL | re.IGNORECASE)
        exp_match = re.search(r'Explanation:\s*(.*?)\s*Answers:', response, re.DOTALL | re.IGNORECASE)
        ans_match = re.search(r'Answers:\s*(.*)', response, re.DOTALL | re.IGNORECASE)
        passage = passage_match.group(1).strip() if passage_match else ""
        question = question_match.group(1).strip() if question_match else ""
        explanation = exp_match.group(1).strip() if exp_match else ""
        answers = ans_match.group(1).strip() if ans_match else ""
        return passage, question, explanation, answers
    elif subtopic_category == "Writing":
        text_match = re.search(r'Text to Edit:\s*(.*?)\s*Question:', response, re.DOTALL | re.IGNORECASE)
        question_match = re.search(r'Question:\s*(.*?)\s*Explanation:', response, re.DOTALL | re.IGNORECASE)
        exp_match = re.search(r'Explanation:\s*(.*?)\s*Answers:', response, re.DOTALL | re.IGNORECASE)
        ans_match = re.search(r'Answers:\s*(.*)', response, re.DOTALL | re.IGNORECASE)
        text_to_edit = text_match.group(1).strip() if text_match else ""
        question = question_match.group(1).strip() if question_match else ""
        explanation = exp_match.group(1).strip() if exp_match else ""
        answers = ans_match.group(1).strip() if ans_match else ""
        return text_to_edit, question, explanation, answers
    else:  # Math
        desc_match = re.search(r'Diagram Description:\s*(.*?)\s*Question:', response, re.DOTALL | re.IGNORECASE)
        question_match = re.search(r'Question:\s*(.*?)\s*Explanation:', response, re.DOTALL | re.IGNORECASE)
        exp_match = re.search(r'Explanation:\s*(.*?)\s*Answers:', response, re.DOTALL | re.IGNORECASE)
        ans_match = re.search(r'Answers:\s*(.*)', response, re.DOTALL | re.IGNORECASE)
        diagram_desc = desc_match.group(1).strip() if desc_match else ""
        question = question_match.group(1).strip() if question_match else ""
        explanation = exp_match.group(1).strip() if exp_match else ""
        answers = ans_match.group(1).strip() if ans_match else ""
        return diagram_desc, question, explanation, answers

def render_vega_to_base64(spec):
    try:
        html_content = f"""<!DOCTYPE html>
<html>
<head>
<script src="https://cdn.jsdelivr.net/npm/vega@5"></script>
</head>
<body>
<div id="vis" style="width: 400px; height: 300px;"></div>
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
        options.add_argument('--window-size=400,300')
        
        driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=options)
        driver.get(f'file://{os.path.abspath(temp_file)}')
        time.sleep(3)  # Wait for rendering
        
        canvas = driver.find_element('id', 'vis').find_element('tag name', 'canvas')
        screenshot = canvas.screenshot_as_png
        driver.quit()
        os.remove(temp_file)
        
        return base64.b64encode(screenshot).decode('utf-8')
    except Exception as e:
        print(f"Failed to render diagram to image: {e}. Falling back to spec text.")
        return None

def query_llm(model_name, prompt, context, max_tokens, temperature, image_b64=None):
    llms_config = load_llms_config()

    if model_name not in llms_config:
        print(f"Model '{model_name}' not found in llms_config.json")
        return

    llm_data = llms_config[model_name]
    endpoint = llm_data['endpoint']
    deployment = llm_data['model']
    api_version = llm_data.get('api_version', '2024-12-01-preview')

    # Adjust temperature for models that require it
    if deployment == 'gpt-5':
        temperature = 1.0

    api_key = os.getenv("AZURE_OPENAI_API_KEY")
    if not api_key:
        print("Please set AZURE_OPENAI_API_KEY in your .env file.")
        return

    if image_b64:
        user_content = [
            {"type": "text", "text": prompt},
            {"type": "image_url", "image_url": {"url": f"data:image/png;base64,{image_b64}"}}
        ]
    else:
        user_content = prompt

    messages = [
        {"role": "system", "content": context},
        {"role": "user", "content": user_content}
    ]

    try:
        if "cognitiveservices.azure.com" in endpoint or "openai.azure.com" in endpoint:
            # Azure OpenAI
            client = openai.AzureOpenAI(
                api_version=api_version,
                azure_endpoint=endpoint,
                api_key=api_key,
            )
            response = client.chat.completions.create(
                model=deployment,
                messages=messages,
                max_completion_tokens=max_tokens,
                temperature=temperature,
                timeout=120,
            )
        else:
            if "/models/" in endpoint:
                # Azure AI
                headers = {
                    "Authorization": f"Bearer {api_key}",
                    "Content-Type": "application/json",
                    "api-version": api_version
                }
                payload = {
                    "model": deployment,
                    "messages": messages,
                    "max_tokens": max_tokens,
                    "temperature": temperature
                }
                response = requests.post(endpoint, headers=headers, json=payload)
                response.raise_for_status()
                data = response.json()
                return data["choices"][0]["message"]["content"]
            else:
                # Other OpenAI compatible
                base_url = endpoint
                default_headers = {}
                if "?" in endpoint:
                    base_url, query = endpoint.split("?", 1)
                    for param in query.split("&"):
                        if "=" in param:
                            key, value = param.split("=", 1)
                            default_headers[key] = value
                if OpenAI is None:
                    print("OpenAI client not available in this openai library version.")
                    return
                client = OpenAI(
                    base_url=base_url,
                    api_key=api_key,
                    default_headers=default_headers,
                )
                response = client.chat.completions.create(
                    model=deployment,
                    messages=messages,
                    max_completion_tokens=max_tokens,
                    temperature=temperature,
                )
                return response.choices[0].message.content
        # Immediately delete api_key from memory
        del api_key
        return response.choices[0].message.content
    except Exception as e:
        print(f"Error querying LLM: {e}")
        return None

def interactive_mode():
    llms_config = load_llms_config()
    if not llms_config:
        print("No models configured in llms_config.json")
        return

    model_list = list(llms_config.keys())
    if len(model_list) < 3:
        print("Need at least 3 models configured.")
        return

    # Choose models for each LLM
    models = {}
    for i in range(1, 4):
        print("Available models:")
        for j, name in enumerate(model_list, 1):
            print(f"{j}. {name}")
        choice_input = input(f"Choose model for LLM {i} (enter number 1-{len(model_list)} or model name): ").strip()
        if choice_input.isdigit():
            choice = int(choice_input)
            if 1 <= choice <= len(model_list):
                models[i] = model_list[choice - 1]
            else:
                print("Invalid number, using first model.")
                models[i] = model_list[0]
        elif choice_input in model_list:
            models[i] = choice_input
        else:
            print("Invalid input, using first model.")
            models[i] = model_list[0]

    # SAT Subtopics
    sat_subtopics = {
        "Reading": [
            "Comprehension",
            "Vocabulary in Context",
            "Inference",
            "Main Idea & Supporting Details",
            "Text Structure & Purpose",
            "Rhetorical Effect",
            "Data Interpretation (Charts, Tables)"
        ],
        "Writing": [
            "Sentence Structure",
            "Grammar & Usage",
            "Punctuation",
            "Conciseness & Clarity",
            "Logical Flow",
            "Tone & Style",
            "Transitions & Organization"
        ],
        "Math": [
            "Linear Equations",
            "Inequalities",
            "Systems of Equations",
            "Quadratic Equations",
            "Polynomials",
            "Rational Expressions",
            "Exponents & Radicals",
            "Ratios & Proportions",
            "Percentages",
            "Statistics & Probability",
            "Graph Interpretation",
            "Geometry – Angles",
            "Geometry – Triangles",
            "Geometry – Circles",
            "Geometry – Coordinate Geometry",
            "Trigonometry – Sine, Cosine, Tangent"
        ]
    }

    temperature = float(input("Enter temperature (default: 0.7): ").strip() or 0.7)
    max_tokens = int(input("Enter max tokens (default: 16384): ").strip() or 16384)
    num_questions_per_subtopic = int(input("Enter number of questions to generate per subtopic: ").strip() or 1)
    max_cycles_per_question = int(input("Enter max cycles per question: ").strip() or 3)

    questions_list = []
    question_counter = 1

    for category, subtopics in sat_subtopics.items():
        print(f"\n{'='*50}")
        print(f"GENERATING QUESTIONS FOR {category.upper()} SUBTOPICS")
        print(f"{'='*50}")

        for subtopic in subtopics:
            print(f"\n{'-'*30}")
            print(f"SUBTOPIC: {subtopic}")
            print(f"{'-'*30}")

            # Set context and prompts based on category and subtopic
            if category == "Reading":
                context = f"You are an expert SAT reading question creator specializing in {subtopic.lower()}. Create authentic SAT-style reading questions that test students' comprehension and analytical skills."
                if subtopic == "Data Interpretation (Charts, Tables)":
                    prompt1 = f"Create a SAT reading question focused on {subtopic.lower()}. Include a data table or chart description, a passage that references the data, and a question with explanation and answers. Format: Passage:, Question:, Explanation:, Answers:"
                else:
                    prompt1 = f"Create a SAT reading question focused on {subtopic.lower()}. Include a passage (200-400 words) and a question that tests {subtopic.lower()}. Format: Passage:, Question:, Explanation:, Answers:"
            elif category == "Writing":
                context = f"You are an expert SAT writing question creator specializing in {subtopic.lower()}. Create questions that test grammar, style, and effective writing skills."
                prompt1 = f"Create a SAT writing question focused on {subtopic.lower()}. Include text that needs editing/improvement and a question about the best way to revise it. Format: Text to Edit:, Question:, Explanation:, Answers:"
            else:  # Math
                context = f"You are an expert SAT math question creator specializing in {subtopic.lower()}. Create challenging math questions with accurate solutions."
                if "Geometry" in subtopic or subtopic in ["Graph Interpretation", "Trigonometry – Sine, Cosine, Tangent"]:
                    prompt1 = f"Create a SAT math question focused on {subtopic.lower()}. Include a diagram description and question with explanation and answers. Format: Diagram Description:, Question:, Explanation:, Answers:"
                else:
                    prompt1 = f"Create a SAT math question focused on {subtopic.lower()} with explanation and answers. Format: Question:, Explanation:, Answers:"

            for q_num in range(num_questions_per_subtopic):
                print(f"\n=== Generating Question {question_counter} ({subtopic}) ===")
                question_data = None

                for cycle in range(max_cycles_per_question):
                    print(f"\n--- Cycle {cycle + 1} ---")

                    # LLM1: Create question based on category
                    result1 = query_llm(models[1], prompt1, context, max_tokens, temperature)
                    if not result1:
                        print("No response from LLM 1.")
                        continue
                    print(f"LLM 1 ({models[1]}) Response:\n{result1}")

                    content, question, explanation, answers = parse_llm1(result1, category)

                    # Handle different content types
                    if category == "Reading":
                        if subtopic == "Data Interpretation (Charts, Tables)":
                            # For data interpretation, we need to create a chart/table spec
                            diagram_desc = content  # This contains chart/table description
                            spec = None
                            prompt2 = f"Create a valid Vega JSON spec ONLY for the chart/table described as: {diagram_desc}. Do NOT include any explanations or extra text. The output must be a valid Vega JSON spec."
                        else:
                            # Regular reading passage - no diagram needed
                            diagram_desc = ""
                            spec = None
                    elif category == "Writing":
                        # Writing questions don't need diagrams
                        diagram_desc = ""
                        spec = None
                    else:  # Math
                        diagram_desc = content
                        spec = None

                    # Only create Vega spec for Math geometry questions or Reading data interpretation
                    if spec is None and ((category == "Math" and ("Geometry" in subtopic or subtopic in ["Graph Interpretation", "Trigonometry – Sine, Cosine, Tangent"])) or (category == "Reading" and subtopic == "Data Interpretation (Charts, Tables)")):
                        # LLM2: Create Vega spec
                        prompt2 = f"Create a valid Vega JSON spec ONLY for the diagram described as: {diagram_desc}. Do NOT include any explanations or extra text. The output must be a valid Vega JSON spec. Double check it twice to ensure it's 100% accurate."
                        result2 = query_llm(models[2], prompt2, context, max_tokens, temperature)
                        if not result2:
                            print("No response from LLM 2.")
                            continue
                        print(f"LLM 2 ({models[2]}) Response:\n{result2}")

                        # Extract and validate Vega spec
                        json_match = re.search(r'```json\s*(.*?)\s*```', result2, re.DOTALL | re.IGNORECASE)
                        if json_match:
                            spec_str = json_match.group(1)
                        else:
                            spec_str = result2
                        spec = None
                        error_msg = ""
                        try:
                            spec = json.loads(spec_str)
                            # Validate Vega spec keys
                            required_keys = ["$schema", "marks"]
                            if not all(key in spec for key in required_keys):
                                error_msg = f"Missing required keys: {', '.join([k for k in required_keys if k not in spec])}"
                                spec = None
                        except json.JSONDecodeError as e:
                            error_msg = f"Invalid JSON: {str(e)}"

                        if spec is None:
                            # Try to fix the spec
                            print(f"Vega spec error: {error_msg}")
                            prompt2_fix = f"The previous Vega spec was invalid: {error_msg}. Please fix it for the diagram described as: {diagram_desc}, and the question: {question}. Output only the corrected valid Vega JSON spec."
                            result2_fix = query_llm(models[2], prompt2_fix, context, max_tokens, temperature)
                            if result2_fix:
                                print(f"LLM 2 fix attempt Response:\n{result2_fix}")
                                json_match_fix = re.search(r'```json\s*(.*?)\s*```', result2_fix, re.DOTALL | re.IGNORECASE)
                                if json_match_fix:
                                    spec_str = json_match_fix.group(1)
                                else:
                                    spec_str = result2_fix
                                try:
                                    spec = json.loads(spec_str)
                                    if not all(key in spec for key in required_keys):
                                        print("Still invalid after fix, restarting cycle.")
                                        continue
                                except json.JSONDecodeError:
                                    print("Still invalid JSON after fix, restarting cycle.")
                                    continue
                            else:
                                print("No fix response, restarting cycle.")
                                continue

                    # LLM3: Check work
                    if spec:
                        check_prompt = f"Check the following work: Vega spec: {json.dumps(spec)}, Diagram description: {diagram_desc}, Question: {question}, Explanation: {explanation}, Answers: {answers}. Verify if LLM1 and LLM2 did their work accurately. If something is wrong, describe what and suggest corrections. If all is correct, say 'All work is accurate.'"
                    else:
                        check_prompt = f"Check the following work: Question: {question}, Explanation: {explanation}, Answers: {answers}. Verify if the question is accurate for SAT {category} {subtopic}. If something is wrong, describe what and suggest corrections. If all is correct, say 'All work is accurate.'"

                    result3 = query_llm(models[3], check_prompt, context, max_tokens, temperature)
                    if not result3:
                        print("No response from LLM 3.")
                        continue
                    print(f"LLM 3 ({models[3]}) Response:\n{result3}")

                    if "wrong" in result3.lower() or "incorrect" in result3.lower():
                        print("LLM3 found issues, repeating cycle.")
                        continue

                    # Process complete
                    print("Process complete for this question.")
                    question_data = {
                        "category": category,
                        "subtopic": subtopic,
                        "question": question,
                        "explanation": explanation,
                        "answers": answers,
                        "content": content,  # passage for reading, text_to_edit for writing, diagram_desc for math
                        "spec": spec
                    }

                    # Store in DuckSAT database if integration available
                    if DUCKSAT_INTEGRATION_AVAILABLE:
                        storage_data = {
                            'question': question,
                            'explanation': explanation,
                            'answers': answers,
                            'spec': spec,
                            'diagram_desc': content if category == 'Math' or (category == 'Reading' and subtopic == "Data Interpretation (Charts, Tables)") else '',
                            'category': category,
                            'subtopic': subtopic,
                            'content': content
                        }
                        question_id = store_question_in_ducksat(storage_data)
                        if question_id:
                            print(f"Stored in database with ID: {question_id}")

                    break

                if question_data:
                    questions_list.append(question_data)
                    question_counter += 1

    # Generate single HTML for all questions
    if questions_list:
        html_content = """<!DOCTYPE html>
<html>
<head>
<title>SAT Questions</title>
<script src="https://cdn.jsdelivr.net/npm/vega@5"></script>
<style>
body { font-family: Arial, sans-serif; margin: 20px; }
.question { background-color: #f0f0f0; padding: 15px; border-radius: 5px; margin-bottom: 20px; }
.passage { background-color: #ffffff; border-left: 4px solid #007bff; padding: 10px; margin: 10px 0; font-style: italic; }
.text-to-edit { background-color: #fff3cd; border: 1px solid #ffeaa7; padding: 10px; margin: 10px 0; }
.diagram { margin: 20px 0; border: 1px solid #ddd; padding: 10px; }
.category-tag { background-color: #007bff; color: white; padding: 2px 8px; border-radius: 3px; font-size: 12px; margin-bottom: 10px; display: inline-block; }
.subtopic-tag { background-color: #28a745; color: white; padding: 2px 8px; border-radius: 3px; font-size: 12px; margin-left: 10px; }
</style>
</head>
<body>
<h1>SAT Questions by Subtopic</h1>
"""
        for i, q_data in enumerate(questions_list, 1):
            category = q_data['category']
            subtopic = q_data['subtopic']
            content = q_data['content']
            spec = q_data['spec']

            html_content += f"""
<div class="question">
<span class="category-tag">{category}</span><span class="subtopic-tag">{subtopic}</span>
<h2>Question {i}:</h2>
"""

            # Add content based on category
            if category == "Reading":
                if subtopic == "Data Interpretation (Charts, Tables)":
                    html_content += f"""
<div class="passage">{content}</div>
<p><strong>Question:</strong> {q_data['question']}</p>
"""
                else:
                    html_content += f"""
<div class="passage">{content}</div>
<p><strong>Question:</strong> {q_data['question']}</p>
"""
            elif category == "Writing":
                html_content += f"""
<div class="text-to-edit">{content}</div>
<p><strong>Question:</strong> {q_data['question']}</p>
"""
            else:  # Math
                html_content += f"""
<p>{q_data['question']}</p>
"""

            html_content += f"""
<h3>Explanation:</h3>
<p>{q_data['explanation']}</p>
<h3>Answers:</h3>
<p>{q_data['answers']}</p>
"""

            # Add diagram if it exists
            if spec:
                html_content += f"""
<div class="diagram">
<h3>Diagram:</h3>
<div id="vis{i}"></div>
</div>
</div>
<script>
const spec{i} = {json.dumps(spec)};
const view{i} = new vega.View(vega.parse(spec{i})).renderer('canvas').initialize('#vis{i}').run();
</script>
"""
            else:
                html_content += "</div>"

        html_content += "</body></html>"
        filename = "sat_questions.html"
        with open(filename, 'w', encoding='utf-8') as f:
            f.write(html_content)
        print(f"All questions HTML generated and saved to {filename}")
        print(f"Generated {len(questions_list)} questions across {len(sat_subtopics)} categories:")
        for category, subtopics in sat_subtopics.items():
            category_count = sum(1 for q in questions_list if q['category'] == category)
            print(f"  {category}: {category_count} questions")
        webbrowser.open(f'file://{os.path.abspath(filename)}')
    else:
        print("No questions were successfully generated.")
def main():
    load_dotenv()

    parser = argparse.ArgumentParser(description="Query LLM model")
    parser.add_argument("--interactive", action="store_true", help="Run in interactive mode")
    parser.add_argument("--test", action="store_true", help="Run a single test query")
    parser.add_argument("--model", help="Model name from llms_config.json")
    parser.add_argument("--prompt", help="User prompt")
    parser.add_argument("--context", default="You are a helpful assistant.", help="System context")
    parser.add_argument("--max_tokens", type=int, default=16384, help="Max tokens")
    parser.add_argument("--temperature", type=float, default=0.7, help="Temperature")

    args = parser.parse_args()

    if args.interactive:
        interactive_mode()
    elif args.test:
        model = args.model or "gpt-5"
        prompt = args.prompt or "Hello, how are you?"
        result = query_llm(model, prompt, args.context, args.max_tokens, args.temperature)
        if result:
            print(result)
    else:
        if not args.model or not args.prompt:
            print("Model and prompt are required in non-interactive mode. Use --test for defaults.")
            return
        result = query_llm(args.model, args.prompt, args.context, args.max_tokens, args.temperature)
        if result:
            print(result)

if __name__ == "__main__":
    main()
