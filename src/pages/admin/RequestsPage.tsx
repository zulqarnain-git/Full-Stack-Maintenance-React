
import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { 
  Search, CheckCircle, AlertTriangle, Clock, File, ChevronDown, 
  ThumbsUp, ThumbsDown, X
} from 'lucide-react';

type RequestStatus = 'pending' | 'approved' | 'rejected' | 'in-progress' | 'completed';

interface MaintenanceRequest {
  id: string;
  client: string;
  vehicle: string;
  type: string;
  date: string;
  budget: number;
  representative?: string;
  status: RequestStatus;
  priority: 'low' | 'medium' | 'high';
}

// Mock data for maintenance requests
const initialRequests: MaintenanceRequest[] = [
  {
    id: 'REQ-2025-045',
    client: 'ABC Corporation',
    vehicle: 'Toyota Land Cruiser (ABC-123)',
    type: 'Regular Maintenance',
    date: '2025-05-05',
    budget: 1200,
    status: 'pending',
    priority: 'medium',
  },
  {
    id: 'REQ-2025-044',
    client: 'XYZ Industries',
    vehicle: 'Ford F-150 (XYZ-456)',
    type: 'Repair',
    date: '2025-05-04',
    budget: 2500,
    representative: 'James Wilson',
    status: 'approved',
    priority: 'high',
  },
  {
    id: 'REQ-2025-043',
    client: 'Global Logistics',
    vehicle: 'Mercedes Sprinter (GLO-789)',
    type: 'Emergency Repair',
    date: '2025-05-03',
    budget: 3800,
    representative: 'Maria Rodriguez',
    status: 'in-progress',
    priority: 'high',
  },
  {
    id: 'REQ-2025-042',
    client: 'Tech Solutions Inc',
    vehicle: 'Nissan Patrol (TEC-012)',
    type: 'Routine Inspection',
    date: '2025-05-02',
    budget: 800,
    representative: 'Lisa Chen',
    status: 'completed',
    priority: 'low',
  },
  {
    id: 'REQ-2025-041',
    client: 'First National Bank',
    vehicle: 'Lexus LX570 (FNB-345)',
    type: 'Repair',
    date: '2025-05-01',
    budget: 1950,
    status: 'rejected',
    priority: 'medium',
  },
  {
    id: 'REQ-2025-040',
    client: 'ABC Corporation',
    vehicle: 'Toyota Hilux (ABC-456)',
    type: 'Regular Maintenance',
    date: '2025-04-30',
    budget: 950,
    representative: 'David Kim',
    status: 'completed',
    priority: 'low',
  },
  {
    id: 'REQ-2025-039',
    client: 'XYZ Industries',
    vehicle: 'Ford Ranger (XYZ-789)',
    type: 'Emergency Repair',
    date: '2025-04-29',
    budget: 3200,
    representative: 'James Wilson',
    status: 'completed',
    priority: 'high',
  },
];

