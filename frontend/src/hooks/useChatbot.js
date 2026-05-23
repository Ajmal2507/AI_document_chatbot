import { useEffect, useState } from "react";
import { useAuth } from "@clerk/clerk-react";
import axios from "axios";

const API_BASE = "http://127.0.0.1:8000";

export function useChatbot() {
  const { getToken } = useAuth();

  const [pdfFile, setPdfFile] = useState(null);
  const [query, setQuery] = useState("");
  const [answer, setAnswer] = useState("");
  const [context, setContext] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [status, setStatus] = useState({ pdf_loaded: false, vectorstore_size: 0 });
  const [notification, setNotification] = useState(null);

  const getAuthHeaders = async () => {
    const token = await getToken();
    return { Authorization: `Bearer ${token}` };
  };

  const notify = (type, text) => {
    setNotification({ type, text });
    setTimeout(() => setNotification(null), 4000);
  };

  const checkStatus = async () => {
    try {
      const res = await axios.get(`${API_BASE}/status`);
      setStatus(res.data);
    } catch (error) {
      console.error("Status check failed:", error);
    }
  };

  const uploadPDF = async () => {
    if (!pdfFile) return;

    setUploading(true);
    try {
      const headers = await getAuthHeaders();
      const formData = new FormData();
      formData.append("file", pdfFile);

      const res = await axios.post(`${API_BASE}/upload_pdf/`, formData, {
        headers: { ...headers, "Content-Type": "multipart/form-data" },
      });

      notify("success", res.data.message);
      await checkStatus();
    } catch (error) {
      const msg = error.response?.data?.detail || "Error uploading PDF. Please try again.";
      notify("error", msg);
    } finally {
      setUploading(false);
    }
  };

  const askQuestion = async () => {
    if (!query.trim()) return;

    setLoading(true);
    setAnswer("");
    setContext("");

    try {
      const headers = await getAuthHeaders();
      const formData = new FormData();
      formData.append("query", query);

      const res = await axios.post(`${API_BASE}/chat/`, formData, { headers });
      setAnswer(res.data.answer);
      setContext(res.data.context);
    } catch (error) {
      const msg = error.response?.data?.detail || "Error getting answer. Please try again.";
      setAnswer(`⚠️ ${msg}`);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !loading && !e.shiftKey) {
      e.preventDefault();
      askQuestion();
    }
  };

  useEffect(() => {
    checkStatus();
  }, []);

  return {
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
  };
}
