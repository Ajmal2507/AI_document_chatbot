from config import llm, prompt


def generate_answer(query: str, retriever) -> dict:
    relevant_docs = retriever.invoke(query)

    context = "\n\n".join([doc.page_content for doc in relevant_docs])

    formatted_prompt = prompt.format(context=context, input=query)
    response = llm.invoke(formatted_prompt)

    return {
        "answer": response.content,
        "context": context,
        "sources_count": len(relevant_docs),
    }
