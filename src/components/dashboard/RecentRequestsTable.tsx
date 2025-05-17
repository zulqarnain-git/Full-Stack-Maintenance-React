
import React from 'react';
import { FileText } from 'lucide-react';

interface Request {
  id: string;
  client: string;
  vehicle: string;
  date: string;
  status: 'pending' | 'approved' | 'rejected' | 'in-progress' | 'completed';
}

interface RecentRequestsTableProps {
  requests: Request[];
}

export const RecentRequestsTable: React.FC<RecentRequestsTableProps> = ({ requests }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'approved':
        return 'bg-blue-100 text-blue-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'in-progress':
        return 'bg-purple-100 text-purple-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md">
      <div className="px-6 py-4 border-b border-maint-gray-200">
        <h3 className="font-medium text-maint-gray-700">Recent Maintenance Requests</h3>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-maint-gray-200">
          <thead className="bg-maint-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-maint-gray-500 uppercase tracking-wider">
                Request ID
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-maint-gray-500 uppercase tracking-wider">
                Client
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-maint-gray-500 uppercase tracking-wider">
                Vehicle
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-maint-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-maint-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-maint-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-maint-gray-200">
            {requests.map((request) => (
              <tr key={request.id} className="hover:bg-maint-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-maint-gray-900">
                  #{request.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-maint-gray-500">
                  {request.client}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-maint-gray-500">
                  {request.vehicle}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-maint-gray-500">
                  {request.date}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(request.status)}`}>
                    {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-maint-gray-500">
                  <button className="text-maint-blue hover:text-blue-700 mr-3">
                    <FileText className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="px-6 py-4 border-t border-maint-gray-200">
        <button className="text-maint-blue hover:text-blue-700 text-sm font-medium">
          View All Requests
        </button>
      </div>
    </div>
  );
};
