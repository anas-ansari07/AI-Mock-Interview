from openai import OpenAI
from app.config import OPENROUTER_API_KEY

# It will create the OpenAI client for 
# calling the model and generating response

client = OpenAI(
    api_key=OPENROUTER_API_KEY,
    base_url="https://openrouter.ai/api/v1",
)