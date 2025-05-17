
import React from 'react';
import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { DashboardCard } from '@/components/dashboard/DashboardCard';
import { StatusCard } from '@/components/dashboard/StatusCard';
import { RecentRequestsTable } from '@/components/dashboard/RecentRequestsTable';
import { Mail, FileText, Users, Truck, BarChart3 } from 'lucide-react';

const AdminDashboard: React.FC = () => {
  // Mock data for dashboard
  const requestsData = [
    {
      id: 'REQ001',
      client: 'ABC Corporation',
      vehicle: 'Toyota Land Cruiser',
      date: '2025-05-06',
      status: 'pending' as const,
    },
    {
      id: 'REQ002',
      client: 'XYZ Industries',
      vehicle: 'Ford F-150',
      date: '2025-05-05',
      status: 'approved' as const,
    },
    {
      id: 'REQ003',
      client: 'Global Logistics',
      vehicle: 'Mercedes Sprinter',
      date: '2025-05-04',
      status: 'in-progress' as const,
    },
    {
      id: 'REQ004',
      client: 'Tech Solutions Inc',
      vehicle: 'Nissan Patrol',
      date: '2025-05-03',
      status: 'completed' as const,
    },
    {
      id: 'REQ005',
      client: 'First National Bank',
      vehicle: 'Lexus LX570',
      date: '2025-05-02',
      status: 'rejected' as const,
    }
  ];

  const statusItems = [
    { id: '1', label: 'Pending', count: 18, color: 'bg-yellow-500' },
    { id: '2', label: 'Approved', count: 27, color: 'bg-maint-blue' },
    { id: '3', label: 'In Progress', count: 12, color: 'bg-purple-500' },
    { id: '4', label: 'Completed', count: 42, color: 'bg-maint-teal' },
    { id: '5', label: 'Rejected', count: 7, color: 'bg-red-500' }
  ];

  const totalRequests = statusItems.reduce((acc, item) => acc + item.count, 0);

  return (
    <DashboardLayout userRole="admin">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-maint-gray-800">Admin Dashboard</h2>
        <p className="text-maint-gray-600">Welcome back, Admin User</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <DashboardCard
          title="Total Maintenance Requests"
          value={106}
          icon={<Mail className="w-6 h-6" />}
          trend={{ value: '12%', isPositive: true }}
        />
        
        <DashboardCard
          title="Active Contracts"
          value={24}
          icon={<FileText className="w-6 h-6" />}
          trend={{ value: '5%', isPositive: true }}
        />
        
        <DashboardCard
          title="Registered Clients"
          value={38}
          icon={<Users className="w-6 h-6" />}
        />
        
        <DashboardCard
          title="Representatives"
          value={15}
          icon={<Truck className="w-6 h-6" />}
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <RecentRequestsTable requests={requestsData} />
        </div>
        
        <div>
          <StatusCard
            title="Maintenance Requests Status"
            items={statusItems}
            total={totalRequests}
          />
          
          <div className="mt-6 bg-white rounded-lg shadow-md p-5">
            <h3 className="font-medium text-maint-gray-700 mb-4">Budget Overview</h3>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-maint-gray-600">Monthly Budget</span>
                  <span className="font-medium">$120,000</span>
                </div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-maint-gray-600">Used</span>
                  <span className="font-medium">$65,840</span>
                </div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-maint-gray-600">Remaining</span>
                  <span className="font-medium text-maint-teal">$54,160</span>
                </div>
              </div>
              
              <div className="w-full bg-maint-gray-200 rounded-full h-2.5">
                <div className="bg-maint-blue h-2.5 rounded-full" style={{ width: '55%' }}></div>
              </div>
              
              <div className="text-xs text-maint-gray-500 text-right">
                55% of budget used
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-5">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-medium text-maint-gray-700">Regional Performance</h3>
          <button className="text-sm text-maint-blue hover:text-blue-700">
            View Details
          </button>
        </div>
        
        <div className="h-64 flex items-center justify-center bg-maint-gray-50 border border-dashed border-maint-gray-300 rounded-lg">
          <div className="text-center">
            <BarChart3 className="w-10 h-10 text-maint-gray-400 mx-auto" />
            <p className="mt-2 text-sm text-maint-gray-500">Chart visualization will be here</p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
