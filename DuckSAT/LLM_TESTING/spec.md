  # LLM Query Program Specification

## Overview
This program allows users to interact with Large Language Model (LLM) APIs by providing an endpoint, API key, prompt, and optional settings. It sends the query to the LLM and displays the response.

## Features
- Input endpoint URL for the LLM API or select from predefined LLMs
- Input API key for authentication
- Input user prompt
- Optional settings:
  - Temperature (float, 0.0 to 2.0)
  - Max tokens (integer)
  - Context/System prompt (string)
  - Model name (string, if required by API)
- Support for multiple LLMs via llms_config.json (e.g., OpenAI, Anthropic, Azure)
- Interactive mode for chaining LLM queries (use output of one as input for next)
- Support for conversation history (optional, for multi-turn)
- Output the LLM's response

## Assumptions
- The API follows OpenAI's chat completions format (JSON with messages array)
- Endpoint is the full URL, e.g., https://api.openai.com/v1/chat/completions
- Authentication via Bearer token in Authorization header
- Default model: gpt-3.5-turbo if not specified
- Program runs in CLI, using command-line arguments or interactive input

## Inputs
- endpoint: string, required
- api_key: string, required
- prompt: string, required
- temperature: float, optional, default 0.7
- max_tokens: int, optional, default 150
- context: string, optional, default empty
- model: string, optional, default "gpt-3.5-turbo"

## Outputs
- The LLM's response text
- Error messages if API call fails

## Implementation
- Language: Python
- Libraries: requests, argparse
- Handle JSON requests and responses
- Error handling for network issues, invalid responses
