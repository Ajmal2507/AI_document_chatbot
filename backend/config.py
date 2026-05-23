import os
from dotenv import load_dotenv
from langchain_groq import ChatGroq
from langchain_core.prompts import ChatPromptTemplate

load_dotenv()

GROQ_API_KEY = os.getenv("GROQ_API_KEY")
if not GROQ_API_KEY:
    raise ValueError("GROQ_API_KEY is missing. Add it to your .env file.")

CLERK_JWKS_URL = os.getenv("CLERK_JWKS_URL")
if not CLERK_JWKS_URL:
    raise ValueError("CLERK_JWKS_URL is missing. Add it to your .env file.")

llm = ChatGroq(
    model="llama-3.1-8b-instant",
    temperature=0,
    groq_api_key=GROQ_API_KEY,
)

PROMPT_TEMPLATE = """
You are a helpful assistant that answers questions based on the provided context.
If the context does not contain the answer, say "I don't know based on the provided context."

Context:
{context}

Question:
{input}

Provide a concise and accurate answer based only on the context above.
Answer:
"""

prompt = ChatPromptTemplate.from_template(PROMPT_TEMPLATE)
