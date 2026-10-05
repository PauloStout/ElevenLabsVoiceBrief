# VoiceBrief

A full-stack text-to-speech web application built around the ElevenLabs API.

VoiceBrief lets a user paste an article, speech, or other written content, choose a voice, and generate lifelike narration that can be played directly in the browser.

## Why I built it

This project explores a practical use of voice AI: making written content easier to consume through audio. It demonstrates:

- Python backend development with Flask
- React frontend development
- REST API design
- Secure server-side API-key handling
- Third-party API integration
- Client-side audio playback
- Input validation and error handling
- A simple, user-focused product workflow

## Architecture

React frontend -> Flask REST API -> ElevenLabs API

The ElevenLabs API key is kept on the server and is never exposed to the browser.

## Setup

### 1. Backend

Create and activate a virtual environment:

```bash
cd backend
python -m venv .venv
```

Windows:

```bash
.venv\Scripts\activate
```

macOS/Linux:

```bash
source .venv/bin/activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Copy `.env.example` to `.env` and add your ElevenLabs API key:

```env
ELEVENLABS_API_KEY=your_key_here
```

Run the backend:

```bash
python app.py
```

The API will run at `http://localhost:5000`.

### 2. Frontend

In another terminal:

```bash
cd frontend
npm install
npm run dev
```

Open the local URL shown by Vite.

## API

`POST /api/generate`

Request:

```json
{
  "text": "Text to narrate",
  "voice_id": "JBFqnCBsd6RMkjVDRZzb"
}
```

The endpoint returns MP3 audio data.

## Security

The ElevenLabs API key is loaded from an environment variable and only used by the Flask backend. It is not included in frontend code.

## Future improvements

- Article URL ingestion
- Streaming generation for lower perceived latency
- Voice selection from the ElevenLabs voice library
- Saved narration history
- Character/cost estimates
- Authentication and user accounts
- Audio download
- Responsive mobile UI
- Automated tests
- Deployment with separate frontend/backend services

## Technologies

Python, Flask, React, JavaScript, ElevenLabs API, REST, HTML, CSS
