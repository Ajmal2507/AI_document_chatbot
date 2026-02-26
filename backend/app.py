import os
from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain_community.document_loaders import PDFMinerLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_community.vectorstores import FAISS
from langchain_groq import ChatGroq
from langchain.prompts import ChatPromptTemplate
import tempfile
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Use environment variable for API key
GROQ_API_KEY = os.getenv("GROQ_API_KEY")
if not GROQ_API_KEY:
    raise ValueError("GROQ_API_KEY environment variable is required")

app = FastAPI(title="PDF Chatbot API", version="1.0.0")

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000","http://localhost:5173",      # Add this
        "http://127.0.0.1:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Global variables with better initialization
vectorstore = None
retriever = None
llm = ChatGroq(
    model="llama-3.1-8b-instant", 
    temperature=0,
    groq_api_key=GROQ_API_KEY
)

prompt_template = """
You are a helpful assistant that answers questions based on the provided context.
If the context does not contain the answer, respond with "I don't know based on the provided context."

Context:
{context}

Question:
{input}

Please provide a concise and accurate answer based only on the context above.
Answer:
"""
prompt = ChatPromptTemplate.from_template(prompt_template)

@app.post("/upload_pdf/")
async def upload_pdf(file: UploadFile = File(...)):
    global vectorstore, retriever
    
    # Validate file type
    if not file.filename.lower().endswith('.pdf'):
        raise HTTPException(status_code=400, detail="Only PDF files are allowed")
    
    try:
        # Create temporary file
        with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as temp_file:
            contents = await file.read()
            temp_file.write(contents)
            temp_path = temp_file.name
        
        # Load and process PDF
        loader = PDFMinerLoader(temp_path)
        documents = loader.load()
        
        if not documents:
            raise HTTPException(status_code=400, detail="Could not extract text from PDF")
        
        # Split text
        text_splitter = RecursiveCharacterTextSplitter(
            chunk_size=500, 
            chunk_overlap=50
        )
        chunks = text_splitter.split_documents(documents)
        
        # Create embeddings and vector store
        embeddings = HuggingFaceEmbeddings(
            model_name="sentence-transformers/all-MiniLM-L6-v2"
        )
        vectorstore = FAISS.from_documents(chunks, embeddings)
        retriever = vectorstore.as_retriever(search_kwargs={"k": 3})
        
        return {
            "message": "PDF uploaded and processed successfully!",
            "chunks_processed": len(chunks)
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing PDF: {str(e)}")
    finally:
        # Clean up temporary file
        if 'temp_path' in locals():
            os.unlink(temp_path)

@app.post("/chat/")
async def chat(query: str = Form(...)):
    if retriever is None:
        raise HTTPException(status_code=400, detail="Please upload a PDF first!")
    
    if not query.strip():
        raise HTTPException(status_code=400, detail="Query cannot be empty")
    
    try:
        # Retrieve relevant documents
        relevant_docs = retriever.get_relevant_documents(query)
        context = "\n\n".join([d.page_content for d in relevant_docs])
        
        # Generate response
        formatted_prompt = prompt.format(context=context, input=query)
        response = llm.invoke(formatted_prompt)
        
        return {
            "answer": response.content,
            "context": context,
            "sources_count": len(relevant_docs)
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error generating response: {str(e)}")

# Health check endpoint
@app.get("/")
async def health_check():
    return {"status": "healthy", "service": "PDF Chatbot API"}

# Check if PDF is loaded
@app.get("/status")
async def get_status():
    return {
        "pdf_loaded": vectorstore is not None,
        "vectorstore_size": vectorstore.index.ntotal if vectorstore else 0
    }