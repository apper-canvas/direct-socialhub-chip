import React, { useState } from "react";
import { cn } from "@/utils/cn";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import Button from "@/components/atoms/Button";
import TextArea from "@/components/atoms/TextArea";
import Avatar from "@/components/atoms/Avatar";
import ApperIcon from "@/components/ApperIcon";
import { postService } from "@/services/api/postService";

const CreatePostModal = ({ isOpen, onClose, onPostCreated, currentUser, className }) => {
  const [content, setContent] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    if (!content.trim()) {
      toast.error("Please write something to share!");
      return;
    }

    try {
      setIsSubmitting(true);
      
      const postData = {
        authorId: currentUser.Id,
        content: content.trim(),
        imageUrl: imagePreview,
        likes: [],
        comments: [],
        timestamp: new Date().toISOString()
      };

      const newPost = await postService.create(postData);
      onPostCreated(newPost);
      handleClose();
      toast.success("Post shared successfully!");
    } catch (err) {
      toast.error("Failed to create post");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setContent("");
    setImageFile(null);
    setImagePreview("");
    onClose();
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview("");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          onClick={handleClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className={cn("bg-white rounded-xl shadow-xl w-full max-w-lg", className)}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Create Post</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClose}
                className="rounded-full p-2 hover:bg-gray-100"
              >
                <ApperIcon name="X" size={20} />
              </Button>
            </div>

            {/* Content */}
            <div className="p-6">
              {/* User Info */}
              <div className="flex items-center space-x-3 mb-4">
                <Avatar src={currentUser.avatar} alt={currentUser.name} size="md" />
                <div>
                  <h3 className="font-medium text-gray-900">{currentUser.name}</h3>
                  <p className="text-sm text-gray-500">Sharing to your feed</p>
                </div>
              </div>

              {/* Text Content */}
              <TextArea
                placeholder="What's on your mind?"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={4}
                className="mb-4 resize-none"
              />

              {/* Image Preview */}
              {imagePreview && (
                <div className="relative mb-4">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full rounded-lg object-cover max-h-64"
                  />
                  <button
                    onClick={removeImage}
                    className="absolute top-2 right-2 bg-black/50 text-white rounded-full p-1 hover:bg-black/70 transition-colors"
                  >
                    <ApperIcon name="X" size={16} />
                  </button>
                </div>
              )}

              {/* Actions */}
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg mb-4">
                <span className="text-sm text-gray-600">Add to your post</span>
                <div className="flex items-center space-x-2">
                  <label htmlFor="image-upload" className="cursor-pointer">
                    <div className="p-2 text-green-600 hover:bg-green-50 rounded-full transition-colors">
                      <ApperIcon name="Image" size={20} />
                    </div>
                  </label>
                  <input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                  <div className="p-2 text-yellow-600 hover:bg-yellow-50 rounded-full transition-colors cursor-pointer">
                    <ApperIcon name="Smile" size={20} />
                  </div>
                  <div className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors cursor-pointer">
                    <ApperIcon name="MapPin" size={20} />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <Button
                onClick={handleSubmit}
                disabled={!content.trim() || isSubmitting}
                variant="primary"
                size="lg"
                className="w-full"
              >
                {isSubmitting ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Sharing...</span>
                  </div>
                ) : (
                  "Share Post"
                )}
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CreatePostModal;