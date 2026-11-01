import os
from pathlib import Path
from dotenv import load_dotenv

# Locate backend .env file explicitly
ENV_PATH = Path(__file__).resolve().parent / ".env"
load_dotenv(dotenv_path=ENV_PATH)

# Read credentials from environment variables without hardcoding
GEMINI_API_KEY: str = os.getenv("GEMINI_API_KEY", "").strip()
GEMINI_MODEL: str = os.getenv("GEMINI_MODEL", "gemini-3.8-flash").strip()

def get_gemini_client():
    """
    Initializes and returns the official google-genai Client
    using GEMINI_API_KEY from environment variables.
    Returns None if no API key is configured.
    """
    if not GEMINI_API_KEY:
        return None

    try:
        from google import genai
        client = genai.Client(api_key=GEMINI_API_KEY)
        return client
    except Exception as e:
        print(f"[Warning] Failed to initialize Google GenAI Client: {e}")
        return None

