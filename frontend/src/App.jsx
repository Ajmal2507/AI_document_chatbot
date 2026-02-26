import { useState, useEffect } from "react";
import axios from "axios";
import './App.css';

function App() {
  const [pdfFile, setPdfFile] = useState(null);
  const [query, setQuery] = useState("");
  const [answer, setAnswer] = useState("");
  const [context, setContext] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [status, setStatus] = useState({ pdf_loaded: false, vectorstore_size: 0 });

  const API_BASE = "http://localhost:8000";

  const checkStatus = async () => {
    try {
      const res = await axios.get(`${API_BASE}/status`);
      setStatus(res.data);
    } catch (error) {
      console.error("Error checking status:", error);
    }
  };

  const uploadPDF = async () => {
    if (!pdfFile) {
      alert("Please select a PDF file first!");
      return;
    }

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", pdfFile);

      const res = await axios.post(`${API_BASE}/upload_pdf/`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      
      alert(res.data.message);
      await checkStatus(); // Update status after upload
    } catch (error) {
      console.error("Upload error:", error);
      alert(error.response?.data?.detail || "Error uploading PDF");
    } finally {
      setUploading(false);
    }
  };

  const askQuestion = async () => {
    if (!query.trim()) {
      alert("Please enter a question!");
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("query", query);

      const res = await axios.post(`${API_BASE}/chat/`, formData);
      setAnswer(res.data.answer);
      setContext(res.data.context);
    } catch (error) {
      console.error("Chat error:", error);
      const errorMsg = error.response?.data?.detail || "Error getting answer";
      setAnswer(`Error: ${errorMsg}`);
      setContext("");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !loading) {
      askQuestion();
    }
  };

  // Check status on component mount
  useEffect(() => {
    checkStatus();
  }, []);

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>📚 AI PDF Chatbot</h1>
        <div className="status">
          PDF Loaded: {status.pdf_loaded ? "✅" : "❌"} 
          {status.pdf_loaded && ` (${status.vectorstore_size} chunks)`}
        </div>
      </header>

      <div className="upload-section">
        <h2>Upload PDF</h2>
        <div className="file-input-group">
          <input
            type="file"
            accept=".pdf"
            onChange={(e) => setPdfFile(e.target.files[0])}
            className="file-input"
          />
          <button 
            onClick={uploadPDF} 
            disabled={uploading || !pdfFile}
            className="upload-btn"
          >
            {uploading ? "Uploading..." : "Upload PDF"}
          </button>
        </div>
        {pdfFile && <p className="file-info">Selected: {pdfFile.name}</p>}
      </div>

      <div className="chat-section">
        <h2>Ask Questions</h2>
        <div className="input-group">
          <input
            type="text"
            placeholder="Ask a question about your PDF..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={loading || !status.pdf_loaded}
            className="query-input"
          />
          <button 
            onClick={askQuestion} 
            disabled={loading || !query.trim() || !status.pdf_loaded}
            className="ask-btn"
          >
            {loading ? "Thinking..." : "Ask"}
          </button>
        </div>

        {!status.pdf_loaded && (
          <p className="warning">Please upload a PDF first to start chatting!</p>
        )}
      </div>

      {answer && (
        <div className="results-section">
          <div className="answer-box">
            <h3>🤖 Answer:</h3>
            <div className="answer-content">{answer}</div>
          </div>

          {context && (
            <div className="context-box">
              <h3>📖 Retrieved Context:</h3>
              <div className="context-content">
                {context.split('\n\n').map((chunk, index) => (
                  <div key={index} className="context-chunk">
                    {chunk}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;