import { useEffect, useState } from "react";
import { useAuth } from "@clerk/clerk-react";
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

export function useChatbot() {
  const { getToken } = useAuth();

  const [pdfFile, setPdfFile] = useState(null);
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState([]);
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
      const msg = error.response?.data?.detail || "Failed to process PDF document.";
      notify("error", msg);
    } finally {
      setUploading(false);
    }
  };

  const askQuestion = async (customQuery) => {
    const textToAsk = typeof customQuery === "string" ? customQuery : query;
    if (!textToAsk.trim()) return;

    const currentQuery = textToAsk.trim();
    setQuery("");
    setLoading(true);

    const userMessage = {
      id: Date.now(),
      role: "user",
      content: currentQuery,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMessage]);

    try {
      const headers = await getAuthHeaders();
      const formData = new FormData();
      formData.append("query", currentQuery);

      const res = await axios.post(`${API_BASE}/chat/`, formData, { headers });

      const assistantMessage = {
        id: Date.now() + 1,
        role: "assistant",
        content: res.data.answer,
        context: res.data.context,
        sourcesCount: res.data.sources_count || 0,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, assistantMessage]);
      setAnswer(res.data.answer);
      setContext(res.data.context);
    } catch (error) {
      const msg = error.response?.data?.detail || "Failed to generate response from inference engine.";
      const errorMessage = {
        id: Date.now() + 1,
        role: "assistant",
        isError: true,
        content: msg,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, errorMessage]);
      setAnswer(msg);
    } finally {
      setLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([]);
    setAnswer("");
    setContext("");
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
  };
}
