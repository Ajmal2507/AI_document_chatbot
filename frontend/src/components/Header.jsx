import { UserButton } from "@clerk/clerk-react";
import { Sparkles, FileText, Database, ShieldCheck } from "lucide-react";

export default function Header({ status }) {
  const isReady = status.pdf_loaded;

  return (
    <header className="app-header">
      <div className="header-glow" aria-hidden="true" />

      <div className="header-content">
        <div className="header-brand">
          <div className="brand-icon-wrapper">
            <Sparkles className="brand-icon" size={22} />
          </div>
          <div>
            <div className="brand-title-row">
              <h1 className="header-title">DocuMind AI</h1>
              <span className="version-pill">v1.0 RAG</span>
            </div>
            <p className="brand-subtitle">Context-grounded PDF Intelligence</p>
          </div>
        </div>

        <div className="header-actions">
          <div className={`status-pill ${isReady ? "status-ready" : "status-idle"}`}>
            <span className="status-indicator" />
            <Database size={14} className="status-icon" />
            <span>
              {isReady
                ? `Vector Store: ${status.vectorstore_size} chunks`
                : "Awaiting Document"}
            </span>
          </div>

          <div className="user-button-wrapper">
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-9 h-9 border border-white/20",
                },
              }}
            />
          </div>
        </div>
      </div>
    </header>
  );
}
