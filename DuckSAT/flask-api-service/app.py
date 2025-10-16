from flask import Flask, request, jsonify
from logger import setup_logger
import sys
import os

# Add LLM_TESTING to path to import functions
sys.path.append(os.path.join(os.path.dirname(__file__), '..', 'LLM_TESTING'))
try:
    from llm_query import generate_questions
    LLM_QUERY_AVAILABLE = True
    print("Successfully imported generate_questions")
except ImportError as e:
    LLM_QUERY_AVAILABLE = False
    print(f"Warning: llm_query.generate_questions not available: {e}")

app = Flask(__name__)

# Set up logger
logger = setup_logger()

@app.route('/welcome', methods=['GET'])
def welcome():
    """
    Returns a welcome message and logs the request
    """
    logger.info(f"Request received: {request.method} {request.path}")
    return jsonify({'message': 'Welcome to the Flask API Service!'})

@app.route('/generate-questions', methods=['POST'])
def generate_questions_endpoint():
    """
    Generate SAT questions and store in database
    Expects JSON payload with: category, subtopic, num_questions, etc.
    """
    if not LLM_QUERY_AVAILABLE:
        return jsonify({'error': 'Question generation service not available'}), 503

    try:
        data = request.get_json()
        if not data:
            return jsonify({'error': 'No JSON payload provided'}), 400

        category = data.get('category', 'Math')
        subtopic = data.get('subtopic', 'Linear Equations')
        num_questions = data.get('num_questions', 1)
        models = data.get('models', ['gpt-5', 'gpt-5', 'gpt-5'])  # Default models
        temperature = data.get('temperature', 0.7)
        max_tokens = data.get('max_tokens', 16384)
        max_cycles_per_question = data.get('max_cycles_per_question', 3)

        logger.info(f"Generating {num_questions} questions for {category} - {subtopic}")

        # Call the generation function
        result = generate_questions(
            category=category,
            subtopic=subtopic,
            num_questions=num_questions,
            models=models,
            temperature=temperature,
            max_tokens=max_tokens,
            max_cycles_per_question=max_cycles_per_question
        )

        if result and 'questions' in result:
            return jsonify({
                'success': True,
                'message': f'Generated {len(result["questions"])} questions',
                'questions': result['questions']
            })
        else:
            return jsonify({'error': 'Failed to generate questions'}), 500

    except Exception as e:
        logger.error(f"Error generating questions: {str(e)}")
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
