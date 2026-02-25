/**
 * AI Chatbot for Portfolio
 * Cloud & DevOps Themed
 */

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
        
        try {
            const response = await this.callAPI(message);
            this.hideTyping();
            this.addMessage(response, 'bot');
        } catch (error) {
            this.hideTyping();
            this.addMessage('Sorry, I encountered an error. Please try again later.', 'bot', true);
            console.error('Chatbot error:', error);
        }
    }
    
    async callAPI(message) {
        const config = window.chatbotConfig || { apiUrl: 'http://localhost:3000/api/chat' };
        
        const response = await fetch(config.apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                message: message,
                history: this.chatHistory
            })
        });
        
        if (!response.ok) {
            throw new Error(`API error: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Update chat history
        if (data.history) {
            this.chatHistory = data.history;
        }
        
        return data.response;
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
