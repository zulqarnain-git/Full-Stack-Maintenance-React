
import React from 'react';
import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { DashboardCard } from '@/components/dashboard/DashboardCard';
import { RecentRequestsTable } from '@/components/dashboard/RecentRequestsTable';
import { Mail, CheckCheck, Clock, MapPin } from 'lucide-react';

const RepresentativeDashboard: React.FC = () => {
  // Mock data for representative dashboard
  const requestsData = [
    {
      id: 'REQ021',
      client: 'ABC Corporation',
      vehicle: 'Toyota Land Cruiser',
      date: '2025-05-06',
      status: 'in-progress' as const,
    },
    {
      id: 'REQ018',
      client: 'XYZ Industries',
      vehicle: 'Ford F-150',
      date: '2025-05-04',
      status: 'in-progress' as const,
    },
    {
      id: 'REQ015',
      client: 'Global Logistics',
      vehicle: 'Mercedes Sprinter',
      date: '2025-05-02',
      status: 'approved' as const,
    },
    {
      id: 'REQ012',
      client: 'Tech Solutions Inc',
      vehicle: 'Nissan Patrol',
      date: '2025-04-29',
      status: 'completed' as const,
    }
  ];

  return (
    <DashboardLayout userRole="representative">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-maint-gray-800">Representative Dashboard</h2>
        <p className="text-maint-gray-600">Welcome back, Representative User</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <DashboardCard
          title="Assigned Requests"
          value={7}
          icon={<Mail className="w-6 h-6" />}
          trend={{ value: '2', isPositive: true }}
        />
        
        <DashboardCard
          title="In Progress"
          value={4}
          icon={<Clock className="w-6 h-6" />}
        />
        
        <DashboardCard
          title="Completed This Month"
          value={12}
          icon={<CheckCheck className="w-6 h-6" />}
        />
        
        <DashboardCard
          title="Service Area"
          value="Northern Region"
          icon={<MapPin className="w-6 h-6" />}
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <RecentRequestsTable requests={requestsData} />
        </div>
        
        <div>
          <div className="bg-white rounded-lg shadow-md p-5">
            <h3 className="font-medium text-maint-gray-700 mb-4">Today's Schedule</h3>
            
            <div className="divide-y divide-maint-gray-200">
              <div className="py-3">
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-10 w-10 rounded-md bg-maint-blue text-white flex items-center justify-center font-medium">
                    09:00
                  </div>
                  <div className="ml-4">
                    <h4 className="text-sm font-medium text-maint-gray-900">Parts Pickup</h4>
                    <p className="text-xs text-maint-gray-500">For REQ021 - Toyota Land Cruiser</p>
                    <span className="inline-block mt-1 px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800">
                      Pending
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="py-3">
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-10 w-10 rounded-md bg-maint-blue text-white flex items-center justify-center font-medium">
                    11:30
                  </div>
                  <div className="ml-4">
                    <h4 className="text-sm font-medium text-maint-gray-900">Installation</h4>
                    <p className="text-xs text-maint-gray-500">For REQ018 - Ford F-150</p>
                    <span className="inline-block mt-1 px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
                      Confirmed
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="py-3">
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-10 w-10 rounded-md bg-maint-blue text-white flex items-center justify-center font-medium">
                    14:00
                  </div>
                  <div className="ml-4">
                    <h4 className="text-sm font-medium text-maint-gray-900">Delivery</h4>
                    <p className="text-xs text-maint-gray-500">For REQ015 - Mercedes Sprinter</p>
                    <span className="inline-block mt-1 px-2 py-1 text-xs rounded-full bg-purple-100 text-purple-800">
                      In Transit
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="py-3">
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-10 w-10 rounded-md bg-maint-blue text-white flex items-center justify-center font-medium">
                    16:30
                  </div>
                  <div className="ml-4">
                    <h4 className="text-sm font-medium text-maint-gray-900">Final Inspection</h4>
                    <p className="text-xs text-maint-gray-500">For REQ012 - Nissan Patrol</p>
                    <span className="inline-block mt-1 px-2 py-1 text-xs rounded-full bg-maint-teal bg-opacity-20 text-maint-teal">
                      Scheduled
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-6 bg-white rounded-lg shadow-md p-5">
            <h3 className="font-medium text-maint-gray-700 mb-4">Next Week Preview</h3>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <div className="text-sm text-maint-gray-600">Monday</div>
                <div className="text-sm font-medium">3 tasks</div>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="text-sm text-maint-gray-600">Tuesday</div>
                <div className="text-sm font-medium">2 tasks</div>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="text-sm text-maint-gray-600">Wednesday</div>
                <div className="text-sm font-medium">5 tasks</div>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="text-sm text-maint-gray-600">Thursday</div>
                <div className="text-sm font-medium">1 task</div>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="text-sm text-maint-gray-600">Friday</div>
                <div className="text-sm font-medium">4 tasks</div>
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t border-maint-gray-200">
              <button className="text-sm text-maint-blue hover:text-blue-700">
                View Full Schedule
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default RepresentativeDashboard;
