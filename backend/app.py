import os
from io import BytesIO

from dotenv import load_dotenv
from elevenlabs.client import ElevenLabs
from flask import Flask, jsonify, request, send_file
from flask_cors import CORS

load_dotenv()

app = Flask(__name__)
CORS(app)

api_key = os.getenv="api key"
client = ElevenLabs(api_key=api_key) if api_key else None

DEFAULT_VOICE = "JBFqnCBsd6RMkjVDRZzb"


@app.get("/api/health")
def health():
    return jsonify({
        "status": "ok",
        "elevenlabs_configured": client is not None
    })


@app.post("/api/generate")
def generate():
    if client is None:
        return jsonify({"error": "ElevenLabs API key is not configured on the server."}), 500

    data = request.get_json(silent=True) or {}
    text = (data.get("text") or "").strip()
    voice_id = (data.get("voice_id") or DEFAULT_VOICE).strip()

    if not text:
        return jsonify({"error": "Please provide text to narrate."}), 400

    if len(text) > 5000:
        return jsonify({"error": "Please keep the text below 5,000 characters for this demo."}), 400

    try:
        audio = client.text_to_speech.convert(
            text=text,
            voice_id=voice_id,
            model_id="eleven_multilingual_v2",
            output_format="mp3_44100_128",
        )

        audio_bytes = b"".join(audio)

        return send_file(
            BytesIO(audio_bytes),
            mimetype="audio/mpeg",
            as_attachment=False,
            download_name="voicebrief.mp3",
        )

    except Exception as exc:
        app.logger.exception("ElevenLabs generation failed")
        return jsonify({"error": "Speech generation failed. Please try again.", "detail": str(exc)}), 502



if __name__ == "__main__":
    app.run(debug=True, port=5000)
