import sys
sys.path.append('LLM_TESTING')
from llm_query import parse_llm1

# Test parse_llm1 with a sample response
sample_response = """Passage: This is a sample passage for reading comprehension.
Question: What is the main idea?
Explanation: The main idea is...
Correct Answer Index: 0
Options: ["Option A", "Option B", "Option C", "Option D"]"""

parsed = parse_llm1(sample_response, 'Reading')
print('Parsed keys:', list(parsed.keys()))
print('Content:', parsed['content'][:50] + '...')
print('Question:', parsed['question'])
print('Options:', parsed['options'])
print('Correct Answer:', parsed['correct_answer'])
print('Test passed: parse_llm1 returns dict with expected keys')
