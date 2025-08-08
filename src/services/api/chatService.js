import chatsData from "@/services/mockData/chats.json";
import { userService } from "./userService";

// Simulated API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

class ChatService {
  constructor() {
    this.chats = [...chatsData];
  }

  async getAll() {
    await delay(300);
    return this.chats.map(chat => ({
      ...chat,
      otherParticipant: this.getOtherParticipant(chat)
    }));
  }

  async getById(id) {
    await delay(200);
    const chat = this.chats.find(c => c.Id === parseInt(id));
    if (!chat) {
      throw new Error("Chat not found");
    }
    return {
      ...chat,
      otherParticipant: this.getOtherParticipant(chat)
    };
  }

  getOtherParticipant(chat) {
    // Assuming current user is always "1"
    const otherParticipantId = chat.participants.find(id => id !== "1");
    return userService.getUserById(otherParticipantId);
  }

  async create(chatData) {
    await delay(400);
    const newChat = {
      Id: Math.max(...this.chats.map(c => c.Id)) + 1,
      ...chatData,
      updatedAt: new Date().toISOString()
    };
    
    this.chats.push(newChat);
    return {
      ...newChat,
      otherParticipant: this.getOtherParticipant(newChat)
    };
  }

  async update(id, chatData) {
    await delay(300);
    const index = this.chats.findIndex(c => c.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Chat not found");
    }

    this.chats[index] = { ...this.chats[index], ...chatData };
    return {
      ...this.chats[index],
      otherParticipant: this.getOtherParticipant(this.chats[index])
    };
  }

  async delete(id) {
    await delay(300);
    const index = this.chats.findIndex(c => c.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Chat not found");
    }

    const deletedChat = this.chats[index];
    this.chats.splice(index, 1);
    return deletedChat;
  }
}

export const chatService = new ChatService();