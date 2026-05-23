import { useChatbot } from "../hooks/useChatbot";
import Header from "../components/Header";
import UploadSection from "../components/UploadSection";
import ChatSection from "../components/ChatSection";
import ResultsSection from "../components/ResultsSection";
import Notification from "../components/Notification";

export default function ChatPage() {
  const {
    pdfFile,
    query,
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
    handleKeyDown,
  } = useChatbot();

  return (
    <div className="app-wrapper">
      <Notification notification={notification} />

      <div className="app-container">
        <Header status={status} />

        <main className="main-content">
          <UploadSection
            pdfFile={pdfFile}
            uploading={uploading}
            setPdfFile={setPdfFile}
            uploadPDF={uploadPDF}
          />

          <ChatSection
            query={query}
            loading={loading}
            status={status}
            setQuery={setQuery}
            askQuestion={askQuestion}
            handleKeyDown={handleKeyDown}
          />

          <ResultsSection answer={answer} context={context} />
        </main>
      </div>
    </div>
  );
}
