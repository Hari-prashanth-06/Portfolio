// Server.js - Express backend for Gemini AI Chatbot
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

// System prompt with portfolio context
const SYSTEM_PROMPT = `You are an AI assistant for Hariprashanth A's portfolio website. 
You are a Cloud & DevOps Enthusiast helping visitors learn about him.

CONTEXT ABOUT HARI PRASHANTH:
- Name: Hariprashanth A
- Role: Cloud & DevOps Enthusiast | AWS Infrastructure | Automation Learner
- Education: Computer Science and Engineering student
- Location: India

SKILLS:
- Programming: C++, Java, Python (Basics)
- Tools: Linux, Docker (Basics), Git, GitHub, GitHub Actions
- AWS Services: EC2, IAM, S3, RDS, VPC, Route53
- Concepts: Data Structures, CI/CD Concepts, Infrastructure & Networking Basics

PROJECTS:
1. Three-Tier Web Application on AWS
   - Designed presentation, application, and database layers
   - Deployed web and application servers using EC2
   - Integrated managed database using RDS
   - Configured public and internal load balancers
   - Implemented VPC networking, IAM roles, and security groups
   - Enabled Auto Scaling for high availability
   - Implemented domain hosting and SSL security
   - Built a scalable, secure cloud architecture following real DevOps deployment practices

LEARNING JOURNEY:
- Currently Learning: Python automation, Docker containerization, CI/CD pipelines, DevOps best practices
- Planned Certifications: AWS Cloud Practitioner, Docker Fundamentals, Kubernetes Basics

INTERESTS:
- Cloud-native applications
- DevOps automation
- Containerization
- Infrastructure as Code
- Real-world cloud deployments

CONTACT:
- Email: hariprashanthandiyappan@gmail.com
- GitHub: https://github.com/Hari-prashanth-06/noobie
- LinkedIn: https://www.linkedin.com/in/hari-prashanth-315866299

GUIDELINES:
- Be friendly, professional, and helpful
- Keep responses concise but informative
- Use bullet points for listing skills or features
- If asked about topics not related to Hariprashanth or his skills, politely redirect
- Always respond as if you are representing Hariprashanth's virtual assistant`;

// Chat history (in-memory for demo - use database in production)
let chatHistory = [];

// Chat endpoint
app.post('/api/chat', async (req, res) => {
    try {
        const { message, history } = req.body;
        
        if (!message) {
            return res.status(400).json({ error: 'Message is required' });
        }

        // Build conversation context
        let conversationHistory = history || chatHistory;
        
        // Create chat session with system prompt
        const chat = model.startChat({
            history: [
                {
                    role: 'user',
                    parts: [{ text: SYSTEM_PROMPT }]
                },
                ...conversationHistory.slice(-10) // Keep last 10 messages for context
            ],
            generationConfig: {
                temperature: 0.7,
                maxOutputTokens: 500,
            },
        });

        // Send message and get response
        const result = await chat.sendMessage(message);
        const response = result.response.text();

        // Update chat history
        conversationHistory.push(
            { role: 'user', parts: [{ text: message }] },
            { role: 'model', parts: [{ text: response }] }
        );
        
        // Keep history manageable
        if (conversationHistory.length > 20) {
            chatHistory = conversationHistory.slice(-20);
        }

        res.json({ 
            response: response,
            history: conversationHistory.slice(-10)
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ 
            error: 'Sorry, I encountered an error. Please try again.',
            details: error.message 
        });
    }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Start server
app.listen(PORT, () => {
    console.log(`🤖 Chatbot server running on http://localhost:${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});
