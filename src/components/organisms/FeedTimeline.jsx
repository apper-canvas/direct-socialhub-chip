import React, { useState, useEffect } from "react";
import { cn } from "@/utils/cn";
import { toast } from "react-toastify";
import PostCard from "@/components/molecules/PostCard";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import { postService } from "@/services/api/postService";
import { commentService } from "@/services/api/commentService";

const FeedTimeline = ({ currentUserId = "1", className }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadPosts = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await postService.getAll();
      setPosts(data);
    } catch (err) {
      setError("Failed to load posts. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

  const handleLike = async (postId) => {
    try {
      const post = posts.find(p => p.Id === postId);
      const isLiked = post.likes.includes(currentUserId);
      
      let updatedLikes;
      if (isLiked) {
        updatedLikes = post.likes.filter(id => id !== currentUserId);
        toast.success("Post unliked!");
      } else {
        updatedLikes = [...post.likes, currentUserId];
        toast.success("Post liked!");
      }

      const updatedPost = await postService.update(postId, { 
        ...post, 
        likes: updatedLikes 
      });

      setPosts(prev => prev.map(p => p.Id === postId ? updatedPost : p));
    } catch (err) {
      toast.error("Failed to update like");
    }
  };

  const handleComment = async (postId, commentText) => {
    try {
      const commentData = {
        postId,
        authorId: currentUserId,
        content: commentText,
        timestamp: new Date().toISOString()
      };

      const newComment = await commentService.create(commentData);
      
      setPosts(prev => prev.map(post => {
        if (post.Id === postId) {
          return {
            ...post,
            comments: [...post.comments, newComment]
          };
        }
        return post;
      }));

      toast.success("Comment added!");
    } catch (err) {
      toast.error("Failed to add comment");
    }
  };

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadPosts} />;

  return (
    <div className={cn("max-w-2xl mx-auto", className)}>
      {posts.length === 0 ? (
        <Empty 
          title="No posts yet"
          description="Be the first to share something with your friends!"
          actionLabel="Create Post"
          onAction={() => {}}
        />
      ) : (
        <div className="space-y-6">
          {posts.map((post) => (
            <PostCard
              key={post.Id}
              post={post}
              currentUserId={currentUserId}
              onLike={handleLike}
              onComment={handleComment}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default FeedTimeline;