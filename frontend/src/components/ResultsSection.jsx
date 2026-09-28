import { useState } from "react";
import { Sparkles, Copy, Check, BookOpen, Layers, ChevronDown, ChevronUp, User, AlertCircle, Bot } from "lucide-react";

function MessageItem({ msg }) {
  const [copied, setCopied] = useState(false);
  const [showCitations, setShowCitations] = useState(false);

  const isUser = msg.role === "user";
  const isError = msg.isError;
  const contextChunks = msg.context ? msg.context.split("\n\n").filter(Boolean) : [];

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(msg.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  if (isUser) {
    return (
      <div className="message-row message-user">
        <div className="message-bubble user-bubble">
          <p className="message-text">{msg.content}</p>
          <span className="message-time">{msg.timestamp}</span>
        </div>
        <div className="avatar-box user-avatar">
          <User size={15} />
        </div>
      </div>
    );
  }

  return (
    <div className="message-row message-assistant">
      <div className="avatar-box assistant-avatar">
        <Bot size={15} />
      </div>

      <div className="message-bubble-wrapper">
        <div className={`message-bubble assistant-bubble ${isError ? "error-bubble" : ""}`}>
          <div className="bubble-header">
            <div className="bubble-meta">
              <span className="bubble-author">DocuMind Assistant</span>
              <span className="bubble-model-badge">Groq LPU · FastEmbed</span>
            </div>

            {!isError && (
              <button
                type="button"
                className={`btn-copy-inline ${copied ? "copied" : ""}`}
                onClick={handleCopy}
                title="Copy response"
              >
                {copied ? <Check size={13} className="text-success" /> : <Copy size={13} />}
                <span>{copied ? "Copied" : "Copy"}</span>
              </button>
            )}
          </div>

          {isError ? (
            <div className="error-content-row">
              <AlertCircle size={16} className="text-danger flex-shrink-0" />
              <p className="message-text error-text">{msg.content}</p>
            </div>
          ) : (
            <p className="message-text">{msg.content}</p>
          )}

          <div className="bubble-footer">
            <span className="message-time">{msg.timestamp}</span>

            {contextChunks.length > 0 && (
              <button
                type="button"
                className="btn-toggle-citations"
                onClick={() => setShowCitations(!showCitations)}
              >
                <BookOpen size={12} />
                <span>{contextChunks.length} Source Citations</span>
                {showCitations ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
              </button>
            )}
          </div>
        </div>

        {/* Expandable Citations */}
        {showCitations && contextChunks.length > 0 && (
          <div className="citations-tray">
            <div className="citations-tray-header">
              <Layers size={13} className="text-secondary-accent" />
              <span>Grounding Passages from FAISS Index</span>
            </div>
            <div className="citations-list">
              {contextChunks.map((chunk, idx) => (
                <div key={idx} className="citation-card">
                  <div className="citation-card-header">
                    <span className="citation-index">Passage #{idx + 1}</span>
                  </div>
                  <p className="citation-body">{chunk}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function ResultsSection({ messages, answer, context }) {
  // If messages are present, render full thread
  if (messages && messages.length > 0) {
    return (
      <div className="conversation-thread" role="region" aria-label="Conversation Thread">
        {messages.map((msg) => (
          <MessageItem key={msg.id} msg={msg} />
        ))}
      </div>
    );
  }

  // Fallback single answer if messages not yet populated
  if (!answer) return null;

  const fallbackMsg = {
    id: 1,
    role: "assistant",
    content: answer,
    context: context,
    timestamp: "Just now",
  };

  return (
    <div className="conversation-thread" role="region" aria-label="Query Response">
      <MessageItem msg={fallbackMsg} />
    </div>
  );
}
