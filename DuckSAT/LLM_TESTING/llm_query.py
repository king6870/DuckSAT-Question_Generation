

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
import random
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from dotenv import load_dotenv
import logging

# Parse command line arguments
parser = argparse.ArgumentParser(description='Generate SAT questions using LLMs')
parser.add_argument('--model1', type=str, help='Model name for LLM1 (question generation)')
parser.add_argument('--model2', type=str, help='Model name for LLM2 (diagram generation)')
parser.add_argument('--model3', type=str, help='Model name for LLM3 (checking)')
parser.add_argument('--temperature', type=float, default=0.7, help='Temperature for LLM queries (default: 0.7)')
parser.add_argument('--max_tokens', type=int, default=16384, help='Max tokens for LLM queries (default: 16384)')
parser.add_argument('--num_questions', type=int, default=5, help='Number of questions to generate (default: 5)')
parser.add_argument('--delay_minutes', type=float, default=0, help='Delay in minutes between questions (default: 0)')
parser.add_argument('--category', type=str, help='SAT category (Reading, Writing, Math)')
parser.add_argument('--subtopic', type=str, help='SAT subtopic')
parser.add_argument('--interactive', action='store_true', help='Run in interactive mode')

args = parser.parse_args()

# Load environment variables from .env file
load_dotenv()

