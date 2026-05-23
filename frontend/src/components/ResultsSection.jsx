export default function ResultsSection({ answer, context }) {
  if (!answer) return null;

  const contextChunks = context ? context.split("\n\n").filter(Boolean) : [];

  return (
    <div className="results-section" role="region" aria-label="Answer and context">
      <div className="card answer-box">
        <div className="section-header">
          <span className="section-icon">🤖</span>
          <h3 className="section-title">Answer</h3>
        </div>
        <p className="answer-content">{answer}</p>
      </div>

      {contextChunks.length > 0 && (
        <div className="card context-box">
          <div className="section-header">
            <span className="section-icon">📖</span>
            <h3 className="section-title">
              Source Context
              <span className="badge">{contextChunks.length} chunks</span>
            </h3>
          </div>

          <div className="context-content">
            {contextChunks.map((chunk, index) => (
              <div key={index} className="context-chunk">
                <span className="chunk-number">#{index + 1}</span>
                <p>{chunk}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
