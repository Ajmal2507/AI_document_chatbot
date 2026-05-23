_vectorstore = None
_retriever = None


def set_vectorstore(vs) -> None:
    global _vectorstore, _retriever
    _vectorstore = vs
    _retriever = vs.as_retriever(search_kwargs={"k": 3})


def get_retriever():
    return _retriever


def is_pdf_loaded() -> bool:
    return _vectorstore is not None


def get_vectorstore_size() -> int:
    return _vectorstore.index.ntotal if _vectorstore else 0
