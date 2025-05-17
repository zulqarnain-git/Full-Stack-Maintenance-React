
import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from '@/components/ui/table';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Search, Clock, CheckCircle, MapPin, ArrowRight, Calendar, Upload, FileText } from 'lucide-react';

type RequestStatus = 'approved' | 'in-progress' | 'completed';

interface MaintenanceRequest {
  id: string;
  client: string;
  vehicle: string;
  vehicleCode: string;
  location: string;
  assignedDate: string;
  dueDate: string;
  parts: number;
  status: RequestStatus;
  urgency: 'low' | 'medium' | 'high';
  documents: { delivery?: boolean; installation?: boolean };
}

// Mock data for representative's assigned maintenance requests
const initialRequests: MaintenanceRequest[] = [
  {
    id: 'REQ-2025-044',
    client: 'ABC Corporation',
    vehicle: 'Toyota Land Cruiser',
    vehicleCode: 'ABC-123',
    location: 'Main Office, Northern Region',
    assignedDate: '2025-05-05',
    dueDate: '2025-05-08',
    parts: 5,
    status: 'approved',
    urgency: 'high',
    documents: {},
  },
  {
    id: 'REQ-2025-043',
    client: 'XYZ Industries',
    vehicle: 'Ford F-150',
    vehicleCode: 'XYZ-456',
    location: 'Site B, Northern Region',
    assignedDate: '2025-05-04',
    dueDate: '2025-05-09',
    parts: 3,
    status: 'approved',
    urgency: 'medium',
    documents: {},
  },
  {
    id: 'REQ-2025-042',
    client: 'Global Logistics',
    vehicle: 'Mercedes Sprinter',
    vehicleCode: 'GLO-789',
    location: 'Distribution Center, Northern Region',
    assignedDate: '2025-05-03',
    dueDate: '2025-05-10',
    parts: 4,
    status: 'in-progress',
    urgency: 'medium',
    documents: { delivery: true },
  },
  {
    id: 'REQ-2025-041',
    client: 'Tech Solutions Inc',
    vehicle: 'Nissan Patrol',
    vehicleCode: 'TEC-012',
    location: 'Regional HQ, Northern Region',
    assignedDate: '2025-05-02',
    dueDate: '2025-05-07',
    parts: 6,
    status: 'in-progress',
    urgency: 'high',
    documents: { delivery: true },
  },
  {
    id: 'REQ-2025-040',
    client: 'First National Bank',
    vehicle: 'Lexus LX570',
    vehicleCode: 'FNB-345',
    location: 'Branch Office, Northern Region',
    assignedDate: '2025-05-01',
    dueDate: '2025-05-06',
    parts: 2,
    status: 'completed',
    urgency: 'low',
    documents: { delivery: true, installation: true },
  },
  {
    id: 'REQ-2025-039',
    client: 'ABC Corporation',
    vehicle: 'Toyota Hilux',
    vehicleCode: 'ABC-456',
    location: 'Warehouse, Northern Region',
    assignedDate: '2025-04-30',
    dueDate: '2025-05-05',
    parts: 4,
    status: 'completed',
    urgency: 'medium',
    documents: { delivery: true, installation: true },
  },
];

