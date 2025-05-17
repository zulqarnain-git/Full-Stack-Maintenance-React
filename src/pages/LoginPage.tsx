
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userRole, setUserRole] = useState('admin');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      
      // Demo login logic - in real app this would validate with backend
      if (email && password) {
        // Navigate to correct dashboard based on role
        switch(userRole) {
          case 'admin':
            navigate('/admin/dashboard');
            break;
          case 'client':
            navigate('/client/dashboard');
            break;
          case 'representative':
            navigate('/representative/dashboard');
            break;
          default:
            navigate('/admin/dashboard');
        }

        toast({
          title: "Login Successful",
          description: `Welcome back, ${userRole}!`,
        });
      } else {
        toast({
          title: "Login Failed",
          description: "Please check your credentials and try again.",
          variant: "destructive",
        });
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-maint-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
        <div>
          <h2 className="text-center text-3xl font-bold text-maint-gray-900">MainFlow Connect</h2>
          <p className="mt-2 text-center text-sm text-maint-gray-600">
            Maintenance Management System
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-maint-gray-700">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 form-input"
                placeholder="Email address"
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-maint-gray-700">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 form-input"
                placeholder="Password"
              />
            </div>

            <div>
              <label htmlFor="userRole" className="block text-sm font-medium text-maint-gray-700">
                Login as
              </label>
              <select
                id="userRole"
                name="userRole"
                value={userRole}
                onChange={(e) => setUserRole(e.target.value)}
                className="mt-1 form-input"
              >
                <option value="admin">Admin</option>
                <option value="client">Client</option>
                <option value="representative">Representative</option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember_me"
                name="remember_me"
                type="checkbox"
                className="h-4 w-4 text-maint-blue focus:ring-maint-blue border-maint-gray-300 rounded"
              />
              <label htmlFor="remember_me" className="ml-2 block text-sm text-maint-gray-900">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <a href="#" className="font-medium text-maint-blue hover:text-blue-700">
                Forgot your password?
              </a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-maint-blue hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-maint-blue ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {isLoading ? 'Signing in...' : 'Sign in'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
