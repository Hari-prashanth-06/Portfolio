# Portfolio AI Chatbot 🤖

AI-powered chatbot for your Cloud & DevOps portfolio using Google Gemini API.

## Features

- 🤖 AI-powered virtual assistant
- 💬 Real-time chat with Gemini Pro
- 🎨 Cloud/DevOps themed UI (glassmorphism, gradients)
- 📱 Fully responsive (mobile-friendly)
- ⚡ Fast and lightweight
- 🔒 Secure API key management

## Quick Start

### 1. Navigate to chatbot folder
```
bash
cd portfolio/chatbot
```

### 2. Install dependencies
```
bash
npm install
```

### 3. Configure API Key

The `.env` file already contains your API key. If you need to update it:

```
bash
# Edit the .env file
nano .env
```

Or create a new `.env` file:
```
env
GEMINI_API_KEY=AIzaSyDuwlvMU1ALVEGpovGL2T9yN5bW4G_S4E8
PORT=3000
```

### 4. Start the server
```
bash
# Development
npm run dev

# Or
node server.js
```

Server will start at: `http://localhost:3000`

### 5. Test the API
```
bash
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Tell me about yourself"}'
```

## Integration with Portfolio

### Option 1: Add to existing HTML

Add these lines before `</body>` in your `portfolio/index.html`:

```
html
<!-- Chatbot Styles -->
<link rel="stylesheet" href="chatbot/chatbot.css">

<!-- Chatbot HTML -->
<div class="chatbot-html-placeholder"></div>

<!-- Chatbot Scripts -->
<script src="chatbot/chatbot.js"></script>
```

### Option 2: Copy component code

Copy the contents of:
- `chatbot.html` → Add to your HTML before `</body>`
- `chatbot.css` → Add to your CSS or link externally
- `chatbot.js` → Add to your JS or link externally

### Update API URL

In `chatbot.html`, update the `apiUrl`:

```
javascript
window.chatbotConfig = {
    apiUrl: 'http://localhost:3000/api/chat'
};
```

For production, use your deployed URL:
```
javascript
window.chatbotConfig = {
    apiUrl: 'https://your-app.vercel.app/api/chat'
};
```

## Deployment

### Vercel (Recommended)

1. Install Vercel CLI:
```
bash
npm i -g vercel
```

2. Deploy:
```
bash
vercel
```

3. Set environment variable in Vercel Dashboard:
   - Go to Settings → Environment Variables
   - Add `GEMINI_API_KEY` with your API key

### Netlify

1. Install Netlify CLI:
```
bash
npm i -g netlify-cli
```

2. Deploy:
```
bash
netlify deploy --prod
```

3. Set environment variables in Netlify Dashboard

### Render / Heroku

1. Connect your GitHub repository
2. Set environment variable: `GEMINI_API_KEY`
3. Build command: `npm install`
4. Start command: `node server.js`

## Project Structure

```
portfolio/
├── chatbot/
│   ├── server.js          # Express backend
│   ├── package.json       # Dependencies
│   ├── .env              # API key (local)
│   ├── .env.example      # Environment template
│   ├── chatbot.html      # Chatbot UI component
│   ├── chatbot.css       # Chatbot styles
│   ├── chatbot.js        # Chatbot logic
│   └── README.md        # This file
├── index.html
├── styles.css
└── script.js
```

## API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/chat` | POST | Send message to AI |
| `/api/health` | GET | Health check |

## Custom Knowledge

Edit `server.js` to customize the chatbot's knowledge about you:

```
javascript
const SYSTEM_PROMPT = `You are an AI assistant for Hariprashanth A's portfolio...
// Update this section with your info`;
```

## Troubleshooting

### "API key not valid"
- Check your API key in `.env`
- Ensure Gemini API is enabled in Google AI Studio

### "CORS error"
- The server uses CORS to allow localhost
- For production, configure proper CORS settings

### "Connection refused"
- Make sure the server is running
- Check if port 3000 is available

## Tech Stack

- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Node.js, Express
- **AI:** Google Gemini Pro
- **Deployment:** Vercel/Netlify/Render

## License

MIT License - Feel free to use and modify!

---

Built with ❤️ for Cloud & DevOps
