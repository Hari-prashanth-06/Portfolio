/**
 * AI Chatbot for Portfolio - Client Side
 * Uses Google Gemini API directly from browser
 * With fallback to built-in responses
 */

// Portfolio Knowledge Base - Works without API!
const PORTFOLIO_KNOWLEDGE = {
  about: `Hi! I'm Hariprashanth A, a Computer Science and Engineering student focused on Cloud and DevOps engineering. I enjoy designing scalable infrastructure, working with Linux environments, and automating deployments using modern tools. I have hands-on experience deploying multi-tier applications on AWS and understanding networking, security, and CI/CD workflows. Currently, I'm learning Python, Docker, and advanced DevOps practices to build real-world cloud-native solutions.`,

  skills: `Here are my technical skills:

**Programming Languages:**
• C++
• Java
• Python (Basics)

**Tools & Platforms:**
• Linux
• Docker (Basics)
• Git
• GitHub
• GitHub Actions

**AWS Cloud Services:**
• EC2
• IAM
• S3
• RDS
• VPC
• Route53

**Concepts:**
• Data Structures
• CI/CD Concepts
• Infrastructure & Networking Basics`,

  project: `My main project is the **Three-Tier Web Application on AWS**:

**Highlights:**
• Designed presentation, application, and database layers
• Deployed web and application servers using EC2
• Integrated managed database using RDS
• Configured public and internal load balancers
• Implemented VPC networking, IAM roles, and security groups
• Enabled Auto Scaling for high availability
• Implemented domain hosting and SSL security

**Outcome:** Built a scalable, secure cloud architecture following real DevOps deployment practices.`,

  certifications: `I'm planning to get these certifications:
• AWS Cloud Practitioner
• Docker Fundamentals
• Kubernetes Basics`,

  learning: `Currently I'm learning:
• Python automation
• Docker containerization
• CI/CD pipelines
• DevOps best practices`,

  interests: `My interests include:
• Cloud-native applications
• DevOps automation
• Containerization
• Infrastructure as Code
• Real-world cloud deployments`,

  contact: `You can contact Hariprashanth:
• Email: hariprashanthandiyappan@gmail.com
• GitHub: https://github.com/Hari-prashanth-06/noobie
• LinkedIn: https://www.linkedin.com/in/hari-prashanth-315866299`,

  greeting: `👋 Hi there! I'm Hariprashanth's AI assistant. I can help you learn about his skills, projects, certifications, and more. Feel free to ask me anything!`
};

// Simple keyword-based response system (works reliably!)
function getKeywordResponse(message) {
  const lowerMessage = message.toLowerCase();
  
  if (lowerMessage.includes('about') || lowerMessage.includes('yourself') || lowerMessage.includes('who are you')) {
    return PORTFOLIO_KNOWLEDGE.about;
  }
  if (lowerMessage.includes('skill') || lowerMessage.includes('technology') || lowerMessage.includes('tech stack')) {
    return PORTFOLIO_KNOWLEDGE.skills;
  }
  if (lowerMessage.includes('project') || lowerMessage.includes('aws') || lowerMessage.includes('three-tier')) {
    return PORTFOLIO_KNOWLEDGE.project;
  }
  if (lowerMessage.includes('certification') || lowerMessage.includes('certify') || lowerMessage.includes('planned')) {
    return PORTFOLIO_KNOWLEDGE.certifications;
  }
  if (lowerMessage.includes('learn') || lowerMessage.includes('learning')) {
    return PORTFOLIO_KNOWLEDGE.learning;
  }
  if (lowerMessage.includes('interest') || lowerMessage.includes('hobby')) {
    return PORTFOLIO_KNOWLEDGE.interests;
  }
  if (lowerMessage.includes('contact') || lowerMessage.includes('email') || lowerMessage.includes('reach')) {
    return PORTFOLIO_KNOWLEDGE.contact;
  }
  if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
    return PORTFOLIO_KNOWLEDGE.greeting;
  }
  
  // Default response with portfolio info
  return `I'm Hariprashanth's AI assistant! I can tell you about:
• His skills and technologies
• His AWS Three-Tier project
• Certifications he's planning
• His learning journey
• How to contact him

What would you like to know?`;
}

class PortfolioChatbot {
    constructor() {
        this.toggleBtn = document.getElementById('chatbotToggle');
        this.container = document.getElementById('chatbotContainer');
        this.messagesContainer = document.getElementById('chatbotMessages');
        this.input = document.getElementById('chatbotInput');
        this.sendBtn = document.getElementById('chatbotSend');
        this.typingIndicator = document.getElementById('typingIndicator');
        
        this.chatHistory = [];
        this.isOpen = false;
        
        this.init();
    }
    
    init() {
        // Toggle chatbot
        this.toggleBtn.addEventListener('click', () => this.toggle());
        
        // Minimize
        document.getElementById('chatbotMinimize')?.addEventListener('click', () => this.toggle());
        
        // Send message on button click
        this.sendBtn.addEventListener('click', () => this.sendMessage());
        
        // Send message on Enter key
        this.input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.sendMessage();
            }
        });
        
        // Suggested questions
        document.querySelectorAll('.suggestion-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const question = btn.dataset.question;
                this.input.value = question;
                this.sendMessage();
            });
        });
    }
    
    toggle() {
        this.isOpen = !this.isOpen;
        this.toggleBtn.classList.toggle('active', this.isOpen);
        this.container.classList.toggle('active', this.isOpen);
        
        if (this.isOpen) {
            this.input.focus();
        }
    }
    
    async sendMessage() {
        const message = this.input.value.trim();
        if (!message) return;
        
        // Add user message
        this.addMessage(message, 'user');
        this.input.value = '';
        
        // Show typing indicator
        this.showTyping();
        
        // Simulate thinking delay
        setTimeout(() => {
            this.hideTyping();
            // Use built-in keyword responses (works reliably!)
            const response = getKeywordResponse(message);
            this.addMessage(response, 'bot');
        }, 800);
    }
    
    addMessage(text, sender, isError = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message ${isError ? 'error-message' : ''}`;
        
        const avatarIcon = sender === 'bot' ? 'fa-cloud' : 'fa-user';
        
        messageDiv.innerHTML = `
            <div class="message-avatar">
                <i class="fas ${avatarIcon}"></i>
            </div>
            <div class="message-content">
                <p>${this.formatMessage(text)}</p>
            </div>
        `;
        
        this.messagesContainer.appendChild(messageDiv);
        this.scrollToBottom();
    }
    
    formatMessage(text) {
        // Convert line breaks to <br>
        text = text.replace(/\n/g, '<br>');
        
        // Convert bullet points
        text = text.replace(/• /g, '<br>• ');
        
        // Convert **bold** to <strong>
        text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        
        return text;
    }
    
    showTyping() {
        this.typingIndicator.style.display = 'block';
        this.scrollToBottom();
    }
    
    hideTyping() {
        this.typingIndicator.style.display = 'none';
    }
    
    scrollToBottom() {
        this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
    }
}

// Initialize chatbot when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.portfolioChatbot = new PortfolioChatbot();
});

// Fallback: Initialize immediately if DOM is already loaded
if (document.readyState !== 'loading') {
    window.portfolioChatbot = new PortfolioChatbot();
}
