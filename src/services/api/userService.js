import usersData from "@/services/mockData/users.json";

// Simulated API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

class UserService {
  constructor() {
    this.users = [...usersData];
  }

  async getAll() {
    await delay(300);
    return this.users.map(user => ({
      ...user,
      author: this.getUserById(user.Id)
    }));
  }

  async getById(id) {
    await delay(200);
    const user = this.users.find(u => u.Id === parseInt(id));
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  }

  getUserById(id) {
    return this.users.find(u => u.Id === parseInt(id));
  }

  async create(userData) {
    await delay(400);
    const newUser = {
      Id: Math.max(...this.users.map(u => u.Id)) + 1,
      ...userData,
      lastSeen: new Date().toISOString(),
      isOnline: true
    };
    
    this.users.push(newUser);
    return newUser;
  }

  async update(id, userData) {
    await delay(300);
    const index = this.users.findIndex(u => u.Id === parseInt(id));
    if (index === -1) {
      throw new Error("User not found");
    }

    this.users[index] = { ...this.users[index], ...userData };
    return this.users[index];
  }

  async delete(id) {
    await delay(300);
    const index = this.users.findIndex(u => u.Id === parseInt(id));
    if (index === -1) {
      throw new Error("User not found");
    }

    const deletedUser = this.users[index];
    this.users.splice(index, 1);
    return deletedUser;
  }
}

export const userService = new UserService();