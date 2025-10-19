# DuckSAT Database Integration

This document explains how to use the updated `llm_query.py` script with automatic database storage.

## Setup

1. **Configure your database connection:**
   - Edit the `.env` file in the `LLM_TESTING` directory
   - Replace `your_neon_database_url_here` with your actual Neon database URL
   - Replace `your_azure_openai_api_key_here` with your Azure OpenAI API key

2. **Install required dependencies:**
   ```bash
   pip install psycopg2-binary python-dotenv
   ```

## Testing the Integration

Before running the main script, test your database connection:

```bash
python test_database_connection.py
```

This will verify:
- Environment variables are configured
- Database connection works
- DuckSAT integration functions are available

## Running Interactive Mode

To generate questions and automatically save them to the database:

```bash
python llm_query.py --interactive
```

### What happens in interactive mode:

1. **LLM Selection**: Choose 3 LLMs for question generation, diagram creation, and checking
2. **Settings Configuration**: Set temperature, max tokens, questions per subtopic, and delays
3. **Question Generation**: The script generates questions for all SAT subtopics
4. **Automatic Database Storage**: Each question is automatically saved to the DuckSAT Neon database
5. **Progress Tracking**: You'll see real-time status updates:
   - 🔄 Saving question to DuckSAT database...
   - ✅ Successfully stored in database with ID: [question_id]
   - ❌ Failed to store in database, skipping question.

6. **Summary Report**: At the end, you'll see a summary of how many questions were successfully saved

## Database Storage Details

Questions are stored with the following structure:
- **Topics**: Automatically mapped to existing topics in the database
- **Subtopics**: Created if they don't exist, linked to appropriate topics
- **Questions**: Full question data including:
  - Question text and options
  - Correct answer index
  - Detailed explanations
  - Difficulty level
  - Category and subtopic
  - Time estimates
  - Source tags
  - Chart data (for math/geometry questions)
  - Generated images (for visual questions)

## Error Handling

The system includes comprehensive error handling:
- Database connection failures
- Invalid question data
- Missing environment variables
- LLM API errors

If a question fails to save, the script will:
1. Display an error message
2. Skip that question
3. Continue with the next question
4. Report the failure in the final summary

## Troubleshooting

### Common Issues:

1. **"DATABASE_URL not found"**
   - Check that your `.env` file exists and contains the correct database URL

2. **"Please update DATABASE_URL in .env file"**
   - Replace the placeholder URL with your actual Neon database connection string

3. **"Database connection failed"**
   - Verify your database URL is correct
   - Check that your database is accessible
   - Ensure you have the required permissions

4. **"DuckSAT integration not available"**
   - Make sure `ducksat_integration.py` is in the same directory
   - Check that all required dependencies are installed

## Output Files

The script still generates:
- `sat_questions.html`: Visual representation of all generated questions
- Database records: All questions are stored in the DuckSAT database for use in the main application

## Next Steps

After running the script:
1. Check the database to verify questions were saved
2. Use the DuckSAT application to view and manage the questions
3. Run additional question generation sessions as needed
