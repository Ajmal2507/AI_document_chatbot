import { SignedIn, SignedOut } from "@clerk/clerk-react";
import ChatPage from "./pages/ChatPage";
import LandingPage from "./pages/LandingPage";
import "./App.css";

export default function App() {
  return (
    <>
      <SignedIn>
        <ChatPage />
      </SignedIn>

      <SignedOut>
        <LandingPage />
      </SignedOut>
    </>
  );
}