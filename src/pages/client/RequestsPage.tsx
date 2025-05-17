
import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import { Search, FileText, Download, Eye, Calendar, Filter, BarChart3 } from 'lucide-react';

type RequestStatus = 'pending' | 'approved' | 'rejected' | 'in-progress' | 'completed';

interface MaintenanceRequest {
  id: string;
  vehicleName: string;
  vehicleCode: string;
  type: string;
  date: string;
  parts: number;
  representative?: string;
  status: RequestStatus;
}

// Mock data for client's maintenance requests
const initialRequests: MaintenanceRequest[] = [
  {
    id: 'REQ045',
    vehicleName: 'Toyota Hilux',
    vehicleCode: 'ABC-1234',
    type: 'Regular Maintenance',
    date: '2025-05-06',
    parts: 4,
    status: 'pending',
  },
  {
    id: 'REQ039',
    vehicleName: 'Ford Ranger',
    vehicleCode: 'XYZ-5678',
    type: 'Emergency Repair',
    date: '2025-04-28',
    parts: 3,
    representative: 'James Wilson',
    status: 'approved',
  },
  {
    id: 'REQ032',
    vehicleName: 'Nissan Navara',
    vehicleCode: 'DEF-9012',
    type: 'Regular Maintenance',
    date: '2025-04-15',
    parts: 5,
    representative: 'Maria Rodriguez',
    status: 'in-progress',
  },
  {
    id: 'REQ027',
    vehicleName: 'Toyota Land Cruiser',
    vehicleCode: 'GHI-3456',
    type: 'Routine Inspection',
    date: '2025-04-02',
    parts: 2,
    representative: 'Lisa Chen',
    status: 'completed',
  },
  {
    id: 'REQ021',
    vehicleName: 'Toyota Hilux',
    vehicleCode: 'ABC-1234',
    type: 'Repair',
    date: '2025-03-15',
    parts: 6,
    status: 'rejected',
  },
  {
    id: 'REQ018',
    vehicleName: 'Ford Ranger',
    vehicleCode: 'XYZ-5678',
    type: 'Regular Maintenance',
    date: '2025-03-01',
    parts: 3,
    representative: 'David Kim',
    status: 'completed',
  },
];

