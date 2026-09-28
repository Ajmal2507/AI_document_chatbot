import { MessageSquare, Send, CornerDownLeft, Loader2, Sparkles, RotateCcw } from "lucide-react";

const SUGGESTIONS = [
  "Summarize key findings and conclusions",
  "Extract quantitative metrics and dates",
  "List actionable recommendations",
];

export default function ChatSection({
  query,
  loading,
  status,
  setQuery,
  askQuestion,
  handleKeyDown,
  clearChat,
  hasMessages,
}) {
  const pdfReady = status.pdf_loaded;

  return (
    <div className="chat-composer-container">
      {pdfReady && (
        <div className="suggestions-bar">
          <div className="suggestions-header">
            <Sparkles size={12} className="text-secondary-accent" />
            <span>Suggested Prompts:</span>
          </div>
          <div className="suggestions-pills">
            {SUGGESTIONS.map((text) => (
              <button
                key={text}
                type="button"
                className="pill-button"
                onClick={() => askQuestion(text)}
                disabled={loading}
              >
                {text}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="composer-input-row">
        <div className="composer-input-wrapper">
          <MessageSquare size={16} className="composer-lead-icon" />
          <input
            id="chat-query-input"
            type="text"
            className="composer-input"
            placeholder={
              pdfReady
                ? "Ask a question about the document context…"
                : "Upload and index a PDF document to start querying…"
            }
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={loading || !pdfReady}
            aria-label="Query input"
            autoComplete="off"
          />

          <div className="composer-actions">
            <span className="kbd-badge">
              <CornerDownLeft size={11} />
              <span>Enter</span>
            </span>

            <button
              id="ask-btn"
              className="btn btn-primary btn-icon-only"
              onClick={() => askQuestion()}
              disabled={loading || !query.trim() || !pdfReady}
              aria-busy={loading}
              title="Submit query"
            >
              {loading ? (
                <Loader2 size={15} className="spinner-rotate" />
              ) : (
                <Send size={14} />
              )}
            </button>
          </div>
        </div>

        {hasMessages && (
          <button
            type="button"
            className="btn btn-outline btn-icon-only btn-reset"
            onClick={clearChat}
            title="Clear conversation"
          >
            <RotateCcw size={15} />
          </button>
        )}
      </div>
    </div>
  );
}
