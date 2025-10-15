from openai import OpenAI

endpoint = "https://ai-manojwin82958ai594424696620.services.ai.azure.com/openai/v1/"
model_name = "Llama-4-Maverick-17B-128E-Instruct-FP8"
deployment_name = "Llama-4-Maverick-17B-128E-Instruct-FP8"

api_key = "FhyeuwcfKGaNEhoq3U7VOKg4s0sfobVW7fNIdDA7EaI05dyIXQqMJQQJ99BBACHYHv6XJ3w3AAAAACOGsrpa"

client = OpenAI(
    base_url=f"{endpoint}",
    api_key=api_key
)

completion = client.chat.completions.create(
    model=deployment_name,
    messages=[
        {
            "role": "user",
            "content": "I am going to Paris, what should I see?",
        }
    ],
)

print(completion.choices[0].message)
