import warnings
from langchain_community.document_loaders import PDFMinerLoader
from langchain_community.vectorstores import FAISS
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_community.embeddings.fastembed import FastEmbedEmbeddings

warnings.filterwarnings("ignore", category=DeprecationWarning)

_embeddings = None


def get_embeddings() -> FastEmbedEmbeddings:
    global _embeddings
    if _embeddings is None:
        _embeddings = FastEmbedEmbeddings(model_name="BAAI/bge-small-en-v1.5")
    return _embeddings


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

    embeddings = get_embeddings()
    vectorstore = FAISS.from_documents(chunks, embeddings)

    return vectorstore, len(chunks)
