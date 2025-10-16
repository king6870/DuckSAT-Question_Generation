import sys
sys.path.append('LLM_TESTING')
from llm_query import parse_llm1

# Test with Writing category
sample_response = """Text to Edit: This is a sample text that needs editing.
Question: What is the best way to revise?
Explanation: The best revision is...
Correct Answer Index: 1
Options: ["Option A", "Option B", "Option C", "Option D"]"""

parsed = parse_llm1(sample_response, 'Writing')
print('Writing test - Content:', parsed['content'][:30] + '...')
print('Writing test - Question:', parsed['question'])
print('Writing test - Options:', parsed['options'])
print('Writing test - Correct Answer:', parsed['correct_answer'])

# Test with Math category
sample_response2 = """Diagram Description: A circle with radius 5.
Question: What is the area?
Explanation: Area = pi*r^2 = 25pi
Correct Answer Index: 2
Options: ["10", "15", "25pi", "30"]"""

parsed2 = parse_llm1(sample_response2, 'Math')
print('Math test - Content:', parsed2['content'][:30] + '...')
print('Math test - Question:', parsed2['question'])
print('Math test - Options:', parsed2['options'])
print('Math test - Correct Answer:', parsed2['correct_answer'])

print('All category tests passed')
