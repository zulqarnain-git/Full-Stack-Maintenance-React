
import React from 'react';
import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { DashboardCard } from '@/components/dashboard/DashboardCard';
import { RecentRequestsTable } from '@/components/dashboard/RecentRequestsTable';
import { Mail, FileText, Calendar, BarChart3 } from 'lucide-react';
import { Link } from 'react-router-dom';

const ClientDashboard: React.FC = () => {
  // Mock data for client dashboard
  const requestsData = [
    {
      id: 'REQ045',
      client: 'Your Company',
      vehicle: 'Toyota Hilux (ABC-1234)',
      date: '2025-05-06',
      status: 'pending' as const,
    },
    {
      id: 'REQ039',
      client: 'Your Company',
      vehicle: 'Ford Ranger (XYZ-5678)',
      date: '2025-04-28',
      status: 'approved' as const,
    },
    {
      id: 'REQ032',
      client: 'Your Company',
      vehicle: 'Nissan Navara (DEF-9012)',
      date: '2025-04-15',
      status: 'in-progress' as const,
    },
    {
      id: 'REQ027',
      client: 'Your Company',
      vehicle: 'Toyota Land Cruiser (GHI-3456)',
      date: '2025-04-02',
      status: 'completed' as const,
    }
  ];

  return (
    <DashboardLayout userRole="client">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-maint-gray-800">Client Dashboard</h2>
        <p className="text-maint-gray-600">Welcome back, Client User</p>
      </div>
      
      <div className="mb-8">
        <div className="bg-maint-blue text-white rounded-lg shadow-md p-6">
          <div className="flex flex-col md:flex-row justify-between">
            <div>
              <h3 className="text-xl font-medium">Need vehicle maintenance?</h3>
              <p className="mt-2 opacity-90">Create a new maintenance request to get started</p>
            </div>
            <div className="mt-4 md:mt-0">
              <Link 
                to="/client/new-request"
                className="inline-block px-4 py-2 bg-white text-maint-blue font-medium rounded-md hover:bg-opacity-90 transition-colors duration-200"
              >
                Create New Request
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <DashboardCard
          title="Active Requests"
          value={3}
          icon={<Mail className="w-6 h-6" />}
        />
        
        <DashboardCard
          title="Completed Requests"
          value={12}
          icon={<FileText className="w-6 h-6" />}
          trend={{ value: '5', isPositive: true }}
        />
        
        <DashboardCard
          title="Monthly Budget"
          value="$15,000"
          icon={<Calendar className="w-6 h-6" />}
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <RecentRequestsTable requests={requestsData} />
        </div>
        
        <div>
          <div className="bg-white rounded-lg shadow-md p-5">
            <h3 className="font-medium text-maint-gray-700 mb-4">Budget Usage</h3>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-maint-gray-600">Monthly Allocation</span>
                  <span className="font-medium">$15,000</span>
                </div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-maint-gray-600">Used This Month</span>
                  <span className="font-medium">$4,250</span>
                </div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-maint-gray-600">Remaining</span>
                  <span className="font-medium text-maint-teal">$10,750</span>
                </div>
              </div>
              
              <div className="w-full bg-maint-gray-200 rounded-full h-2.5">
                <div className="bg-maint-teal h-2.5 rounded-full" style={{ width: '28%' }}></div>
              </div>
              
              <div className="text-xs text-maint-gray-500 text-right">
                28% of budget used
              </div>
            </div>
          </div>
          
          <div className="mt-6 bg-white rounded-lg shadow-md p-5">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-medium text-maint-gray-700">Maintenance History</h3>
              <button className="text-sm text-maint-blue hover:text-blue-700">
                View All
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="h-48 flex items-center justify-center bg-maint-gray-50 border border-dashed border-maint-gray-300 rounded-lg">
                <div className="text-center">
                  <BarChart3 className="w-10 h-10 text-maint-gray-400 mx-auto" />
                  <p className="mt-2 text-sm text-maint-gray-500">Maintenance history chart</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ClientDashboard;
