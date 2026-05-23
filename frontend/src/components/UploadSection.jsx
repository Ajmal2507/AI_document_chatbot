export default function UploadSection({ pdfFile, uploading, setPdfFile, uploadPDF }) {
  return (
    <section className="card upload-section" aria-label="Upload PDF">
      <div className="section-header">
        <span className="section-icon">📄</span>
        <h2 className="section-title">Upload Your PDF</h2>
      </div>

      <div className="file-input-group">
        <label className="file-label" htmlFor="pdf-file-input">
          <span className="file-label-icon">📁</span>
          {pdfFile ? pdfFile.name : "Choose a PDF file…"}
        </label>
        <input
          id="pdf-file-input"
          type="file"
          accept=".pdf"
          className="file-input-hidden"
          onChange={(e) => setPdfFile(e.target.files[0])}
        />

        <button
          className="btn btn-primary"
          onClick={uploadPDF}
          disabled={uploading || !pdfFile}
          aria-busy={uploading}
        >
          {uploading ? (
            <>
              <span className="spinner" aria-hidden="true" />
              Processing…
            </>
          ) : (
            "Upload & Process"
          )}
        </button>
      </div>

      {pdfFile && !uploading && (
        <p className="file-info">
          ✅ Selected: <strong>{pdfFile.name}</strong>
        </p>
      )}
    </section>
  );
}
