import messagesData from "@/services/mockData/messages.json";

// Simulated API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

class MessageService {
  constructor() {
    this.messages = [...messagesData];
  }

  async getAll() {
    await delay(300);
    return [...this.messages];
  }

  async getById(id) {
    await delay(200);
    const message = this.messages.find(m => m.Id === parseInt(id));
    if (!message) {
      throw new Error("Message not found");
    }
    return message;
  }

  async getByChatId(chatId) {
    await delay(250);
    return this.messages
      .filter(m => m.chatId === parseInt(chatId))
      .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
  }

  async create(messageData) {
    await delay(400);
    const newMessage = {
      Id: Math.max(...this.messages.map(m => m.Id)) + 1,
      ...messageData,
      timestamp: new Date().toISOString()
    };
    
    this.messages.push(newMessage);
    return newMessage;
  }

  async update(id, messageData) {
    await delay(300);
    const index = this.messages.findIndex(m => m.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Message not found");
    }

    this.messages[index] = { ...this.messages[index], ...messageData };
    return this.messages[index];
  }

  async delete(id) {
    await delay(300);
    const index = this.messages.findIndex(m => m.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Message not found");
    }

    const deletedMessage = this.messages[index];
    this.messages.splice(index, 1);
    return deletedMessage;
  }

  async markAsRead(chatId, userId) {
    await delay(200);
    const chatMessages = this.messages.filter(m => 
      m.chatId === parseInt(chatId) && 
      m.senderId !== userId &&
      !m.isRead
    );

    chatMessages.forEach(message => {
      message.isRead = true;
    });

    return chatMessages.length;
  }
}

export const messageService = new MessageService();