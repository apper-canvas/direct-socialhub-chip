import postsData from "@/services/mockData/posts.json";
import { userService } from "./userService";

// Simulated API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

class PostService {
  constructor() {
    this.posts = [...postsData];
  }

  async getAll() {
    await delay(400);
    return this.posts
      .map(post => ({
        ...post,
        author: userService.getUserById(post.authorId),
        comments: post.comments.map(comment => ({
          ...comment,
          author: userService.getUserById(comment.authorId)
        }))
      }))
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  }

  async getById(id) {
    await delay(200);
    const post = this.posts.find(p => p.Id === parseInt(id));
    if (!post) {
      throw new Error("Post not found");
    }
    return {
      ...post,
      author: userService.getUserById(post.authorId),
      comments: post.comments.map(comment => ({
        ...comment,
        author: userService.getUserById(comment.authorId)
      }))
    };
  }

  async getByUserId(userId) {
    await delay(300);
    return this.posts
      .filter(p => p.authorId === userId.toString())
      .map(post => ({
        ...post,
        author: userService.getUserById(post.authorId),
        comments: post.comments.map(comment => ({
          ...comment,
          author: userService.getUserById(comment.authorId)
        }))
      }))
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  }

  async create(postData) {
    await delay(500);
    const newPost = {
      Id: Math.max(...this.posts.map(p => p.Id)) + 1,
      ...postData,
      timestamp: new Date().toISOString(),
      likes: [],
      comments: []
    };
    
    this.posts.push(newPost);
    return {
      ...newPost,
      author: userService.getUserById(newPost.authorId),
      comments: []
    };
  }

  async update(id, postData) {
    await delay(300);
    const index = this.posts.findIndex(p => p.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Post not found");
    }

    this.posts[index] = { ...this.posts[index], ...postData };
    return {
      ...this.posts[index],
      author: userService.getUserById(this.posts[index].authorId),
      comments: this.posts[index].comments.map(comment => ({
        ...comment,
        author: userService.getUserById(comment.authorId)
      }))
    };
  }

  async delete(id) {
    await delay(300);
    const index = this.posts.findIndex(p => p.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Post not found");
    }

    const deletedPost = this.posts[index];
    this.posts.splice(index, 1);
    return deletedPost;
  }
}

export const postService = new PostService();