import React, { useState, useEffect } from 'react';
import { cn } from '@/utils/cn';
import { toast } from "react-toastify";
import Avatar from '@/components/atoms/Avatar';
import userService from '@/services/api/userService';
function StoryCircles({ className }) {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStories();
  }, []);

  async function loadStories() {
    try {
      setLoading(true);
      const storiesData = await userService.getStoriesPreview();
      setStories(storiesData);
    } catch (error) {
      console.error("Failed to load stories:", error);
      toast.error("Failed to load stories");
    } finally {
      setLoading(false);
    }
  }

  function handleStoryClick(user) {
    toast.info(`Viewing ${user.name}'s story`);
  }

  if (loading) {
    return (
      <div className={cn("mb-6", className)}>
        <div className="flex space-x-4 p-4 bg-white rounded-2xl shadow-sm">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="flex flex-col items-center space-y-2">
              <div className="w-16 h-16 bg-gray-200 rounded-full animate-pulse" />
              <div className="w-12 h-3 bg-gray-200 rounded animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (stories.length === 0) {
    return null;
  }

  return (
    <div className={cn("mb-6", className)}>
      <div className="bg-white rounded-2xl shadow-sm p-4 glass-effect">
        <div className="flex space-x-4 overflow-x-auto custom-scrollbar pb-2">
          {stories.map((user) => (
            <button
              key={user.Id}
              onClick={() => handleStoryClick(user)}
              className="flex flex-col items-center space-y-2 flex-shrink-0 hover-lift group"
            >
              <div className="relative">
                <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-purple-500 via-pink-500 to-orange-500 p-0.5">
                  <div className="w-full h-full rounded-full bg-white p-0.5">
                    <Avatar
                      src={user.avatar}
                      alt={user.name}
                      className="w-full h-full"
                    />
                  </div>
                </div>
                {user.hasNewStory && (
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-primary rounded-full border-2 border-white" />
                )}
              </div>
              <span className="text-xs text-gray-600 font-medium max-w-16 truncate group-hover:text-gray-800 transition-colors">
                {user.name}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default StoryCircles;