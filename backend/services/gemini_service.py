from PIL import Image
import os
from google import genai
from config.settings import GEMINI_API_KEY

# ---------------- CONFIG ---------------- #

if not GEMINI_API_KEY:
    raise RuntimeError("❌ GEMINI_API_KEY is not set")

client = genai.Client(api_key=GEMINI_API_KEY)

MODEL_NAME = "gemini-1.5-pro"  # ✅ WORKING MODEL

# ---------------- TEXT Q&A ---------------- #

def ask_gemini(question: str) -> str:
    try:
        response = client.models.generate_content(
            model=MODEL_NAME,
            contents=question
        )

        return response.text if response.text else "No response from Gemini."

    except Exception as e:
        return f"Gemini error: {str(e)}"


# ---------------- IMAGE ANALYSIS ---------------- #

def analyze_image(image_path: str) -> str:
    try:
        if not os.path.exists(image_path):
            return "Image file not found."

        img = Image.open(image_path)

        response = client.models.generate_content(
            model=MODEL_NAME,
            contents=[
                "You are a medical assistant. Analyze this blood report clearly:",
                img
            ]
        )

        return response.text if response.text else "No analysis returned."

    except Exception as e:
        return f"Image analysis failed: {str(e)}"
