import sys
import os
import json
import re

# Add path for imports
sys.path.append('..')
sys.path.append('../ducksat-app')

print("=== Testing DuckSAT Integration ===")

# Test 1: Import functions
print("\n1. Testing imports...")
try:
    from ducksat_integration import (
        parse_answers_to_options, 
        determine_difficulty_and_subtopic, 
        generate_image_from_vega_spec, 
        store_question_in_ducksat
    )
    print("✅ All functions imported successfully")
except ImportError as e:
    print(f"❌ Import failed: {e}")
    sys.exit(1)

# Test 2: Test parse_answers_to_options
print("\n2. Testing parse_answers_to_options...")
test_answers = """A) The length is 5 units
B) The length is 6 units
C) The length is 7 units
D) The length is 8 units"""

options, correct = parse_answers_to_options(test_answers)
print(f"Options: {options}")
print(f"Correct answer index: {correct}")
if len(options) == 4 and correct == 0:
    print("✅ parse_answers_to_options passed")
else:
    print("❌ parse_answers_to_options failed")

# Test 3: Test determine_difficulty_and_subtopic
print("\n3. Testing determine_difficulty_and_subtopic...")
difficulty, subtopic = determine_difficulty_and_subtopic(
    "Find the coordinates of point C on the coordinate plane.",
    "A coordinate plane with points A and B marked."
)
print(f"Difficulty: {difficulty}, Subtopic: {subtopic}")
if difficulty in ['easy', 'medium', 'hard'] and subtopic == 'coordinate-geometry':
    print("✅ determine_difficulty_and_subtopic passed")
else:
    print("❌ determine_difficulty_and_subtopic failed")

# Test 4: Test generate_image_from_vega_spec (basic validation)
print("\n4. Testing generate_image_from_vega_spec...")
simple_spec = {
    "$schema": "https://vega.github.io/schema/vega/v5.json",
    "width": 400,
    "height": 300,
    "marks": [
        {
            "type": "symbol",
            "encode": {
                "enter": {
                    "x": {"value": 200},
                    "y": {"value": 150},
                    "fill": {"value": "steelblue"},
                    "size": {"value": 100}
                }
            }
        }
    ]
}
try:
    image_url = generate_image_from_vega_spec(simple_spec, "Simple point on plane")
    if image_url:
        print(f"✅ generate_image_from_vega_spec returned: {image_url}")
    else:
        print("⚠️ generate_image_from_vega_spec returned None (may be expected if dependencies missing)")
except Exception as e:
    print(f"❌ generate_image_from_vega_spec error: {e}")

# Test 5: Test store_question_in_ducksat (graceful handling)
print("\n5. Testing store_question_in_ducksat...")
test_question_data = {
    "question": "Test question",
    "explanation": "Test explanation",
    "answers": "A) Test answer",
    "diagram_desc": "Test diagram",
    "spec": simple_spec
}
try:
    question_id = store_question_in_ducksat(test_question_data)
    if question_id:
        print(f"✅ store_question_in_ducksat succeeded with ID: {question_id}")
    else:
        print("⚠️ store_question_in_ducksat returned None (expected if DuckSAT not available)")
except Exception as e:
    print(f"❌ store_question_in_ducksat error: {e}")

# Test 6: Test llm_query integration
print("\n6. Testing llm_query integration...")
try:
    import llm_query
    print("✅ llm_query imported successfully")
    
    # Check if DUCKSAT_INTEGRATION_AVAILABLE is defined
    if hasattr(llm_query, 'DUCKSAT_INTEGRATION_AVAILABLE'):
        print(f"✅ DUCKSAT_INTEGRATION_AVAILABLE: {getattr(llm_query, 'DUCKSAT_INTEGRATION_AVAILABLE')}")
    else:
        print("⚠️ DUCKSAT_INTEGRATION_AVAILABLE not found in llm_query")
except ImportError as e:
    print(f"❌ llm_query import failed: {e}")

print("\n=== All tests completed ===")
