import json
from llm_query import generate_questions

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

# Use default models (first 3 in config)
models = None  # Will use defaults

total_questions = 0
for category, subtopics in sat_subtopics.items():
    for subtopic in subtopics:
        print(f"Generating question for {category} - {subtopic}")
        result = generate_questions(category, subtopic, num_questions=1, models=models)
        if 'error' in result:
            print(f"Error: {result['error']}")
        else:
            questions = result['questions']
            total_questions += len(questions)
            print(f"Generated {len(questions)} question(s)")

print(f"Total questions generated: {total_questions}")
