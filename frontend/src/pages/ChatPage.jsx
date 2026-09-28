import { useChatbot } from "../hooks/useChatbot";
import Header from "../components/Header";
import UploadSection from "../components/UploadSection";
import ChatSection from "../components/ChatSection";
import ResultsSection from "../components/ResultsSection";
import Notification from "../components/Notification";
import { MessageSquare, FileText, Database, ShieldCheck, Cpu } from "lucide-react";

export default function ChatPage() {
  const {
    pdfFile,
    query,
    messages,
    answer,
    context,
    loading,
    uploading,
    status,
    notification,
    setPdfFile,
    setQuery,
    uploadPDF,
    askQuestion,
    clearChat,
    handleKeyDown,
  } = useChatbot();

  return (
    <div className="workspace-root">
      <Notification notification={notification} />
      <Header status={status} />

      <main className="workspace-main">
        <div className="workspace-grid">
          {/* Left Sidebar: Document Management & Specs */}
          <aside className="workspace-sidebar">
            <UploadSection
              pdfFile={pdfFile}
              uploading={uploading}
              setPdfFile={setPdfFile}
              uploadPDF={uploadPDF}
              status={status}
            />

            <div className="panel-card telemetry-panel">
              <h3 className="telemetry-title">System Infrastructure</h3>
              <div className="telemetry-list">
                <div className="telemetry-row">
                  <span className="telemetry-key">
                    <Cpu size={13} />
                    Inference Engine
                  </span>
                  <span className="telemetry-val">Groq LPUs</span>
                </div>
                <div className="telemetry-row">
                  <span className="telemetry-key">
                    <FileText size={13} />
                    Embeddings
                  </span>
                  <span className="telemetry-val">BGE-Small (ONNX)</span>
                </div>
                <div className="telemetry-row">
                  <span className="telemetry-key">
                    <Database size={13} />
                    Vector Index
                  </span>
                  <span className="telemetry-val">FAISS CPU</span>
                </div>
                <div className="telemetry-row">
                  <span className="telemetry-key">
                    <ShieldCheck size={13} />
                    Security
                  </span>
                  <span className="telemetry-val">Clerk RS256 JWKS</span>
                </div>
              </div>
            </div>
          </aside>

          {/* Right Main Column: Chat Workspace */}
          <section className="workspace-chat-container">
            <div className="chat-viewport">
              {messages.length === 0 && !loading && (
                <div className="chat-empty-state">
                  <div className="empty-icon-box">
                    <MessageSquare size={26} />
                  </div>
                  <h3 className="empty-title">Document Intelligence Session</h3>
                  <p className="empty-desc">
                    {status.pdf_loaded
                      ? "Your document is indexed in vector memory. Type a query below or select a prompt."
                      : "Upload a PDF document from the left panel to vectorize and initialize the retrieval pipeline."}
                  </p>
                </div>
              )}

              <ResultsSection messages={messages} answer={answer} context={context} />

              {loading && (
                <div className="loading-state-card">
                  <div className="pulse-line" />
                  <div className="loading-content">
                    <span className="loading-dot" />
                    <span>Retrieving relevant chunks & synthesizing answer via Groq…</span>
                  </div>
                </div>
              )}
            </div>

            <ChatSection
              query={query}
              loading={loading}
              status={status}
              setQuery={setQuery}
              askQuestion={askQuestion}
              handleKeyDown={handleKeyDown}
              clearChat={clearChat}
              hasMessages={messages.length > 0}
            />
          </section>
        </div>
      </main>
    </div>
  );
}
