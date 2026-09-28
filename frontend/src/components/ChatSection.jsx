import { MessageSquare, Send, CornerDownLeft, Loader2, Sparkles, HelpCircle } from "lucide-react";

const SUGGESTIONS = [
  "Summarize the core takeaways in bullet points",
  "What are the main technical methods or findings?",
  "Extract key dates, metrics, and quantitative data",
];

export default function ChatSection({ query, loading, status, setQuery, askQuestion, handleKeyDown }) {
  const pdfReady = status.pdf_loaded;

  const handleSuggestionClick = (text) => {
    if (!pdfReady || loading) return;
    setQuery(text);
  };

  return (
    <section className="saas-card chat-card" aria-label="Ask questions">
      <div className="card-header">
        <div className="header-icon-box">
          <MessageSquare size={20} className="text-violet-400" />
        </div>
        <div>
          <h2 className="card-title">Document Query Engine</h2>
          <p className="card-desc">Ask queries grounded in your uploaded document context</p>
        </div>
      </div>

      <div className="chat-input-wrapper">
        <div className="query-input-container">
          <input
            id="chat-query-input"
            type="text"
            className="saas-query-input"
            placeholder={
              pdfReady
                ? "Ask a question about the document… (e.g. key takeaways, metrics)"
                : "Upload and vectorize a PDF above to enable query engine"
            }
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={loading || !pdfReady}
            aria-label="Question input"
            autoComplete="off"
          />

          <div className="input-right-actions">
            <span className="kbd-shortcut">
              <CornerDownLeft size={12} />
              <span>Enter</span>
            </span>
            <button
              id="ask-btn"
              className="btn btn-primary btn-send"
              onClick={askQuestion}
              disabled={loading || !query.trim() || !pdfReady}
              aria-busy={loading}
              title="Send query"
            >
              {loading ? (
                <Loader2 size={16} className="spin-animate" />
              ) : (
                <Send size={15} />
              )}
            </button>
          </div>
        </div>

        {pdfReady && (
          <div className="suggestions-container">
            <span className="suggestions-label">
              <Sparkles size={13} className="text-indigo-400" />
              Suggested queries:
            </span>
            <div className="suggestions-list">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  type="button"
                  className="suggestion-pill"
                  onClick={() => handleSuggestionClick(s)}
                  disabled={loading}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {!pdfReady && (
          <div className="notice-box">
            <HelpCircle size={16} className="notice-icon" />
            <p>Upload a document in the ingestion section above to activate semantic search.</p>
          </div>
        )}
      </div>
    </section>
  );
}
