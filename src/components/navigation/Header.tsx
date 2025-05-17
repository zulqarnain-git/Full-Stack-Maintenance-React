
import React from 'react';
import { Bell, Menu, Search, X, LogOut } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  toggleSidebar: () => void;
  sidebarOpen: boolean;
  userRole: 'admin' | 'client' | 'representative';
}

export const Header: React.FC<HeaderProps> = ({ toggleSidebar, sidebarOpen, userRole }) => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const showNotifications = () => {
    toast({
      title: "Notifications",
      description: "You have no new notifications at this time.",
    });
  };

  const handleLogout = () => {
    // In a real app, this would clear auth tokens, session, etc.
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of the system.",
    });
    
    // Redirect to login page
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-30 bg-white shadow-sm h-16 flex items-center px-4">
      <div className="flex-1 flex justify-between items-center">
        <div className="flex items-center">
          <button
            onClick={toggleSidebar}
            className="text-maint-gray-600 focus:outline-none lg:hidden"
          >
            {sidebarOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
          <span className="lg:hidden ml-4 text-lg font-semibold text-maint-gray-800">
            {userRole === 'admin' ? 'Admin Dashboard' : 
             userRole === 'client' ? 'Client Portal' : 
             'Representative Portal'}
          </span>
        </div>

        {/* Search */}
        <div className="hidden md:flex items-center bg-maint-gray-100 rounded-md px-3 py-1.5 w-80">
          <Search className="h-5 w-5 text-maint-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent border-none focus:outline-none text-sm flex-grow"
          />
        </div>

        {/* Right side buttons */}
        <div className="flex items-center space-x-4">
          <button 
            onClick={showNotifications}
            className="text-maint-gray-600 hover:text-maint-blue relative"
          >
            <Bell className="h-6 w-6" />
            <span className="absolute -top-1 -right-1 h-4 w-4 bg-maint-orange text-white text-xs rounded-full flex items-center justify-center">
              3
            </span>
          </button>
          <button
            onClick={handleLogout}
            className="text-maint-gray-600 hover:text-maint-blue flex items-center"
          >
            <LogOut className="h-6 w-6" />
            <span className="hidden md:inline ml-2">Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
};
