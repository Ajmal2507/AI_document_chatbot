# AI Document Chatbot (RAG Based)

This project is a document-based AI chatbot built using:

Frontend:
- React
- Vite

Backend:
- Python
- FastAPI
- Groq API
- RAG (Retrieval-Augmented Generation)

---

## How to Run the Project (5 Steps)

### Step 1: Clone the Repository

git clone https://github.com/Ajmal2507/AI_document_chatbot.git  
cd AI_document_chatbot

---

### Step 2: Setup Backend

cd backend  
python -m venv venv  

Activate virtual environment:

On Windows:
venv\Scripts\activate  

On Mac/Linux:
source venv/bin/activate  

Install dependencies:
pip install -r requirements.txt  

Create a `.env` file inside the backend folder and add:

GROQ_API_KEY=your_api_key_here

---

### Step 3: Run Backend Server

uvicorn main:app --reload  

Backend will run at:
http://127.0.0.1:8000

---

### Step 4: Setup Frontend

Open a new terminal.

cd frontend  
npm install  

---

### Step 5: Run Frontend

npm run dev  

Open the URL shown in the terminal (usually http://localhost:5173)

---

Note:
- The `.env` file is not included in this repository.
- You must use your own Groq API key.
