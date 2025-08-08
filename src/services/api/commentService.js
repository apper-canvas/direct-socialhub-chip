import { postService } from "./postService";
import userService from "./userService";

// Simulated API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

class CommentService {
  async create(commentData) {
    await delay(400);
    
    // Get the post to update its comments
    const posts = await postService.getAll();
    const postIndex = posts.findIndex(p => p.Id === parseInt(commentData.postId));
    
    if (postIndex === -1) {
      throw new Error("Post not found");
    }

    const newComment = {
      id: `c${Date.now()}`,
      authorId: commentData.authorId,
      content: commentData.content,
      timestamp: new Date().toISOString()
    };

    // Add author information
    const commentWithAuthor = {
      ...newComment,
      author: userService.getUserById(commentData.authorId)
    };

    // Update the post in the service data
    const post = posts[postIndex];
    const updatedComments = [...post.comments, newComment];
    
    await postService.update(commentData.postId, {
      ...post,
      comments: updatedComments
    });

    return commentWithAuthor;
  }

  async getByPostId(postId) {
    await delay(200);
    const post = await postService.getById(postId);
    return post.comments;
  }

  async update(id, commentData) {
    await delay(300);
    // This would typically update a comment in the database
    // For now, we'll just return the updated comment data
    return {
      id,
      ...commentData,
      author: userService.getUserById(commentData.authorId)
    };
  }

  async delete(id, postId) {
    await delay(300);
    const post = await postService.getById(postId);
    const updatedComments = post.comments.filter(c => c.id !== id);
    
    await postService.update(postId, {
      ...post,
      comments: updatedComments
    });

    return { success: true };
  }
}

export const commentService = new CommentService();