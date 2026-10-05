import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

const API_URL = "http://localhost:5000";

function App() {
  const [text, setText] = useState("");
  const [voiceId, setVoiceId] = useState("JBFqnCBsd6RMkjVDRZzb");
  const [audioUrl, setAudioUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function generateSpeech() {
    setError("");
    setAudioUrl("");

    if (!text.trim()) {
      setError("Paste some text first.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, voice_id: voiceId }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.error || "Speech generation failed.");
      }

      const blob = await response.blob();
      setAudioUrl(URL.createObjectURL(blob));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="page">
      <section className="card">
        <div className="eyebrow">ELEVENLABS × VOICEBRIEF</div>
        <h1>Turn words into a voice.</h1>
        <p className="intro">
          Paste an article, speech, or any written content and generate
          natural-sounding narration.
        </p>

        <label htmlFor="content">Your text</label>
        <textarea
          id="content"
          maxLength="5000"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste your article or text here..."
        />

        <div className="controls">
          <div>
            <label htmlFor="voice">Voice</label>
            <select
              id="voice"
              value={voiceId}
              onChange={(e) => setVoiceId(e.target.value)}
            >
              <option value="JBFqnCBsd6RMkjVDRZzb">George</option>
              <option value="21m00Tcm4TlvDq8ikWAM">Rachel</option>
            </select>
          </div>

          <span className="counter">{text.length}/5000</span>
        </div>

        <button onClick={generateSpeech} disabled={loading}>
          {loading ? "Generating..." : "Generate narration"}
        </button>

        {error && <p className="error">{error}</p>}

        {audioUrl && (
          <div className="player">
            <div>
              <strong>Your narration is ready</strong>
              <span>Generated with ElevenLabs</span>
            </div>
            <audio controls src={audioUrl} />
          </div>
        )}
      </section>
    </main>
  );
}

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
