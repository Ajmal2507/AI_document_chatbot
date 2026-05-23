import warnings
from langchain_community.document_loaders import PDFMinerLoader
from langchain_community.vectorstores import FAISS
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_community.embeddings import HuggingFaceEmbeddings

warnings.filterwarnings("ignore", category=DeprecationWarning)


def process_pdf(file_path: str) -> tuple[FAISS, int]:
    loader = PDFMinerLoader(file_path)
    documents = loader.load()

    if not documents:
        raise ValueError("Could not extract text from this PDF. It may be scanned or image-based.")

    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size=500,
        chunk_overlap=50,
    )
    chunks = text_splitter.split_documents(documents)

    embeddings = HuggingFaceEmbeddings(
        model_name="sentence-transformers/all-MiniLM-L6-v2"
    )

    vectorstore = FAISS.from_documents(chunks, embeddings)

    return vectorstore, len(chunks)
