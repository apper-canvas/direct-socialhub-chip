import React, { useState, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";
import Avatar from "@/components/atoms/Avatar";

const Layout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const navigationItems = [
    {
      name: "Messages",
      path: "/messages",
      icon: "MessageCircle",
      description: "Chat with friends"
    },
    {
      name: "Feed",
      path: "/feed",
      icon: "Home",
      description: "Social updates"
    },
    {
      name: "Contacts",
      path: "/contacts",
      icon: "Users",
      description: "Your connections"
    }
  ];

  const currentUser = {
    name: "John Doe",
    avatar: "/api/placeholder/40/40",
    status: "Available"
  };

  useEffect(() => {
    setIsMobileSidebarOpen(false);
  }, [location.pathname]);

  const isActive = (path) => location.pathname === path;

  // Desktop Sidebar Component
  const DesktopSidebar = () => (
    <div className="hidden lg:flex lg:flex-col lg:w-64 lg:bg-white lg:border-r lg:border-gray-200 lg:shadow-sm">
      {/* Logo */}
      <div className="flex items-center px-6 py-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-r from-primary to-primary-dark rounded-lg flex items-center justify-center">
            <ApperIcon name="MessageSquare" size={20} className="text-white" />
          </div>
          <h1 className="text-xl font-bold gradient-text">SocialHub</h1>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navigationItems.map((item) => (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className={cn(
              "w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200",
              isActive(item.path)
                ? "bg-gradient-to-r from-primary/10 to-primary-dark/10 text-primary border-r-4 border-primary shadow-sm"
                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            )}
          >
            <ApperIcon 
              name={item.icon} 
              size={20} 
              className={cn(
                isActive(item.path) ? "text-primary" : "text-gray-500"
              )}
            />
            <div className="flex-1">
              <div className="font-medium">{item.name}</div>
              <div className="text-xs text-gray-500">{item.description}</div>
            </div>
          </button>
        ))}
      </nav>

      {/* User Profile */}
      <div className="px-4 py-4 border-t border-gray-200">
        <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
          <Avatar src={currentUser.avatar} alt={currentUser.name} size="md" isOnline={true} />
          <div className="flex-1 min-w-0">
            <p className="font-medium text-gray-900 truncate">{currentUser.name}</p>
            <p className="text-sm text-gray-500 truncate">{currentUser.status}</p>
          </div>
          <ApperIcon name="Settings" size={16} className="text-gray-400" />
        </div>
      </div>
    </div>
  );

  // Mobile Sidebar Component
  const MobileSidebar = () => (
    <>
      {/* Backdrop */}
      {isMobileSidebarOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          onClick={() => setIsMobileSidebarOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <div className={cn(
        "lg:hidden fixed inset-y-0 left-0 w-64 bg-white border-r border-gray-200 shadow-lg z-50 transform transition-transform duration-300 ease-in-out",
        isMobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        {/* Logo */}
        <div className="flex items-center justify-between px-6 py-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-primary to-primary-dark rounded-lg flex items-center justify-center">
              <ApperIcon name="MessageSquare" size={20} className="text-white" />
            </div>
            <h1 className="text-xl font-bold gradient-text">SocialHub</h1>
          </div>
          <button
            onClick={() => setIsMobileSidebarOpen(false)}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <ApperIcon name="X" size={20} className="text-gray-500" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2">
          {navigationItems.map((item) => (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={cn(
                "w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200",
                isActive(item.path)
                  ? "bg-gradient-to-r from-primary/10 to-primary-dark/10 text-primary border-r-4 border-primary shadow-sm"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              )}
            >
              <ApperIcon 
                name={item.icon} 
                size={20} 
                className={cn(
                  isActive(item.path) ? "text-primary" : "text-gray-500"
                )}
              />
              <div className="flex-1">
                <div className="font-medium">{item.name}</div>
                <div className="text-xs text-gray-500">{item.description}</div>
              </div>
            </button>
          ))}
        </nav>

        {/* User Profile */}
        <div className="px-4 py-4 border-t border-gray-200">
          <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
            <Avatar src={currentUser.avatar} alt={currentUser.name} size="md" isOnline={true} />
            <div className="flex-1 min-w-0">
              <p className="font-medium text-gray-900 truncate">{currentUser.name}</p>
              <p className="text-sm text-gray-500 truncate">{currentUser.status}</p>
            </div>
            <ApperIcon name="Settings" size={16} className="text-gray-400" />
          </div>
        </div>
      </div>
    </>
  );

  // Mobile Header Component
  const MobileHeader = () => (
    <div className="lg:hidden bg-white border-b border-gray-200 px-4 py-3 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setIsMobileSidebarOpen(true)}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <ApperIcon name="Menu" size={20} className="text-gray-600" />
          </button>
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-gradient-to-r from-primary to-primary-dark rounded flex items-center justify-center">
              <ApperIcon name="MessageSquare" size={14} className="text-white" />
            </div>
            <h1 className="font-bold gradient-text">SocialHub</h1>
          </div>
        </div>

        <Avatar src={currentUser.avatar} alt={currentUser.name} size="sm" isOnline={true} />
      </div>
    </div>
  );

  return (
    <div className="h-screen bg-background flex">
      {/* Desktop Sidebar */}
      <DesktopSidebar />

      {/* Mobile Sidebar */}
      <MobileSidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile Header */}
        <MobileHeader />

        {/* Page Content */}
        <div className="flex-1 overflow-hidden">
          <div className="h-full p-4 lg:p-6">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;