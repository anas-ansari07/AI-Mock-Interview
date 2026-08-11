from dotenv import load_dotenv
import os

load_dotenv()

# Storing Config in Environment variable

OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")
MODEL = os.getenv("MODEL")

print(OPENROUTER_API_KEY)
print(MODEL)