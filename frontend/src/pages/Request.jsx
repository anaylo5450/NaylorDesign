import { useState, useRef, useEffect } from "react";
import "./Request.css";

export default function Request() {
  const [description, setDescription] = useState("");
  const [email, setEmail] = useState("");
  const [listening, setListening] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const recognizerRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);

    try {
      const res = await fetch("/api/requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description: description.trim(), email: email.trim() }),
      });

      if (res.ok) {
        alert("Request submitted successfully!");
        setDescription("");
        setEmail("");
      } else {
        alert("Failed to submit request.");
      }
    } catch (err) {
      console.error("Error submitting request:", err);
      alert("An error occurred while submitting the request.");
    } finally {
      setSubmitting(false);
    }
  };

  const startVoice = () => {
    // Must be HTTPS or http://localhost, and Chrome/Edge
    if (typeof window === "undefined" || !("webkitSpeechRecognition" in window)) {
      alert("Voice input needs Chrome or Edge.");
      return;
    }

    const rec = new window.webkitSpeechRecognition();
    rec.lang = "en-US";
    rec.interimResults = true;   // we only commit finals below
    rec.continuous = true;

    rec.onstart = () => setListening(true);
    rec.onend = () => setListening(false);

    rec.onresult = (e) => {
      let finalText = "";
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const txt = e.results[i][0].transcript.trim();
        if (e.results[i].isFinal) {
          finalText += (finalText ? " " : "") + txt;
        }
      }
      if (finalText) {
        setDescription((prev) => (prev ? `${prev} ${finalText}` : finalText));
      }
    };

    rec.onerror = (err) => {
      console.error("Speech error:", err);
      setListening(false);
    };

    rec.start();
    recognizerRef.current = rec;
  };

  const stopVoice = () => {
    try {
      recognizerRef.current?.stop();
    } catch {}
    recognizerRef.current = null;
    setListening(false);
  };

  useEffect(() => {
    return () => {
      // cleanup on unmount
      try { recognizerRef.current?.stop(); } catch {}
      recognizerRef.current = null;
    };
  }, []);

  return (
    <div className="request-page">
      <div className="request-container">
        <h1>Request a Custom Part</h1>
        <p className="request-subtitle">
          Describe what you want to build — we’ll help engineer it.
        </p>

        <form onSubmit={handleSubmit} className="request-form">
          <label htmlFor="email">Your Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
            autoComplete="email"
            disabled={submitting}
          />

          <label htmlFor="description">Project Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="8"
            placeholder='Example: I need a cold air intake box that fits a 3.5" tube and mounts near the fog light duct...'
            required
            disabled={submitting}
          />

          <div className="button-group">
            <button
              type="button"
              className="mic-button"
              onClick={startVoice}
              disabled={listening || submitting}
            >
              🎙 Start Voice
            </button>
            <button
              type="button"
              className="mic-button"
              onClick={stopVoice}
              disabled={!listening || submitting}
            >
              ⏹ Stop
            </button>
            <button
              type="submit"
              className="submit-button"
              disabled={submitting}
            >
              {submitting ? "Submitting..." : "Submit Request"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
