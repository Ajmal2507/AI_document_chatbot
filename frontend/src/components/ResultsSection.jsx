import { useState } from "react";
import { Sparkles, Copy, Check, BookOpen, Layers, ChevronDown, ChevronUp } from "lucide-react";

export default function ResultsSection({ answer, context }) {
  const [copied, setCopied] = useState(false);
  const [contextExpanded, setContextExpanded] = useState(true);

  if (!answer) return null;

  const contextChunks = context ? context.split("\n\n").filter(Boolean) : [];

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(answer);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className="results-container" role="region" aria-label="Answer and context">
      {/* Answer Card */}
      <div className="saas-card answer-card">
        <div className="answer-header">
          <div className="answer-title-group">
            <div className="header-icon-box answer-icon-box">
              <Sparkles size={18} className="text-emerald-400" />
            </div>
            <div>
              <h3 className="card-title">Synthesized Answer</h3>
              <span className="model-tag">Groq LPU Engine · FastEmbed</span>
            </div>
          </div>

          <button
            className={`btn-copy ${copied ? "btn-copied" : ""}`}
            onClick={handleCopy}
            title="Copy answer to clipboard"
            aria-label="Copy answer"
          >
            {copied ? (
              <>
                <Check size={14} className="text-emerald-400" />
                <span>Copied</span>
              </>
            ) : (
              <>
                <Copy size={14} />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>

        <div className="answer-body">
          <p className="answer-text">{answer}</p>
        </div>
      </div>

      {/* Context Citations Card */}
      {contextChunks.length > 0 && (
        <div className="saas-card context-card">
          <div
            className="context-header"
            onClick={() => setContextExpanded(!contextExpanded)}
            role="button"
            tabIndex={0}
          >
            <div className="context-title-group">
              <div className="header-icon-box">
                <BookOpen size={18} className="text-indigo-400" />
              </div>
              <div>
                <h3 className="card-title">Retrieved Source Context</h3>
                <p className="card-desc">Grounding passages from FAISS semantic similarity index</p>
              </div>
            </div>

            <div className="context-header-right">
              <span className="badge-chunks">
                <Layers size={13} />
                {contextChunks.length} Chunks
              </span>
              <span className="accordion-toggle">
                {contextExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </span>
            </div>
          </div>

          {contextExpanded && (
            <div className="context-list">
              {contextChunks.map((chunk, index) => (
                <div key={index} className="citation-block">
                  <div className="citation-header">
                    <span className="citation-pill">Source Passage #{index + 1}</span>
                  </div>
                  <p className="citation-text">{chunk}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
