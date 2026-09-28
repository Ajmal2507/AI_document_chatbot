import { useState, useRef } from "react";
import { UploadCloud, FileText, CheckCircle2, ArrowRight, Loader2, Sparkles } from "lucide-react";

export default function UploadSection({ pdfFile, uploading, setPdfFile, uploadPDF }) {
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef(null);

  const formatFileSize = (bytes) => {
    if (!bytes) return "";
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const files = e.dataTransfer.files;
    if (files && files[0] && files[0].name.toLowerCase().endsWith(".pdf")) {
      setPdfFile(files[0]);
    }
  };

  return (
    <section className="saas-card upload-card" aria-label="Upload PDF">
      <div className="card-header">
        <div className="header-icon-box">
          <UploadCloud size={20} className="text-indigo-400" />
        </div>
        <div>
          <h2 className="card-title">Document Ingestion</h2>
          <p className="card-desc">Upload a PDF to vectorize and store in local FAISS memory</p>
        </div>
      </div>

      <div
        className={`dropzone-container ${dragOver ? "dropzone-active" : ""} ${pdfFile ? "dropzone-selected" : ""}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          id="pdf-file-input"
          type="file"
          accept=".pdf"
          className="file-input-hidden"
          onChange={(e) => setPdfFile(e.target.files[0])}
        />

        {!pdfFile ? (
          <div className="dropzone-empty">
            <div className="upload-icon-circle">
              <UploadCloud size={26} className="upload-cloud-icon" />
            </div>
            <p className="dropzone-prompt">
              <span className="dropzone-cta">Click to browse</span> or drag and drop your PDF here
            </p>
            <span className="dropzone-hint">Supports multi-page PDF documents up to 25MB</span>
          </div>
        ) : (
          <div className="dropzone-file-preview">
            <div className="file-preview-left">
              <div className="file-icon-box">
                <FileText size={22} className="text-indigo-400" />
              </div>
              <div className="file-details">
                <p className="file-name">{pdfFile.name}</p>
                <div className="file-meta">
                  <span className="file-size">{formatFileSize(pdfFile.size)}</span>
                  <span className="file-type-badge">PDF</span>
                </div>
              </div>
            </div>

            <div className="file-preview-right">
              <span className="file-status-badge">Ready to ingest</span>
            </div>
          </div>
        )}
      </div>

      {pdfFile && (
        <div className="upload-action-bar">
          <button
            className="btn btn-primary btn-ingest"
            onClick={(e) => {
              e.stopPropagation();
              uploadPDF();
            }}
            disabled={uploading}
          >
            {uploading ? (
              <>
                <Loader2 size={16} className="spin-animate" />
                <span>Vectorizing Chunks with FastEmbed…</span>
              </>
            ) : (
              <>
                <Sparkles size={16} />
                <span>Process & Vectorize Document</span>
                <ArrowRight size={15} />
              </>
            )}
          </button>
        </div>
      )}
    </section>
  );
}
