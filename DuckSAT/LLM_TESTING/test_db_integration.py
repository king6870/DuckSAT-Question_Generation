import os
import sys
from dotenv import load_dotenv

# Load environment
load_dotenv()

# Test imports
try:
    from ducksat_integration import store_question_in_ducksat
    print("✅ DuckSAT integration import successful")
except ImportError as e:
    print(f"❌ DuckSAT integration import failed: {e}")
    exit(1)

# Test database connection via integration
print("\n--- Testing Database Connection ---")
try:
    # Test with a dummy question to check connection
    test_conn = store_question_in_ducksat({
        'category': 'Math',
        'subtopic': 'Test',
        'question': 'Test question',
        'explanation': 'Test explanation',
        'answers': 'A) Test',
        'spec': None,
        'diagram_desc': '',
        'content': ''
    })
    if test_conn is None:
        print("❌ Database connection failed (check DATABASE_URL)")
        exit(1)
    else:
        print("✅ Database connection successful")
except Exception as e:
    print(f"❌ Database connection failed: {e}")
    exit(1)

# Test question storage for each category
test_questions = [
    {
        'category': 'Math',
        'subtopic': 'Linear Equations',
        'question': 'Solve for x: 2x + 3 = 7',
        'explanation': 'Subtract 3 from both sides: 2x = 4. Divide by 2: x = 2.',
        'answers': 'A) 1 B) 2 C) 3 D) 4',
        'spec': None,
        'diagram_desc': '',
        'content': ''
    },
    {
        'category': 'Reading',
        'subtopic': 'Comprehension',
        'question': 'What is the main idea of the passage?',
        'explanation': 'The passage discusses the importance of education.',
        'answers': 'A) Education is key B) Sports are fun C) Food is good D) Travel is exciting',
        'spec': None,
        'diagram_desc': '',
        'content': 'Education is crucial for personal development and societal progress.'
    },
    {
        'category': 'Writing',
        'subtopic': 'Grammar & Usage',
        'question': 'Which choice best improves the sentence?',
        'explanation': 'The correct answer fixes the subject-verb agreement.',
        'answers': 'A) Change to "is" B) Change to "are" C) No change D) Change to "was"',
        'spec': None,
        'diagram_desc': '',
        'content': 'The team play well together.'
    }
]

print("\n--- Testing Question Storage ---")
for i, q in enumerate(test_questions, 1):
    print(f"\nTest {i}: {q['category']} - {q['subtopic']}")
    try:
        question_id = store_question_in_ducksat(q)
        if question_id:
            print(f"✅ Question stored successfully with ID: {question_id}")
        else:
            print("❌ Question storage failed (no ID returned)")
    except Exception as e:
        print(f"❌ Question storage failed: {e}")

print("\n--- Test Complete ---")
