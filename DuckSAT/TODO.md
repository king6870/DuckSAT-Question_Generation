# TODO: Create Flask API Service for SAT Question Generation

## Steps to Complete

- [x] Create `flask-api-service/` directory
- [x] Create `flask-api-service/logger.py`: Set up logging with Python's logging module to log request method and path
- [x] Create `flask-api-service/app.py`: Flask application with `/welcome` endpoint (logs request method/path, returns JSON welcome message) and `/generate-questions` endpoint (accepts parameters, calls generation function, returns success/failure)
- [x] Modify `LLM_TESTING/llm_query.py`: Extract logic from `interactive_mode()` into a new `generate_questions()` function that takes parameters and generates questions programmatically without user input
- [x] Install Flask dependency using pip
- [x] Test the API endpoints locally
- [x] Run the Flask service and verify logging and question generation
