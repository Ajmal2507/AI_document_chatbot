import { SignInButton, SignUpButton } from "@clerk/clerk-react";
import { Sparkles, Search, Zap, ShieldCheck, ArrowRight, FileText, Cpu, Database } from "lucide-react";

const FEATURES = [
  {
    icon: Search,
    iconColor: "text-indigo-400",
    bgClass: "icon-bg-indigo",
    title: "Dense Semantic Retrieval",
    desc: "Uses FastEmbed ONNX vectors and FAISS similarity search to retrieve exact matching passages rather than naive keyword matching.",
  },
  {
    icon: Zap,
    iconColor: "text-amber-400",
    bgClass: "icon-bg-amber",
    title: "Sub-Second Groq Inference",
    desc: "Answers generated with state-of-the-art open models on Groq LPUs for near-instant latency and high factual accuracy.",
  },
  {
    icon: ShieldCheck,
    iconColor: "text-emerald-400",
    bgClass: "icon-bg-emerald",
    title: "Zero-Persistence Privacy",
    desc: "Documents are processed in memory and encrypted JWT tokens are verified via Clerk JWKS public key cryptography.",
  },
];

export default function LandingPage() {
  return (
    <div className="landing-wrapper">
      <div className="landing-bg-glow glow-1" aria-hidden="true" />
      <div className="landing-bg-glow glow-2" aria-hidden="true" />

      <div className="landing-card">
        {/* Top Tag */}
        <div className="hero-badge">
          <Sparkles size={14} className="text-indigo-400" />
          <span>Production RAG Document Intelligence</span>
        </div>

        {/* Hero Title */}
        <div className="landing-hero">
          <h1 className="landing-title">
            Transform Any PDF into an <span className="gradient-text">Interactive Knowledge Base</span>
          </h1>
          <p className="landing-subtitle">
            Upload multi-page documents and query them in natural language. Powered by ONNX vector embeddings, FAISS search, and Groq LPUs.
          </p>
        </div>

        {/* Features */}
        <div className="features-grid">
          {FEATURES.map((feat) => {
            const Icon = feat.icon;
            return (
              <div className="feature-card" key={feat.title}>
                <div className={`feature-icon-wrapper ${feat.bgClass}`}>
                  <Icon size={20} className={feat.iconColor} />
                </div>
                <h3 className="feature-title">{feat.title}</h3>
                <p className="feature-desc">{feat.desc}</p>
              </div>
            );
          })}
        </div>

        {/* CTA Actions */}
        <div className="landing-actions">
          <SignInButton mode="modal">
            <button className="btn btn-primary btn-large" id="sign-in-btn">
              <span>Sign In to Workspace</span>
              <ArrowRight size={16} />
            </button>
          </SignInButton>
          <SignUpButton mode="modal">
            <button className="btn btn-outline btn-large" id="sign-up-btn">
              Create Account
            </button>
          </SignUpButton>
        </div>

        {/* Tech Stack Pills */}
        <div className="stack-pills">
          <span className="stack-pill">
            <Cpu size={12} /> Groq LPU
          </span>
          <span className="stack-pill">
            <Database size={12} /> FAISS + FastEmbed
          </span>
          <span className="stack-pill">
            <ShieldCheck size={12} /> Clerk Auth
          </span>
          <span className="stack-pill">
            <FileText size={12} /> FastAPI + React 19
          </span>
        </div>
      </div>
    </div>
  );
}