const RequestsPage: React.FC = () => {
  const { toast } = useToast();
  const [requests, setRequests] = useState<MaintenanceRequest[]>(initialRequests);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<RequestStatus | 'all'>('all');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Filter requests based on search term and status
  const filteredRequests = requests.filter(request => {
    const searchMatch = 
      request.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.vehicle.toLowerCase().includes(searchTerm.toLowerCase());
    
    const statusMatch = statusFilter === 'all' || request.status === statusFilter;
    
    return searchMatch && statusMatch;
  });

  const counts = {
    pending: requests.filter(r => r.status === 'pending').length,
    approved: requests.filter(r => r.status === 'approved').length,
    inProgress: requests.filter(r => r.status === 'in-progress').length,
    completed: requests.filter(r => r.status === 'completed').length,
    rejected: requests.filter(r => r.status === 'rejected').length,
  };

  const handleStatusChange = (id: string, newStatus: RequestStatus) => {
    const updatedRequests = requests.map(request => 
      request.id === id ? { ...request, status: newStatus } : request
    );
    
    setRequests(updatedRequests);
    
    const request = requests.find(r => r.id === id);
    
    let message: string;
    if (newStatus === 'approved') {
      message = `${request?.id} approved. Please assign a representative.`;
    } else if (newStatus === 'rejected') {
      message = `${request?.id} has been rejected.`;
    } else {
      message = `${request?.id} status updated to ${newStatus}.`;
    }
    
    toast({
      title: "Request Updated",
      description: message,
    });
  };

  const handleViewRequest = (id: string) => {
    toast({
      title: "Request Details",
      description: `Viewing details for request ${id}`,
    });
    // In a real app, navigate to request details page or show a modal
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

  // Get priority badge color based on priority
  const getPriorityBadge = (priority: 'low' | 'medium' | 'high') => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <DashboardLayout userRole="admin">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-maint-gray-800">Maintenance Requests</h2>
        <p className="text-maint-gray-600">Review, approve, and track maintenance requests</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
        <Card className={`${statusFilter === 'all' ? 'border-2 border-maint-blue' : ''}`}>
          <CardContent className="p-4">
            <button
              onClick={() => setStatusFilter('all')}
              className="w-full h-full text-left"
            >
              <div className="font-medium">All Requests</div>
              <div className="text-2xl font-bold mt-1">{requests.length}</div>
            </button>
          </CardContent>
        </Card>
        
        <Card className={`${statusFilter === 'pending' ? 'border-2 border-maint-blue' : ''}`}>
          <CardContent className="p-4">
            <button
              onClick={() => setStatusFilter('pending')}
              className="w-full h-full text-left flex justify-between items-center"
            >
              <div>
                <div className="font-medium">Pending</div>
                <div className="text-2xl font-bold mt-1">{counts.pending}</div>
              </div>
              <AlertTriangle className="h-8 w-8 text-yellow-500 opacity-80" />
            </button>
          </CardContent>
        </Card>
        
        <Card className={`${statusFilter === 'approved' ? 'border-2 border-maint-blue' : ''}`}>
          <CardContent className="p-4">
            <button
              onClick={() => setStatusFilter('approved')}
              className="w-full h-full text-left flex justify-between items-center"
            >
              <div>
                <div className="font-medium">Approved</div>
                <div className="text-2xl font-bold mt-1">{counts.approved}</div>
              </div>
              <ThumbsUp className="h-8 w-8 text-blue-500 opacity-80" />
            </button>
          </CardContent>
        </Card>
        
        <Card className={`${statusFilter === 'in-progress' ? 'border-2 border-maint-blue' : ''}`}>
          <CardContent className="p-4">
            <button
              onClick={() => setStatusFilter('in-progress')}
              className="w-full h-full text-left flex justify-between items-center"
            >
              <div>
                <div className="font-medium">In Progress</div>
                <div className="text-2xl font-bold mt-1">{counts.inProgress}</div>
              </div>
              <Clock className="h-8 w-8 text-purple-500 opacity-80" />
            </button>
          </CardContent>
        </Card>
        
        <Card className={`${statusFilter === 'completed' ? 'border-2 border-maint-blue' : ''}`}>
          <CardContent className="p-4">
            <button
              onClick={() => setStatusFilter('completed')}
              className="w-full h-full text-left flex justify-between items-center"
            >
              <div>
                <div className="font-medium">Completed</div>
                <div className="text-2xl font-bold mt-1">{counts.completed}</div>
              </div>
              <CheckCircle className="h-8 w-8 text-maint-teal opacity-80" />
            </button>
          </CardContent>
        </Card>
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
            <Button 
              variant="outline" 
              className="flex items-center gap-1"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
            >
              More Filters
              <ChevronDown className={`h-4 w-4 transition-transform ${isFilterOpen ? 'transform rotate-180' : ''}`} />
            </Button>
            
            <Button className="bg-maint-blue hover:bg-blue-700">
              Generate Report
            </Button>
          </div>
        </div>
        
        {isFilterOpen && (
          <div className="flex flex-wrap gap-4 p-4 mb-6 bg-maint-gray-50 rounded-md">
            <div>
              <label className="block text-sm font-medium text-maint-gray-700 mb-1">Date Range</label>
              <div className="flex gap-2">
                <Input type="date" className="w-40" />
                <span className="self-center">to</span>
                <Input type="date" className="w-40" />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-maint-gray-700 mb-1">Priority</label>
              <select className="form-input w-40">
                <option value="all">All Priorities</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-maint-gray-700 mb-1">Client</label>
              <select className="form-input w-48">
                <option value="all">All Clients</option>
                <option>ABC Corporation</option>
                <option>XYZ Industries</option>
                <option>Global Logistics</option>
                <option>Tech Solutions Inc</option>
                <option>First National Bank</option>
              </select>
            </div>
            
            <div className="flex items-end ml-auto">
              <Button variant="outline" className="h-10">
                Apply Filters
              </Button>
            </div>
          </div>
        )}
        
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Request ID</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Vehicle</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Budget</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRequests.map((request) => (
                <TableRow key={request.id}>
                  <TableCell className="font-mono text-sm">{request.id}</TableCell>
                  <TableCell className="font-medium">{request.client}</TableCell>
                  <TableCell>{request.vehicle}</TableCell>
                  <TableCell>{request.type}</TableCell>
                  <TableCell>{new Date(request.date).toLocaleDateString()}</TableCell>
                  <TableCell>${request.budget.toLocaleString()}</TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadge(request.status)}`}>
                      {request.status === 'in-progress' ? 'In Progress' : request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityBadge(request.priority)}`}>
                      {request.priority.charAt(0).toUpperCase() + request.priority.slice(1)}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 p-0 px-2 text-maint-blue"
                        onClick={() => handleViewRequest(request.id)}
                      >
                        <File className="h-4 w-4 mr-1" />
                        View
                      </Button>
                      
                      {request.status === 'pending' && (
                        <>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 text-green-600 hover:text-green-700 hover:bg-green-50"
                            onClick={() => handleStatusChange(request.id, 'approved')}
                          >
                            <ThumbsUp className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-50"
                            onClick={() => handleStatusChange(request.id, 'rejected')}
                          >
                            <ThumbsDown className="h-4 w-4" />
                          </Button>
                        </>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              
              {filteredRequests.length === 0 && (
                <TableRow>
                  <TableCell colSpan={9} className="text-center py-8 text-maint-gray-500">
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

export default RequestsPage;
