import { useState, useRef } from "react";
import { UploadCloud, FileText, CheckCircle2, ArrowRight, Loader2, Sparkles, X } from "lucide-react";

export default function UploadSection({ pdfFile, uploading, setPdfFile, uploadPDF, status }) {
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
    <section className="panel-card upload-panel" aria-label="Document Ingestion">
      <div className="panel-header">
        <div className="panel-header-left">
          <UploadCloud size={16} className="text-secondary-accent" />
          <h2 className="panel-title">Document Ingestion</h2>
        </div>
        {status?.pdf_loaded && (
          <span className="pill-badge pill-success">
            <CheckCircle2 size={12} />
            Indexed ({status.vectorstore_size} chunks)
          </span>
        )}
      </div>

      <div
        className={`dropzone-area ${dragOver ? "dropzone-dragover" : ""} ${pdfFile ? "dropzone-has-file" : ""}`}
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
          <div className="dropzone-empty-state">
            <div className="dropzone-icon-box">
              <UploadCloud size={22} />
            </div>
            <p className="dropzone-title">
              <span className="dropzone-action">Click to upload</span> or drag and drop
            </p>
            <p className="dropzone-subtitle">PDF documents up to 25MB supported</p>
          </div>
        ) : (
          <div className="file-preview-card">
            <div className="file-info-row">
              <div className="file-icon-square">
                <FileText size={18} />
              </div>
              <div className="file-meta-col">
                <p className="file-name-text">{pdfFile.name}</p>
                <div className="file-meta-tags">
                  <span className="file-size-tag">{formatFileSize(pdfFile.size)}</span>
                  <span className="file-ext-tag">PDF</span>
                </div>
              </div>
            </div>

            <button
              type="button"
              className="btn-remove-file"
              onClick={(e) => {
                e.stopPropagation();
                setPdfFile(null);
              }}
              title="Remove file"
            >
              <X size={14} />
            </button>
          </div>
        )}
      </div>

      {pdfFile && (
        <div className="upload-actions-row">
          <button
            className="btn btn-primary btn-full"
            onClick={(e) => {
              e.stopPropagation();
              uploadPDF();
            }}
            disabled={uploading}
          >
            {uploading ? (
              <>
                <Loader2 size={15} className="spinner-rotate" />
                <span>Vectorizing Document Chunks…</span>
              </>
            ) : (
              <>
                <span>Index Document in Vector Store</span>
                <ArrowRight size={14} />
              </>
            )}
          </button>
        </div>
      )}
    </section>
  );
}
