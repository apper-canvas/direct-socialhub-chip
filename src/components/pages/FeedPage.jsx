import React, { useState } from "react";
import FeedTimeline from "@/components/organisms/FeedTimeline";
import CreatePostModal from "@/components/organisms/CreatePostModal";
import FloatingActionButton from "@/components/molecules/FloatingActionButton";
import StoryCircles from "@/components/molecules/StoryCircles";
const FeedPage = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const currentUser = {
    Id: "1",
    name: "You",
    avatar: "/api/placeholder/40/40"
  };

  const handlePostCreated = (newPost) => {
    setRefreshKey(prev => prev + 1);
  };

  return (
<div className="min-h-full bg-gray-50">
      <div className="max-w-4xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold gradient-text mb-2">Your Social Feed</h1>
          <p className="text-gray-600">Stay connected with your friends and share what matters</p>
        </div>

        {/* Story Circles */}
        <StoryCircles />

        {/* Feed Timeline */}
        <FeedTimeline key={refreshKey} />

        {/* Floating Action Button */}
        <FloatingActionButton
          onClick={() => setIsCreateModalOpen(true)}
          icon="Plus"
        />

        {/* Create Post Modal */}
        <CreatePostModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          onPostCreated={handlePostCreated}
          currentUser={currentUser}
        />
      </div>
    </div>
  );
};

export default FeedPage;