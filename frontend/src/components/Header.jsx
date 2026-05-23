import { UserButton } from "@clerk/clerk-react";

export default function Header({ status }) {
  return (
    <header className="app-header">
      <div className="header-glow" aria-hidden="true" />

      <div className="header-content">
        <div className="header-left">
          <span className="header-icon">📚</span>
          <h1 className="header-title">AI Document Chatbot</h1>
        </div>

        <div className="header-right">
          <div className={`status-badge ${status.pdf_loaded ? "status-active" : "status-idle"}`}>
            <span className="status-dot" />
            {status.pdf_loaded
              ? `PDF Ready · ${status.vectorstore_size} chunks`
              : "No PDF loaded"}
          </div>

          <UserButton />
        </div>
      </div>
    </header>
  );
}
