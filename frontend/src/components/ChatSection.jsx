export default function ChatSection({ query, loading, status, setQuery, askQuestion, handleKeyDown }) {
  const pdfReady = status.pdf_loaded;

  return (
    <section className="card chat-section" aria-label="Ask a question">
      <div className="section-header">
        <span className="section-icon">💬</span>
        <h2 className="section-title">Ask a Question</h2>
      </div>

      <div className="input-group">
        <input
          id="chat-query-input"
          type="text"
          className="query-input"
          placeholder={pdfReady ? "Ask anything about your PDF…" : "Upload a PDF first to start chatting"}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={loading || !pdfReady}
          aria-label="Question input"
          autoComplete="off"
        />

        <button
          id="ask-btn"
          className="btn btn-primary"
          onClick={askQuestion}
          disabled={loading || !query.trim() || !pdfReady}
          aria-busy={loading}
        >
          {loading ? (
            <>
              <span className="spinner" aria-hidden="true" />
              Thinking…
            </>
          ) : (
            "Ask"
          )}
        </button>
      </div>

      {!pdfReady && (
        <p className="warning-text" role="alert">
          ⚠️ Please upload a PDF above before asking questions.
        </p>
      )}
    </section>
  );
}
