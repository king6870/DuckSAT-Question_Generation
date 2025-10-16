# TODO: Enhance LLM Query Logging and Interactive Mode

## Completed Tasks
- [x] Update query_llm: Add logger.info for successful response length, change print to logger.error in exception block.
- [x] Update interactive_mode: Add user prompts for selecting 3 LLMs from llms_config, temperature, max_tokens, and num_questions_per_subtopic. Keep generating all subtopics but allow customizable question count.

## Next Steps
- [ ] Test the interactive prompts and logging output.
- [ ] Verify database storage works as expected.
