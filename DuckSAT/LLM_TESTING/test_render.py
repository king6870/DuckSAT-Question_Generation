from llm_query import render_vega_to_base64
import json

# Simple Vega spec for a circle
spec = {
    "$schema": "https://vega.github.io/schema/vega/v5.json",
    "width": 200,
    "height": 200,
    "marks": [
        {
            "type": "symbol",
            "encode": {
                "enter": {
                    "x": {"value": 100},
                    "y": {"value": 100},
                    "size": {"value": 10000},
                    "shape": {"value": "circle"}
                }
            }
        }
    ]
}

b64 = render_vega_to_base64(spec)
print("Image base64 length:", len(b64))
print("First 100 chars:", b64[:100])
