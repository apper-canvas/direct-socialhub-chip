import React, { useState } from "react";
import { cn } from "@/utils/cn";
import { formatDistanceToNow } from "date-fns";
import ApperIcon from "@/components/ApperIcon";
import Avatar from "@/components/atoms/Avatar";
import Button from "@/components/atoms/Button";

const PostCard = ({ post, currentUserId, onLike, onComment, className }) => {
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState("");
  
  const isLiked = post.likes.includes(currentUserId);
  const likesCount = post.likes.length;
  const commentsCount = post.comments.length;

  const handleLike = () => {
    onLike(post.Id);
  };

  const handleComment = () => {
    if (commentText.trim()) {
      onComment(post.Id, commentText.trim());
      setCommentText("");
    }
  };

  const formatTime = (timestamp) => {
    return formatDistanceToNow(new Date(timestamp), { addSuffix: true });
  };

  return (
    <div className={cn("bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover-lift", className)}>
      {/* Post Header */}
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-start space-x-3">
          <Avatar src={post.author?.avatar} alt={post.author?.name} size="md" />
          <div className="flex-1">
            <h3 className="font-medium text-gray-900">{post.author?.name}</h3>
            <p className="text-sm text-gray-500">{formatTime(post.timestamp)}</p>
          </div>
        </div>
      </div>

      {/* Post Content */}
      <div className="p-4">
        <p className="text-gray-800 leading-relaxed mb-3">{post.content}</p>
        
        {post.imageUrl && (
          <div className="rounded-lg overflow-hidden mb-3">
            <img 
              src={post.imageUrl} 
              alt="Post image" 
              className="w-full h-auto object-cover"
            />
          </div>
        )}
      </div>

      {/* Post Actions */}
      <div className="px-4 py-3 border-t border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <button
              onClick={handleLike}
              className={cn(
                "flex items-center space-x-2 px-2 py-1 rounded-md transition-all duration-200",
                isLiked 
                  ? "text-error bg-red-50 hover:bg-red-100" 
                  : "text-gray-600 hover:text-error hover:bg-red-50"
              )}
            >
              <ApperIcon 
                name={isLiked ? "Heart" : "Heart"} 
                size={18} 
                className={cn(isLiked && "fill-current")}
              />
              <span className="text-sm font-medium">{likesCount}</span>
            </button>

            <button
              onClick={() => setShowComments(!showComments)}
              className="flex items-center space-x-2 px-2 py-1 rounded-md text-gray-600 hover:text-accent hover:bg-blue-50 transition-all duration-200"
            >
              <ApperIcon name="MessageCircle" size={18} />
              <span className="text-sm font-medium">{commentsCount}</span>
            </button>

            <button className="flex items-center space-x-2 px-2 py-1 rounded-md text-gray-600 hover:text-primary hover:bg-green-50 transition-all duration-200">
              <ApperIcon name="Share2" size={18} />
              <span className="text-sm font-medium">Share</span>
            </button>
          </div>
        </div>
      </div>

      {/* Comments Section */}
      {showComments && (
        <div className="border-t border-gray-100 bg-gray-50">
          <div className="p-4 space-y-3">
            {post.comments.map((comment) => (
              <div key={comment.id} className="flex items-start space-x-3">
                <Avatar src={comment.author?.avatar} alt={comment.author?.name} size="sm" />
                <div className="flex-1">
                  <div className="bg-white rounded-lg px-3 py-2 shadow-sm">
                    <p className="font-medium text-sm text-gray-900">{comment.author?.name}</p>
                    <p className="text-sm text-gray-700">{comment.content}</p>
                  </div>
                  <p className="text-xs text-gray-500 mt-1 ml-3">{formatTime(comment.timestamp)}</p>
                </div>
              </div>
            ))}

            {/* Add Comment */}
            <div className="flex items-center space-x-3 pt-2">
              <Avatar src="/api/placeholder/32/32" alt="You" size="sm" />
              <div className="flex-1 flex items-center space-x-2">
                <input
                  type="text"
                  placeholder="Write a comment..."
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleComment()}
                  className="flex-1 px-3 py-2 text-sm bg-white border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
                <Button
                  onClick={handleComment}
                  disabled={!commentText.trim()}
                  variant="primary"
                  size="sm"
                  className="rounded-full px-3"
                >
                  <ApperIcon name="Send" size={14} />
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostCard;