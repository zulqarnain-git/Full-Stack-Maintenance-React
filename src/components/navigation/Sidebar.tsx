
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Settings, Users, FileText, Truck, BarChart3, Upload, Mail, Home, LogOut, Calendar } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface SidebarProps {
  isOpen: boolean;
  userRole: 'admin' | 'client' | 'representative';
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, userRole }) => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const adminMenuItems = [
    { name: 'Dashboard', icon: <Home className="w-5 h-5" />, path: '/admin/dashboard' },
    { name: 'Contracts', icon: <FileText className="w-5 h-5" />, path: '/admin/contracts' },
    { name: 'Clients', icon: <Users className="w-5 h-5" />, path: '/admin/clients' },
    { name: 'Representatives', icon: <Truck className="w-5 h-5" />, path: '/admin/representatives' },
    { name: 'Maintenance Requests', icon: <Mail className="w-5 h-5" />, path: '/admin/requests' },
    { name: 'Upload Data', icon: <Upload className="w-5 h-5" />, path: '/admin/upload' },
    { name: 'Reports', icon: <BarChart3 className="w-5 h-5" />, path: '/admin/reports' },
    { name: 'Settings', icon: <Settings className="w-5 h-5" />, path: '/admin/settings' },
  ];

  const clientMenuItems = [
    { name: 'Dashboard', icon: <Home className="w-5 h-5" />, path: '/client/dashboard' },
    { name: 'New Request', icon: <Mail className="w-5 h-5" />, path: '/client/new-request' },
    { name: 'My Requests', icon: <FileText className="w-5 h-5" />, path: '/client/requests' },
    { name: 'Reports', icon: <BarChart3 className="w-5 h-5" />, path: '/client/reports' },
    { name: 'Settings', icon: <Settings className="w-5 h-5" />, path: '/client/settings' },
  ];

  const representativeMenuItems = [
    { name: 'Dashboard', icon: <Home className="w-5 h-5" />, path: '/representative/dashboard' },
    { name: 'Assigned Requests', icon: <Mail className="w-5 h-5" />, path: '/representative/requests' },
    { name: 'Schedule', icon: <Calendar className="w-5 h-5" />, path: '/representative/schedule' },
    { name: 'Reports', icon: <BarChart3 className="w-5 h-5" />, path: '/representative/reports' },
    { name: 'Settings', icon: <Settings className="w-5 h-5" />, path: '/representative/settings' },
  ];

  // Select the appropriate menu items based on user role
  let menuItems;
  switch (userRole) {
    case 'admin':
      menuItems = adminMenuItems;
      break;
    case 'client':
      menuItems = clientMenuItems;
      break;
    case 'representative':
      menuItems = representativeMenuItems;
      break;
    default:
      menuItems = adminMenuItems;
  }

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
    <aside 
      className={`${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-lg transition-transform duration-300 lg:translate-x-0 lg:static lg:inset-auto lg:z-auto`}
    >
      <div className="h-full flex flex-col">
        {/* Logo and app name */}
        <div className="flex items-center justify-center h-16 px-4 bg-maint-blue text-white">
          <span className="text-xl font-bold">MainFlow Connect</span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-2 py-4 bg-white space-y-1 overflow-y-auto">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className="flex items-center px-4 py-2 text-maint-gray-700 rounded-md hover:bg-maint-gray-100 hover:text-maint-blue group transition-colors duration-200"
            >
              <span className="mr-3 text-maint-gray-500 group-hover:text-maint-blue transition-colors duration-200">
                {item.icon}
              </span>
              <span>{item.name}</span>
            </Link>
          ))}
        </nav>

        {/* User info and logout */}
        <div className="p-4 border-t border-maint-gray-200">
          <div className="flex items-center space-x-3">
            <div className="h-9 w-9 rounded-full bg-maint-blue flex items-center justify-center text-white font-semibold">
              {userRole === 'admin' ? 'A' : userRole === 'client' ? 'C' : 'R'}
            </div>
            <div>
              <p className="text-sm font-medium text-maint-gray-700">
                {userRole === 'admin' ? 'Admin User' : 
                 userRole === 'client' ? 'Client User' : 
                 'Representative User'}
              </p>
              <p className="text-xs text-maint-gray-500">{userRole}@example.com</p>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className="mt-4 w-full flex items-center px-4 py-2 text-maint-gray-700 rounded-md hover:bg-maint-gray-100 transition-colors duration-200"
          >
            <LogOut className="w-5 h-5 mr-3 text-maint-gray-500" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </aside>
  );
};
