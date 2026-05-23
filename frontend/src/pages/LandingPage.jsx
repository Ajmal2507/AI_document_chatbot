import { SignInButton, SignUpButton } from "@clerk/clerk-react";

const FEATURES = [
  { icon: "🔍", title: "Semantic Search", desc: "Finds the most relevant passages — not just keyword matches." },
  { icon: "⚡", title: "Instant Answers", desc: "Powered by Groq's ultra-fast LLaMA 3.1 inference engine." },
  { icon: "🔒", title: "Secure & Private", desc: "Your documents are processed in-memory and never stored." },
];

export default function LandingPage() {
  return (
    <div className="landing-wrapper">
      <div className="landing-card">
        <div className="landing-hero">
          <div className="landing-logo">📚</div>
          <h1 className="landing-title">AI Document Chatbot</h1>
          <p className="landing-subtitle">
            Upload any PDF and have an intelligent conversation with it.
            Ask questions in plain English and get precise answers in seconds.
          </p>
        </div>

        <div className="features-grid">
          {FEATURES.map((feat) => (
            <div className="feature-card" key={feat.title}>
              <span className="feature-icon">{feat.icon}</span>
              <h3 className="feature-title">{feat.title}</h3>
              <p className="feature-desc">{feat.desc}</p>
            </div>
          ))}
        </div>

        <div className="landing-actions">
          <SignInButton mode="modal">
            <button className="btn btn-primary btn-large" id="sign-in-btn">
              Sign In
            </button>
          </SignInButton>
          <SignUpButton mode="modal">
            <button className="btn btn-outline btn-large" id="sign-up-btn">
              Create Free Account
            </button>
          </SignUpButton>
        </div>

        <p className="landing-footer">
          Free to use · No credit card required · Powered by Groq + LLaMA 3.1
        </p>
      </div>
    </div>
  );
}
