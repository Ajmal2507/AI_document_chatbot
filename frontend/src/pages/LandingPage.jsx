import { SignInButton, SignUpButton } from "@clerk/clerk-react";
import { Search, Zap, Shield, ArrowRight, FileText, Cpu, Database, Layers, CheckCircle2 } from "lucide-react";

const ARCHITECTURE_POINTS = [
  {
    icon: Search,
    title: "Dense Vector Search",
    desc: "Calculates dense semantic embeddings with BGE-Small ONNX and retrieves top-k relevant document chunks via FAISS vector indices.",
  },
  {
    icon: Cpu,
    title: "High-Throughput LPU Inference",
    desc: "Executes LLM inference via Groq LPUs delivering responses in sub-100ms with strict prompt grounding to avoid hallucinations.",
  },
  {
    icon: Shield,
    title: "Asymmetric Cryptographic Auth",
    desc: "Validates JSON Web Tokens against Clerk JWKS public key certificates using RS256 algorithm on every protected endpoint.",
  },
];

export default function LandingPage() {
  return (
    <div className="landing-page-root">
      <nav className="landing-nav">
        <div className="nav-container">
          <div className="brand-badge">
            <Layers size={18} className="text-primary-accent" />
            <span className="brand-name">DocuMind</span>
            <span className="brand-tag">Enterprise RAG</span>
          </div>

          <div className="nav-actions">
            <SignInButton mode="modal">
              <button className="btn btn-outline btn-sm">Sign In</button>
            </SignInButton>
            <SignUpButton mode="modal">
              <button className="btn btn-primary btn-sm">Get Started</button>
            </SignUpButton>
          </div>
        </div>
      </nav>

      <main className="landing-hero-section">
        <div className="landing-container">
          <div className="badge-pill">
            <span className="badge-dot" />
            <span>FastAPI · React 19 · LangChain · Groq</span>
          </div>

          <h1 className="hero-headline">
            Context-Grounded Document <br />
            <span className="headline-gradient">Retrieval & Intelligence</span>
          </h1>

          <p className="hero-subtext">
            An end-to-end full-stack Retrieval-Augmented Generation system. Ingest unstructured PDF documents, perform vector similarity search, and query knowledge via ultra-fast LPUs.
          </p>

          <div className="hero-cta-group">
            <SignUpButton mode="modal">
              <button className="btn btn-primary btn-lg">
                <span>Launch Workspace</span>
                <ArrowRight size={16} />
              </button>
            </SignUpButton>
            <SignInButton mode="modal">
              <button className="btn btn-outline btn-lg">
                <span>Existing User Sign In</span>
              </button>
            </SignInButton>
          </div>

          <div className="architecture-grid">
            {ARCHITECTURE_POINTS.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="arch-card">
                  <div className="arch-icon-wrapper">
                    <Icon size={18} />
                  </div>
                  <h3 className="arch-card-title">{item.title}</h3>
                  <p className="arch-card-desc">{item.desc}</p>
                </div>
              );
            })}
          </div>

          <div className="specs-strip">
            <div className="spec-item">
              <Database size={14} />
              <span>FAISS Vector Index</span>
            </div>
            <span className="spec-separator" />
            <div className="spec-item">
              <Cpu size={14} />
              <span>Groq LPU Hardware</span>
            </div>
            <span className="spec-separator" />
            <div className="spec-item">
              <FileText size={14} />
              <span>FastEmbed ONNX Embeddings</span>
            </div>
            <span className="spec-separator" />
            <div className="spec-item">
              <Shield size={14} />
              <span>Clerk JWT Verification</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
