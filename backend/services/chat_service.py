from config import llm, prompt


def generate_answer(query: str, retriever) -> dict:
    relevant_docs = retriever.invoke(query)

    context = "\n\n".join([doc.page_content for doc in relevant_docs])

    chain = prompt | llm
    response = chain.invoke({"context": context, "input": query})

    return {
        "answer": response.content if hasattr(response, "content") else str(response),
        "context": context,
        "sources_count": len(relevant_docs),
    }