const ClientRequestsPage: React.FC = () => {
  const { toast } = useToast();
  const [requests, setRequests] = useState<MaintenanceRequest[]>(initialRequests);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<RequestStatus | 'all'>('all');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [dateRange, setDateRange] = useState<{ start: string; end: string }>({
    start: '',
    end: '',
  });

  // Filter requests based on search term, status, and date range
  const filteredRequests = requests.filter(request => {
    const searchMatch = 
      request.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.vehicleName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.vehicleCode.toLowerCase().includes(searchTerm.toLowerCase());
    
    const statusMatch = statusFilter === 'all' || request.status === statusFilter;
    
    let dateMatch = true;
    if (dateRange.start && dateRange.end) {
      const requestDate = new Date(request.date);
      const startDate = new Date(dateRange.start);
      const endDate = new Date(dateRange.end);
      dateMatch = requestDate >= startDate && requestDate <= endDate;
    }
    
    return searchMatch && statusMatch && dateMatch;
  });

  const counts = {
    total: requests.length,
    pending: requests.filter(r => r.status === 'pending').length,
    approved: requests.filter(r => r.status === 'approved').length,
    inProgress: requests.filter(r => r.status === 'in-progress').length,
    completed: requests.filter(r => r.status === 'completed').length,
    rejected: requests.filter(r => r.status === 'rejected').length,
  };

  const handleViewRequest = (id: string) => {
    toast({
      title: "Request Details",
      description: `Viewing details for request ${id}`,
    });
    // In a real app, navigate to request details page or show a modal
  };

  const handleDownloadPDF = (id: string) => {
    toast({
      title: "Download Started",
      description: `Downloading PDF for request ${id}`,
    });
    // In a real app, this would trigger a PDF download
  };

  // Get status badge color based on status
  const getStatusBadge = (status: RequestStatus) => {
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
        return 'bg-maint-teal bg-opacity-20 text-maint-teal';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <DashboardLayout userRole="client">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-maint-gray-800">My Maintenance Requests</h2>
        <p className="text-maint-gray-600">View and track all your maintenance requests</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow-md p-4 flex justify-between items-center">
          <div>
            <p className="text-sm text-maint-gray-500">Total Requests</p>
            <p className="text-2xl font-bold">{counts.total}</p>
          </div>
          <FileText className="h-10 w-10 text-maint-blue opacity-80" />
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-4 flex justify-between items-center">
          <div>
            <p className="text-sm text-maint-gray-500">Pending</p>
            <p className="text-2xl font-bold">{counts.pending}</p>
          </div>
          <div className="h-10 w-10 rounded-full bg-yellow-100 flex items-center justify-center">
            <Calendar className="h-6 w-6 text-yellow-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-4 flex justify-between items-center">
          <div>
            <p className="text-sm text-maint-gray-500">In Progress</p>
            <p className="text-2xl font-bold">{counts.inProgress + counts.approved}</p>
          </div>
          <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
            <BarChart3 className="h-6 w-6 text-blue-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-4 flex justify-between items-center">
          <div>
            <p className="text-sm text-maint-gray-500">Completed</p>
            <p className="text-2xl font-bold">{counts.completed}</p>
          </div>
          <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
            <FileText className="h-6 w-6 text-maint-teal" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-4 flex justify-between items-center">
          <div>
            <p className="text-sm text-maint-gray-500">Success Rate</p>
            <p className="text-2xl font-bold">
              {counts.total > 0 ? ((counts.completed / counts.total) * 100).toFixed(0) : 0}%
            </p>
          </div>
          <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
            <BarChart3 className="h-6 w-6 text-purple-600" />
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
          <div className="flex items-center w-full lg:w-80">
            <Search className="w-5 h-5 mr-2 text-maint-gray-400" />
            <Input
              placeholder="Search requests..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
          </div>
          
          <div className="flex flex-wrap gap-3">
            <select
              className="form-input"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as RequestStatus | 'all')}
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="rejected">Rejected</option>
            </select>
            
            <Button 
              variant="outline" 
              className="flex items-center gap-1"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
            >
              <Filter className="h-4 w-4 mr-1" />
              Date Filter
            </Button>
            
            <Button className="bg-maint-blue hover:bg-blue-700">
              <Download className="h-4 w-4 mr-2" />
              Export History
            </Button>
          </div>
        </div>
        
        {isFilterOpen && (
          <div className="flex flex-wrap gap-4 p-4 mb-6 bg-maint-gray-50 rounded-md">
            <div>
              <label className="block text-sm font-medium text-maint-gray-700 mb-1">Date Range</label>
              <div className="flex gap-2 items-center">
                <Input
                  type="date"
                  value={dateRange.start}
                  onChange={e => setDateRange({ ...dateRange, start: e.target.value })}
                  className="w-40"
                />
                <span className="text-maint-gray-500">to</span>
                <Input
                  type="date"
                  value={dateRange.end}
                  onChange={e => setDateRange({ ...dateRange, end: e.target.value })}
                  className="w-40"
                />
                <Button 
                  variant="outline" 
                  className="ml-2"
                  onClick={() => setDateRange({ start: '', end: '' })}
                >
                  Clear
                </Button>
              </div>
            </div>
          </div>
        )}
        
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Request ID</TableHead>
                <TableHead>Vehicle</TableHead>
                <TableHead>Vehicle Code</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Representative</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRequests.map((request) => (
                <TableRow key={request.id}>
                  <TableCell className="font-medium">{request.id}</TableCell>
                  <TableCell>{request.vehicleName}</TableCell>
                  <TableCell>{request.vehicleCode}</TableCell>
                  <TableCell>{request.type}</TableCell>
                  <TableCell>{new Date(request.date).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadge(request.status)}`}>
                      {request.status === 'in-progress' ? 'In Progress' : request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                    </span>
                  </TableCell>
                  <TableCell>
                    {request.representative || (
                      <span className="text-maint-gray-400 text-sm">Not assigned</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0"
                        onClick={() => handleViewRequest(request.id)}
                      >
                        <Eye className="h-4 w-4 text-maint-blue" />
                      </Button>
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0"
                        onClick={() => handleDownloadPDF(request.id)}
                      >
                        <Download className="h-4 w-4 text-maint-gray-600" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              
              {filteredRequests.length === 0 && (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8 text-maint-gray-500">
                    No requests found matching your criteria
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ClientRequestsPage;