const RepresentativeRequestsPage: React.FC = () => {
  const { toast } = useToast();
  const [requests, setRequests] = useState<MaintenanceRequest[]>(initialRequests);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<RequestStatus | 'all'>('all');

  // Filter requests based on search term and status
  const filteredRequests = requests.filter(request => {
    const searchMatch = 
      request.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.vehicle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const statusMatch = statusFilter === 'all' || request.status === statusFilter;
    
    return searchMatch && statusMatch;
  });

  const counts = {
    total: requests.length,
    approved: requests.filter(r => r.status === 'approved').length,
    inProgress: requests.filter(r => r.status === 'in-progress').length,
    completed: requests.filter(r => r.status === 'completed').length,
  };

  const handleStatusChange = (id: string, newStatus: RequestStatus) => {
    setRequests(
      requests.map(request => 
        request.id === id ? { ...request, status: newStatus } : request
      )
    );
    
    toast({
      title: "Status Updated",
      description: `Request ${id} marked as ${newStatus.replace('-', ' ')}`,
    });
  };

  const handleUploadDocument = (id: string, documentType: 'delivery' | 'installation') => {
    setRequests(
      requests.map(request => 
        request.id === id 
          ? { 
              ...request, 
              documents: { 
                ...request.documents, 
                [documentType]: true 
              } 
            } 
          : request
      )
    );
    
    toast({
      title: "Document Uploaded",
      description: `${documentType.charAt(0).toUpperCase() + documentType.slice(1)} receipt uploaded successfully`,
    });
    
    // If both documents are now uploaded, auto-complete the request
    const request = requests.find(r => r.id === id);
    if (
      request && 
      documentType === 'installation' && 
      request.documents.delivery
    ) {
      handleStatusChange(id, 'completed');
    }
  };

  const handleViewDetails = (id: string) => {
    toast({
      title: "Request Details",
      description: `Viewing details for request ${id}`,
    });
    // In a real app, navigate to request details page or show a modal
  };

  // Get urgency badge color based on urgency level
  const getUrgencyBadge = (urgency: 'low' | 'medium' | 'high') => {
    switch (urgency) {
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

  // Calculate days until due date
  const getDaysRemaining = (dueDate: string) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <DashboardLayout userRole="representative">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-maint-gray-800">Assigned Requests</h2>
        <p className="text-maint-gray-600">Manage and track your maintenance assignments</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card className={`${statusFilter === 'all' ? 'border-2 border-maint-blue' : ''}`}>
          <CardContent className="p-4">
            <button
              onClick={() => setStatusFilter('all')}
              className="w-full h-full text-left"
            >
              <div className="font-medium">All Requests</div>
              <div className="text-2xl font-bold mt-1">{counts.total}</div>
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
                <div className="font-medium">To Start</div>
                <div className="text-2xl font-bold mt-1">{counts.approved}</div>
              </div>
              <Calendar className="h-8 w-8 text-blue-500 opacity-80" />
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
        </div>
        
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Request ID</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Vehicle</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Urgency</TableHead>
                <TableHead>Documents</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRequests.map((request) => {
                const daysRemaining = getDaysRemaining(request.dueDate);
                
                return (
                  <TableRow key={request.id}>
                    <TableCell className="font-medium">{request.id}</TableCell>
                    <TableCell>{request.client}</TableCell>
                    <TableCell>
                      {request.vehicle}
                      <div className="text-xs text-maint-gray-500">{request.vehicleCode}</div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1 text-maint-gray-500" />
                        {request.location}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        {new Date(request.dueDate).toLocaleDateString()}
                        <div className={`text-xs ${
                          daysRemaining < 0 ? 'text-red-500' : 
                          daysRemaining === 0 ? 'text-yellow-500' : 
                          'text-maint-gray-500'
                        }`}>
                          {daysRemaining < 0 
                            ? `${Math.abs(daysRemaining)} days overdue` 
                            : daysRemaining === 0 
                              ? 'Due today' 
                              : `${daysRemaining} days remaining`}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        request.status === 'approved' 
                          ? 'bg-blue-100 text-blue-800' 
                          : request.status === 'in-progress'
                            ? 'bg-purple-100 text-purple-800'
                            : 'bg-maint-teal bg-opacity-20 text-maint-teal'
                      }`}>
                        {request.status === 'in-progress' ? 'In Progress' : request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getUrgencyBadge(request.urgency)}`}>
                        {request.urgency.charAt(0).toUpperCase() + request.urgency.slice(1)}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <span className={`h-2 w-2 rounded-full ${
                          request.documents.delivery ? 'bg-maint-teal' : 'bg-maint-gray-300'
                        }`} title="Delivery Receipt"></span>
                        <span className={`h-2 w-2 rounded-full ${
                          request.documents.installation ? 'bg-maint-teal' : 'bg-maint-gray-300'
                        }`} title="Installation Receipt"></span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 p-0 px-2 text-maint-blue"
                          onClick={() => handleViewDetails(request.id)}
                        >
                          <FileText className="h-4 w-4 mr-1" />
                          Details
                        </Button>
                        
                        {request.status === 'approved' && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 p-0 px-2 text-purple-600 hover:text-purple-800 hover:bg-purple-50"
                            onClick={() => handleStatusChange(request.id, 'in-progress')}
                          >
                            <ArrowRight className="h-4 w-4 mr-1" />
                            Start
                          </Button>
                        )}
                        
                        {request.status === 'in-progress' && !request.documents.delivery && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 p-0 px-2 text-maint-blue hover:bg-blue-50"
                            onClick={() => handleUploadDocument(request.id, 'delivery')}
                          >
                            <Upload className="h-4 w-4 mr-1" />
                            Delivery
                          </Button>
                        )}
                        
                        {request.status === 'in-progress' && request.documents.delivery && !request.documents.installation && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 p-0 px-2 text-maint-blue hover:bg-blue-50"
                            onClick={() => handleUploadDocument(request.id, 'installation')}
                          >
                            <Upload className="h-4 w-4 mr-1" />
                            Installation
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
              
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

export default RepresentativeRequestsPage;
