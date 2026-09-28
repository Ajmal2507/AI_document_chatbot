import { UserButton } from "@clerk/clerk-react";
import { Layers, Database, Shield } from "lucide-react";

export default function Header({ status }) {
  const isReady = status.pdf_loaded;

  return (
    <header className="app-header">
      <div className="header-container">
        <div className="header-left">
          <div className="brand-badge">
            <Layers size={18} className="text-primary-accent" />
            <span className="brand-name">DocuMind</span>
            <span className="brand-tag">Enterprise RAG</span>
          </div>
        </div>

        <div className="header-right">
          <div className={`status-indicator-pill ${isReady ? "status-online" : "status-idle"}`}>
            <span className="status-dot" />
            <Database size={13} />
            <span>
              {isReady
                ? `Vector Store Active (${status.vectorstore_size} Chunks)`
                : "Vector Store Idle"}
            </span>
          </div>

          <div className="auth-container">
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "user-avatar-custom",
                },
              }}
            />
          </div>
        </div>
      </div>
    </header>
  );
}