# Setup module logger
logger = logging.getLogger(__name__)
if not logger.handlers:
    logger.setLevel(logging.INFO)
    handler = logging.StreamHandler()
    formatter = logging.Formatter('%(asctime)s - %(levelname)s - %(message)s')
    handler.setFormatter(formatter)
    logger.addHandler(handler)

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
    # Extract correct answer index
    correct_answer_match = re.search(r'Correct Answer Index:\s*(\d+)', response, re.IGNORECASE)
    correct_answer = int(correct_answer_match.group(1)) if correct_answer_match else 0

    # Extract options as JSON array
    options_match = re.search(r'Options:\s*(\[.*?\])', response, re.DOTALL | re.IGNORECASE)
    options = []
    if options_match:
        try:
            options = json.loads(options_match.group(1))
        except json.JSONDecodeError:
            # Fallback: parse as text
            options_text = options_match.group(1)
            options = [opt.strip() for opt in options_text.strip('[]').split(',') if opt.strip()]

    # Ensure exactly 4 options
    while len(options) < 4:
        options.append("")
    options = options[:4]

    # Shuffle options to randomize correct answer index
    if len(options) == 4 and 0 <= correct_answer < 4:
        correct_option = options[correct_answer]
        random.shuffle(options)
        correct_answer = options.index(correct_option)

    # Extract additional fields
    difficulty_match = re.search(r'Difficulty:\s*(easy|medium|hard)', response, re.IGNORECASE)
    difficulty = difficulty_match.group(1).lower() if difficulty_match else "medium"

    category_match = re.search(r'Category:\s*(.*?)\s*(?=Subtopic:|Difficulty:|Time Estimate:|Source:|Tags:|Wrong Answer Explanations:|Explanation:|Correct Answer Index:)', response, re.DOTALL | re.IGNORECASE)
    category = category_match.group(1).strip() if category_match else subtopic_category.lower().replace(" ", "-")

    subtopic_match = re.search(r'Subtopic:\s*(.*?)\s*(?=Difficulty:|Category:|Time Estimate:|Source:|Tags:|Wrong Answer Explanations:|Explanation:|Correct Answer Index:)', response, re.DOTALL | re.IGNORECASE)
    subtopic = subtopic_match.group(1).strip() if subtopic_match else ""

    time_estimate_match = re.search(r'Time Estimate:\s*(\d+)', response, re.IGNORECASE)
    time_estimate = int(time_estimate_match.group(1)) if time_estimate_match else 60

    source_match = re.search(r'Source:\s*(.*?)\s*(?=Tags:|Wrong Answer Explanations:|Explanation:|Correct Answer Index:)', response, re.DOTALL | re.IGNORECASE)
    source = source_match.group(1).strip() if source_match else "AI Generated"

    tags_match = re.search(r'Tags:\s*(\[.*?\])', response, re.DOTALL | re.IGNORECASE)
    tags = []
    if tags_match:
        try:
            tags = json.loads(tags_match.group(1))
        except json.JSONDecodeError:
            tags_text = tags_match.group(1)
            tags = [tag.strip() for tag in tags_text.strip('[]').split(',') if tag.strip()]

    wrong_answer_explanations_match = re.search(r'Wrong Answer Explanations:\s*(\[.*?\])', response, re.DOTALL | re.IGNORECASE)
    wrong_answer_explanations = []
    if wrong_answer_explanations_match:
        try:
            wrong_answer_explanations = json.loads(wrong_answer_explanations_match.group(1))
        except json.JSONDecodeError:
            pass  # Leave as empty list

    if subtopic_category == "Reading":
        passage_match = re.search(r'Passage:\s*(.*?)\s*Question:', response, re.DOTALL | re.IGNORECASE)
        question_match = re.search(r'Question:\s*(.*?)\s*Explanation:', response, re.DOTALL | re.IGNORECASE)
        exp_match = re.search(r'Explanation:\s*(.*?)\s*(?=Difficulty:|Category:|Subtopic:|Time Estimate:|Source:|Tags:|Wrong Answer Explanations:|Correct Answer Index:)', response, re.DOTALL | re.IGNORECASE)
        passage = passage_match.group(1).strip() if passage_match else ""
        question = question_match.group(1).strip() if question_match else ""
        explanation = exp_match.group(1).strip() if exp_match else ""
        return {
            "content": passage,
            "question": question,
            "explanation": explanation,
            "options": options,
            "correct_answer": correct_answer,
            "difficulty": difficulty,
            "category": category,
            "subtopic": subtopic,
            "time_estimate": time_estimate,
            "source": source,
            "tags": tags,
            "wrong_answer_explanations": wrong_answer_explanations
        }
    elif subtopic_category == "Writing":
        text_match = re.search(r'Text to Edit:\s*(.*?)\s*Question:', response, re.DOTALL | re.IGNORECASE)
        question_match = re.search(r'Question:\s*(.*?)\s*Explanation:', response, re.DOTALL | re.IGNORECASE)
        exp_match = re.search(r'Explanation:\s*(.*?)\s*(?=Difficulty:|Category:|Subtopic:|Time Estimate:|Source:|Tags:|Wrong Answer Explanations:|Correct Answer Index:)', response, re.DOTALL | re.IGNORECASE)
        text_to_edit = text_match.group(1).strip() if text_match else ""
        question = question_match.group(1).strip() if question_match else ""
        explanation = exp_match.group(1).strip() if exp_match else ""
        return {
            "content": text_to_edit,
            "question": question,
            "explanation": explanation,
            "options": options,
            "correct_answer": correct_answer,
            "difficulty": difficulty,
            "category": category,
            "subtopic": subtopic,
            "time_estimate": time_estimate,
            "source": source,
            "tags": tags,
            "wrong_answer_explanations": wrong_answer_explanations
        }
    else:  # Math
        desc_match = re.search(r'Diagram Description:\s*(.*?)\s*Question:', response, re.DOTALL | re.IGNORECASE)
        question_match = re.search(r'Question:\s*(.*?)\s*Explanation:', response, re.DOTALL | re.IGNORECASE)
        exp_match = re.search(r'Explanation:\s*(.*?)\s*(?=Difficulty:|Category:|Subtopic:|Time Estimate:|Source:|Tags:|Wrong Answer Explanations:|Correct Answer Index:)', response, re.DOTALL | re.IGNORECASE)
        diagram_desc = desc_match.group(1).strip() if desc_match else ""
        question = question_match.group(1).strip() if question_match else ""
        explanation = exp_match.group(1).strip() if exp_match else ""
        return {
            "content": diagram_desc,
            "question": question,
            "explanation": explanation,
            "options": options,
            "correct_answer": correct_answer,
            "difficulty": difficulty,
            "category": category,
            "subtopic": subtopic,
            "time_estimate": time_estimate,
            "source": source,
            "tags": tags,
            "wrong_answer_explanations": wrong_answer_explanations
        }

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
    logger.info(f"Querying LLM: model={model_name}, max_tokens={max_tokens}, temperature={temperature}")

    llms_config = load_llms_config()

    if model_name not in llms_config:
        logger.error(f"Model '{model_name}' not found in llms_config.json")
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
        logger.error("AZURE_OPENAI_API_KEY not set in .env file")
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
        logger.info(f"LLM response length: {len(response.choices[0].message.content)}")
        return response.choices[0].message.content
    except Exception as e:
        logger.error(f"Error querying LLM: {e}")
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

    # User input for LLM selection
    print("Available LLMs:")
    for i, model in enumerate(model_list):
        print(f"{i+1}. {model}")
    print("\nSelect 3 LLMs for the generation process (LLM1 for questions, LLM2 for diagrams, LLM3 for checking):")
    models = []
    for i in range(3):
        while True:
            try:
                choice = int(input(f"Choose LLM {i+1}: ")) - 1
                if 0 <= choice < len(model_list):
                    models.append(model_list[choice])
                    break
                else:
                    print("Invalid choice. Please select a valid number.")
            except ValueError:
                print("Please enter a number.")

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

    # User input for settings
    while True:
        try:
            temperature = float(input("Enter temperature (0.0-1.0, default 0.7): ") or 0.7)
            if 0.0 <= temperature <= 1.0:
                break
            else:
                print("Temperature must be between 0.0 and 1.0.")
        except ValueError:
            print("Please enter a valid number.")

    while True:
        try:
            max_tokens = int(input("Enter max tokens (default 16384): ") or 16384)
            if max_tokens > 0:
                break
            else:
                print("Max tokens must be positive.")
        except ValueError:
            print("Please enter a valid number.")

    while True:
        try:
            num_questions_per_subtopic = int(input("Enter number of questions per subtopic (default 1): ") or 1)
            if num_questions_per_subtopic > 0:
                break
            else:
                print("Number of questions must be positive.")
        except ValueError:
            print("Please enter a valid number.")

    while True:
        try:
            delay_minutes = float(input("Enter delay in minutes between questions (default 0): ") or 0)
            if delay_minutes >= 0:
                break
            else:
                print("Delay must be non-negative.")
        except ValueError:
            print("Please enter a valid number.")

    max_cycles_per_question = 3

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

            # Database schema context
            schema_context = """
Database Schema for SAT Questions:
- moduleType: 'reading-writing' | 'math'
- difficulty: 'easy' | 'medium' | 'hard'
- category: specific category like 'algebra', 'geometry', 'reading-comprehension', etc.
- subtopic: more specific subtopic (e.g., 'linear-equations', 'quadratic-functions')
- question: the question text
- passage: reading passages or context (for reading questions)
- options: array of 4 answer options
- correctAnswer: index of correct answer (0-3)
- explanation: detailed explanation for correct answer
- wrongAnswerExplanations: array of explanations for why each wrong answer is incorrect
- timeEstimate: estimated time in seconds
- source: source of the question (e.g., 'Official SAT', 'Khan Academy', 'AI Generated')
- tags: array of additional tags for categorization
"""

            # Set context and prompts based on category and subtopic
            if category == "Reading":
                context = f"{schema_context}\nYou are an expert SAT reading question creator specializing in {subtopic.lower()}. Create authentic SAT-style reading questions that test students' comprehension and analytical skills. Always specify the correct answer as an index (0-3) and format options as a JSON array. Include all database fields in your response."
                if subtopic == "Data Interpretation (Charts, Tables)":
                    prompt1 = f"Create a SAT reading question focused on {subtopic.lower()}. Include a data table or chart description, a passage that references the data, and a question with explanation. Format: Passage:, Question:, Explanation:, Difficulty:, Category:, Subtopic:, Time Estimate:, Source:, Tags: [JSON array], Wrong Answer Explanations: [JSON array], Correct Answer Index:, Options: [JSON array of 4 options]"
                else:
                    prompt1 = f"Create a SAT reading question focused on {subtopic.lower()}. Include a passage (200-400 words) and a question that tests {subtopic.lower()}. Format: Passage:, Question:, Explanation:, Difficulty:, Category:, Subtopic:, Time Estimate:, Source:, Tags: [JSON array], Wrong Answer Explanations: [JSON array], Correct Answer Index:, Options: [JSON array of 4 options]"
            elif category == "Writing":
                context = f"{schema_context}\nYou are an expert SAT writing question creator specializing in {subtopic.lower()}. Create questions that test grammar, style, and effective writing skills. Always specify the correct answer as an index (0-3) and format options as a JSON array. Include all database fields in your response."
                prompt1 = f"Create a SAT writing question focused on {subtopic.lower()}. Include text that needs editing/improvement and a question about the best way to revise it. Format: Text to Edit:, Question:, Explanation:, Difficulty:, Category:, Subtopic:, Time Estimate:, Source:, Tags: [JSON array], Wrong Answer Explanations: [JSON array], Correct Answer Index:, Options: [JSON array of 4 options]"
            else:  # Math
                context = f"{schema_context}\nYou are an expert SAT math question creator specializing in {subtopic.lower()}. Create challenging math questions with accurate solutions. Always specify the correct answer as an index (0-3) and format options as a JSON array. Include all database fields in your response."
                if "Geometry" in subtopic or subtopic in ["Graph Interpretation", "Trigonometry – Sine, Cosine, Tangent"]:
                    prompt1 = f"Create a SAT math question focused on {subtopic.lower()}. Include a diagram description and question with explanation. Format: Diagram Description:, Question:, Explanation:, Difficulty:, Category:, Subtopic:, Time Estimate:, Source:, Tags: [JSON array], Wrong Answer Explanations: [JSON array], Correct Answer Index:, Options: [JSON array of 4 options]"
                else:
                    prompt1 = f"Create a SAT math question focused on {subtopic.lower()} with explanation. Format: Question:, Explanation:, Difficulty:, Category:, Subtopic:, Time Estimate:, Source:, Tags: [JSON array], Wrong Answer Explanations: [JSON array], Correct Answer Index:, Options: [JSON array of 4 options]"

            for q_num in range(num_questions_per_subtopic):
                print(f"\n=== Generating Question {question_counter} ({subtopic}) ===")
                question_data = None

                for cycle in range(max_cycles_per_question):
                    print(f"\n--- Cycle {cycle + 1} ---")

                    # LLM1: Create question based on category
                    result1 = query_llm(models[0], prompt1, context, max_tokens, temperature)
                    if not result1:
                        print("No response from LLM 1.")
                        continue
                    print(f"LLM 1 ({models[0]}) Response:\n{result1}")

                    content, question, explanation, options, correct_answer = parse_llm1(result1, category)
                    answers = json.dumps(options)  # Store options as JSON string

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
                        result2 = query_llm(models[1], prompt2, context, max_tokens, temperature)
                        if not result2:
                            print("No response from LLM 2.")
                            continue
                        print(f"LLM 2 ({models[1]}) Response:\n{result2}")

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
                            result2_fix = query_llm(models[1], prompt2_fix, context, max_tokens, temperature)
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

                    result3 = query_llm(models[2], check_prompt, context, max_tokens, temperature)
                    if not result3:
                        print("No response from LLM 3.")
                        continue
                    print(f"LLM 3 ({models[2]}) Response:\n{result3}")

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

                    # Store in DuckSAT database BEFORE generating HTML
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
                            question_data['question_id'] = question_id  # Store ID for reference
                        else:
                            print("Failed to store in database, skipping question.")
                            continue

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
def generate_questions(category, subtopic, num_questions=1, models=None, temperature=0.7, max_tokens=16384, max_cycles_per_question=3, delay_minutes=0):
    """
    Generate SAT questions programmatically without user interaction.
    Returns a dict with 'questions' list containing generated question data.
    """
    llms_config = load_llms_config()
    if not llms_config:
        return {'error': 'No models configured in llms_config.json'}

    model_list = list(llms_config.keys())
    if len(model_list) < 3:
        return {'error': 'Need at least 3 models configured.'}

    # Use provided models or defaults
    if not models or len(models) < 3:
        models = [model_list[0]] * 3  # Use first model for all if not specified

    # Validate models exist
    for i, model in enumerate(models):
        if model not in model_list:
            models[i] = model_list[0]  # Fallback to first model

    questions_list = []

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

    # Validate category and subtopic
    if category not in sat_subtopics:
        return {'error': f'Invalid category: {category}. Must be one of {list(sat_subtopics.keys())}'}

    if subtopic not in sat_subtopics[category]:
        return {'error': f'Invalid subtopic: {subtopic}. Must be one of {sat_subtopics[category]}'}

    # Set context and prompts based on category and subtopic
    if category == "Reading":
        context = f"You are an expert SAT reading question creator specializing in {subtopic.lower()}. Create authentic SAT-style reading questions that test students' comprehension and analytical skills. Always specify the correct answer as an index (0-3) and format options as a JSON array."
        if subtopic == "Data Interpretation (Charts, Tables)":
            prompt1 = f"Create a SAT reading question focused on {subtopic.lower()}. Include a data table or chart description, a passage that references the data, and a question with explanation. Format: Passage:, Question:, Explanation:, Correct Answer Index:, Options: [JSON array of 4 options]"
        else:
            prompt1 = f"Create a SAT reading question focused on {subtopic.lower()}. Include a passage (200-400 words) and a question that tests {subtopic.lower()}. Format: Passage:, Question:, Explanation:, Correct Answer Index:, Options: [JSON array of 4 options]"
    elif category == "Writing":
        context = f"You are an expert SAT writing question creator specializing in {subtopic.lower()}. Create questions that test grammar, style, and effective writing skills. Always specify the correct answer as an index (0-3) and format options as a JSON array."
        prompt1 = f"Create a SAT writing question focused on {subtopic.lower()}. Include text that needs editing/improvement and a question about the best way to revise it. Format: Text to Edit:, Question:, Explanation:, Correct Answer Index:, Options: [JSON array of 4 options]"
    else:  # Math
        context = f"You are an expert SAT math question creator specializing in {subtopic.lower()}. Create challenging math questions with accurate solutions. Always specify the correct answer as an index (0-3) and format options as a JSON array."
        if "Geometry" in subtopic or subtopic in ["Graph Interpretation", "Trigonometry – Sine, Cosine, Tangent"]:
            prompt1 = f"Create a SAT math question focused on {subtopic.lower()}. Include a diagram description and question with explanation. Format: Diagram Description:, Question:, Explanation:, Correct Answer Index:, Options: [JSON array of 4 options]"
        else:
            prompt1 = f"Create a SAT math question focused on {subtopic.lower()} with explanation. Format: Question:, Explanation:, Correct Answer Index:, Options: [JSON array of 4 options]"

    for q_num in range(num_questions):
        question_data = None

        for cycle in range(max_cycles_per_question):
            # LLM1: Create question based on category
            result1 = query_llm(models[0], prompt1, context, max_tokens, temperature)
            if not result1:
                continue
            print(f"LLM 1 ({models[0]}) Response:\n{result1}")

            content, question, explanation, options, correct_answer = parse_llm1(result1, category)
            answers = json.dumps(options)  # Store options as JSON string

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
                result2 = query_llm(models[1], prompt2, context, max_tokens, temperature)
                if not result2:
                    continue
                print(f"LLM 2 ({models[1]}) Response:\n{result2}")

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
                    result2_fix = query_llm(models[1], prompt2_fix, context, max_tokens, temperature)
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

            result3 = query_llm(models[2], check_prompt, context, max_tokens, temperature)
            if not result3:
                continue
            print(f"LLM 3 ({models[2]}) Response:\n{result3}")

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

            # Store in DuckSAT database BEFORE generating HTML
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
                    question_data['question_id'] = question_id  # Store ID for reference
                else:
                    print("Failed to store in database, skipping question.")
                    continue

            break

        if question_data:
            questions_list.append(question_data)

            # Add delay between questions if specified
            if delay_minutes > 0 and q_num < num_questions - 1:
                print(f"Waiting {delay_minutes} minutes before next question...")
                time.sleep(delay_minutes * 60)

    return {'questions': questions_list}

if __name__ == '__main__':
    if args.interactive:
        interactive_mode()
    else:
        result = generate_questions(
            category=args.category,
            subtopic=args.subtopic,
            num_questions=args.num_questions,
            models=[args.model1, args.model2, args.model3] if args.model1 and args.model2 and args.model3 else None,
            temperature=args.temperature,
            max_tokens=args.max_tokens,
            delay_minutes=args.delay_minutes
        )
        print(result)
