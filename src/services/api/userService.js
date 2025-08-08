import usersData from "@/services/mockData/users.json";
import React from "react";
import Error from "@/components/ui/Error";

// Mock story data - in a real app this would be a separate service
const mockStoryData = [
  { userId: 1, hasNewStory: true, lastUpdated: '2024-12-19T11:30:00Z' },
  { userId: 2, hasNewStory: true, lastUpdated: '2024-12-19T10:45:00Z' },
  { userId: 4, hasNewStory: true, lastUpdated: '2024-12-19T09:15:00Z' },
  { userId: 6, hasNewStory: false, lastUpdated: '2024-12-19T08:30:00Z' },
  { userId: 8, hasNewStory: true, lastUpdated: '2024-12-19T11:00:00Z' },
  { userId: 10, hasNewStory: false, lastUpdated: '2024-12-19T07:45:00Z' }
];
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

class UserService {
  constructor() {
    this.users = [...usersData];
    this.nextId = Math.max(...usersData.map(u => u.Id)) + 1;
  }

  async getAll() {
    await delay(200);
    return [...this.users];
  }

  async getById(id) {
    await delay(100);
    
    if (!Number.isInteger(id) || id <= 0) {
      throw new Error('Invalid user ID - must be a positive integer');
    }

    const user = this.users.find(u => u.Id === id);
    if (!user) {
      throw new Error(`User with ID ${id} not found`);
    }
    
    return { ...user };
  }

  getUserById(id) {
    return this.users.find(u => u.Id === id);
  }

  async getStoriesPreview() {
    await delay(150);
    
    // Get users who have stories
    const usersWithStories = mockStoryData.map(story => {
      const user = this.users.find(u => u.Id === story.userId);
      if (!user) return null;
      
      return {
        ...user,
        hasNewStory: story.hasNewStory,
        lastStoryUpdate: story.lastUpdated
      };
    }).filter(Boolean);

    return usersWithStories;
  }

  async create(userData) {
    await delay(300);
    
    if (!userData.name || userData.name.trim() === '') {
      throw new Error('Name is required');
    }

    const newUser = {
      ...userData,
      Id: this.nextId++,
      avatar: userData.avatar || '/api/placeholder/64/64',
      status: userData.status || '',
      lastSeen: new Date().toISOString(),
      isOnline: true
    };

    this.users.push(newUser);
    return { ...newUser };
  }

  async update(id, userData) {
    await delay(250);
    
    if (!Number.isInteger(id) || id <= 0) {
      throw new Error('Invalid user ID - must be a positive integer');
    }

    const userIndex = this.users.findIndex(u => u.Id === id);
    if (userIndex === -1) {
      throw new Error(`User with ID ${id} not found`);
    }

    if (userData.name !== undefined && userData.name.trim() === '') {
      throw new Error('Name cannot be empty');
    }

this.users[userIndex] = {
      ...this.users[userIndex],
      ...userData,
      Id: id // Ensure ID doesn't get overwritten
    };

    return { ...this.users[userIndex] };
  }

  async delete(id) {
    await delay(200);
    
    if (!Number.isInteger(id) || id <= 0) {
      throw new Error('Invalid user ID - must be a positive integer');
    }

    const userIndex = this.users.findIndex(u => u.Id === id);
    if (userIndex === -1) {
      throw new Error(`User with ID ${id} not found`);
    }

    const deletedUser = { ...this.users[userIndex] };
    this.users.splice(userIndex, 1);
    return deletedUser;
  }
}

export default UserService;