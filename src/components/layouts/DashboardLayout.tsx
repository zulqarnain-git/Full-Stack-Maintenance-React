
import React, { ReactNode, useState, useEffect } from 'react';
import { Sidebar } from '../navigation/Sidebar';
import { Header } from '../navigation/Header';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

interface DashboardLayoutProps {
  children: ReactNode;
  userRole: 'admin' | 'client' | 'representative';
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, userRole }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Check if screen width indicates a mobile device and close sidebar by default
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth < 1024) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };
    
    // Check on initial load
    checkIfMobile();
    
    // Add event listener for window resize
    window.addEventListener("resize", checkIfMobile);
    
    // Clean up
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  // Handle logout functionality
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
    <div className="flex h-screen bg-maint-gray-100">
      <div 
        className={`fixed inset-0 z-20 bg-black transition-opacity duration-300 lg:hidden ${
          sidebarOpen ? 'opacity-50' : 'opacity-0 pointer-events-none'
        }`} 
        onClick={() => setSidebarOpen(false)}
      />
      
      <Sidebar 
        isOpen={sidebarOpen} 
        userRole={userRole} 
      />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          toggleSidebar={() => setSidebarOpen(!sidebarOpen)} 
          sidebarOpen={sidebarOpen} 
          userRole={userRole}
        />
        
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-maint-gray-100 p-4 md:p-6">
          {children}
          
          <footer className="mt-8 py-4 border-t border-maint-gray-200">
            <div className="text-center text-maint-gray-500 text-sm">
              <p>MainFlow Connect &copy; 2025. All rights reserved.</p>
              <p className="mt-1">Version 1.0.0</p>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
};
