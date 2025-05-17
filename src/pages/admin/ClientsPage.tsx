
import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import { Plus, Search, Edit, Trash, CheckCircle, XCircle, Map } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

// Client interface
interface Client {
  id: number;
  name: string;
  contact: string;
  email: string;
  phone: string;
  region: string;
  status: 'active' | 'inactive';
  contracts: number;
}

// Mock data for clients
const initialClients: Client[] = [
  {
    id: 1,
    name: 'ABC Corporation',
    contact: 'John Smith',
    email: 'john@abccorp.com',
    phone: '+1 (555) 123-4567',
    region: 'North',
    status: 'active',
    contracts: 2,
  },
  {
    id: 2,
    name: 'XYZ Industries',
    contact: 'Sarah Johnson',
    email: 'sarah@xyzind.com',
    phone: '+1 (555) 987-6543',
    region: 'South',
    status: 'active',
    contracts: 1,
  },
  {
    id: 3,
    name: 'Global Logistics',
    contact: 'Michael Brown',
    email: 'michael@globallog.com',
    phone: '+1 (555) 456-7890',
    region: 'East',
    status: 'inactive',
    contracts: 0,
  },
  {
    id: 4,
    name: 'Tech Solutions Inc',
    contact: 'Emily Davis',
    email: 'emily@techsol.com',
    phone: '+1 (555) 234-5678',
    region: 'West',
    status: 'active',
    contracts: 3,
  },
  {
    id: 5,
    name: 'First National Bank',
    contact: 'Robert Wilson',
    email: 'robert@fnbank.com',
    phone: '+1 (555) 876-5432',
    region: 'Central',
    status: 'active',
    contracts: 1,
  }
];

// Available regions for selection
const availableRegions = ['North', 'South', 'East', 'West', 'Central'];

const ClientsPage: React.FC = () => {
  const { toast } = useToast();
  const [clients, setClients] = useState(initialClients);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'active' | 'inactive'>('all');
  const [regionFilter, setRegionFilter] = useState<string>('all');
  
  // Client dialog state
  const [isAddClientDialogOpen, setIsAddClientDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [newClient, setNewClient] = useState<Omit<Client, 'id' | 'contracts'>>({
    name: '',
    contact: '',
    email: '',
    phone: '',
    region: 'North',
    status: 'active',
  });

  // Get unique regions from clients data
  const regions = ['all', ...new Set(initialClients.map(client => client.region))];

  // Filter clients based on search term and filters
  const filteredClients = clients.filter(client => {
    const matchesSearch = 
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.contact.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = 
      activeFilter === 'all' || 
      (activeFilter === 'active' && client.status === 'active') || 
      (activeFilter === 'inactive' && client.status === 'inactive');
    
    const matchesRegion =
      regionFilter === 'all' ||
      client.region === regionFilter;
    
    return matchesSearch && matchesStatus && matchesRegion;
  });

  const handleStatusToggle = (id: number) => {
    setClients(clients.map(client => 
      client.id === id 
        ? { ...client, status: client.status === 'active' ? 'inactive' : 'active' }
        : client
    ));
    
    const client = clients.find(c => c.id === id);
    const newStatus = client?.status === 'active' ? 'inactive' : 'active';
    
    toast({
      title: `Client status updated`,
      description: `${client?.name} is now ${newStatus}.`,
    });
  };

  const handleDelete = (id: number) => {
    const client = clients.find(c => c.id === id);
    
    // In a real app, you would confirm with the user before deletion
    setClients(clients.filter(client => client.id !== id));
    
    toast({
      title: "Client deleted",
      description: `${client?.name} has been removed from the system.`,
    });
  };
  
  const handleAddClient = () => {
    const newId = clients.length > 0 ? Math.max(...clients.map(c => c.id)) + 1 : 1;
    
    const clientToAdd: Client = {
      id: newId,
      ...newClient,
      contracts: 0,
    };
    
    setClients([...clients, clientToAdd]);
    setIsAddClientDialogOpen(false);
    
    // Reset the form
    setNewClient({
      name: '',
      contact: '',
      email: '',
      phone: '',
      region: 'North',
      status: 'active',
    });
    
    toast({
      title: "Client added",
      description: `${clientToAdd.name} has been added to the system.`,
    });
  };
  
  const handleEditClient = (id: number) => {
    const client = clients.find(c => c.id === id);
    if (client) {
      setSelectedClient(client);
      setIsEditDialogOpen(true);
    }
  };
  
  const handleUpdateClient = () => {
    if (!selectedClient) return;
    
    setClients(clients.map(client => 
      client.id === selectedClient.id ? selectedClient : client
    ));
    
    setIsEditDialogOpen(false);
    
    toast({
      title: "Client updated",
      description: `${selectedClient.name} has been updated successfully.`,
    });
  };

  return (
    <DashboardLayout userRole="admin">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-maint-gray-800">Clients</h2>
        <p className="text-maint-gray-600">Manage clients and their information</p>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div className="flex items-center w-full md:w-80">
            <Search className="w-5 h-5 mr-2 text-maint-gray-400" />
            <Input
              placeholder="Search clients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
          </div>
          
          <div className="flex flex-wrap gap-3">
            <div>
              <select
                className="form-input"
                value={activeFilter}
                onChange={(e) => setActiveFilter(e.target.value as 'all' | 'active' | 'inactive')}
              >
                <option value="all">All Status</option>
                <option value="active">Active Only</option>
                <option value="inactive">Inactive Only</option>
              </select>
            </div>
            
            <div>
              <select
                className="form-input"
                value={regionFilter}
                onChange={(e) => setRegionFilter(e.target.value)}
              >
                {regions.map(region => (
                  <option key={region} value={region}>
                    {region === 'all' ? 'All Regions' : region}
                  </option>
                ))}
              </select>
            </div>
            
            <Dialog open={isAddClientDialogOpen} onOpenChange={setIsAddClientDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-maint-blue hover:bg-blue-700">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Client
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Client</DialogTitle>
                  <DialogDescription>
                    Create a new client record in the system.
                  </DialogDescription>
                </DialogHeader>
                
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label className="text-right text-sm">Company Name</label>
                    <Input
                      className="col-span-3"
                      value={newClient.name}
                      onChange={(e) => setNewClient({ ...newClient, name: e.target.value })}
                    />
                  </div>
                  
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label className="text-right text-sm">Contact Person</label>
                    <Input
                      className="col-span-3"
                      value={newClient.contact}
                      onChange={(e) => setNewClient({ ...newClient, contact: e.target.value })}
                    />
                  </div>
                  
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label className="text-right text-sm">Email</label>
                    <Input
                      type="email"
                      className="col-span-3"
                      value={newClient.email}
                      onChange={(e) => setNewClient({ ...newClient, email: e.target.value })}
                    />
                  </div>
                  
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label className="text-right text-sm">Phone</label>
                    <Input
                      className="col-span-3"
                      value={newClient.phone}
                      onChange={(e) => setNewClient({ ...newClient, phone: e.target.value })}
                    />
                  </div>
                  
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label className="text-right text-sm">Region</label>
                    <select
                      className="col-span-3 form-input"
                      value={newClient.region}
                      onChange={(e) => setNewClient({ ...newClient, region: e.target.value })}
                    >
                      {availableRegions.map(region => (
                        <option key={region} value={region}>{region}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label className="text-right text-sm">Status</label>
                    <select
                      className="col-span-3 form-input"
                      value={newClient.status}
                      onChange={(e) => setNewClient({ ...newClient, status: e.target.value as 'active' | 'inactive' })}
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>
                </div>
                
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsAddClientDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button 
                    className="bg-maint-blue hover:bg-blue-700" 
                    onClick={handleAddClient}
                    disabled={!newClient.name || !newClient.email}
                  >
                    Add Client
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Contact Person</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Region</TableHead>
                <TableHead>Contracts</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredClients.map((client) => (
                <TableRow key={client.id}>
                  <TableCell className="font-medium">{client.name}</TableCell>
                  <TableCell>{client.contact}</TableCell>
                  <TableCell>{client.email}</TableCell>
                  <TableCell>{client.region}</TableCell>
                  <TableCell>
                    <span className="inline-flex items-center">
                      {client.contracts}
                      {client.contracts > 0 && (
                        <span className="ml-1 inline-block w-2 h-2 bg-maint-teal rounded-full"></span>
                      )}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      client.status === 'active'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {client.status === 'active' ? 'Active' : 'Inactive'}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 w-8 p-0"
                        onClick={() => handleEditClient(client.id)}
                      >
                        <Edit className="h-4 w-4 text-maint-gray-500" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0"
                        onClick={() => handleStatusToggle(client.id)}
                      >
                        {client.status === 'active' ? (
                          <XCircle className="h-4 w-4 text-maint-gray-500" />
                        ) : (
                          <CheckCircle className="h-4 w-4 text-maint-gray-500" />
                        )}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-50"
                        onClick={() => handleDelete(client.id)}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              
              {filteredClients.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-maint-gray-500">
                    No clients found matching your filters
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
      
      {/* Edit Client Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Client</DialogTitle>
            <DialogDescription>
              Update client information.
            </DialogDescription>
          </DialogHeader>
          
          {selectedClient && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <label className="text-right text-sm">Company Name</label>
                <Input
                  className="col-span-3"
                  value={selectedClient.name}
                  onChange={(e) => setSelectedClient({ ...selectedClient, name: e.target.value })}
                />
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <label className="text-right text-sm">Contact Person</label>
                <Input
                  className="col-span-3"
                  value={selectedClient.contact}
                  onChange={(e) => setSelectedClient({ ...selectedClient, contact: e.target.value })}
                />
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <label className="text-right text-sm">Email</label>
                <Input
                  type="email"
                  className="col-span-3"
                  value={selectedClient.email}
                  onChange={(e) => setSelectedClient({ ...selectedClient, email: e.target.value })}
                />
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <label className="text-right text-sm">Phone</label>
                <Input
                  className="col-span-3"
                  value={selectedClient.phone}
                  onChange={(e) => setSelectedClient({ ...selectedClient, phone: e.target.value })}
                />
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <label className="text-right text-sm">Region</label>
                <select
                  className="col-span-3 form-input"
                  value={selectedClient.region}
                  onChange={(e) => setSelectedClient({ ...selectedClient, region: e.target.value })}
                >
                  {availableRegions.map(region => (
                    <option key={region} value={region}>{region}</option>
                  ))}
                </select>
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <label className="text-right text-sm">Status</label>
                <select
                  className="col-span-3 form-input"
                  value={selectedClient.status}
                  onChange={(e) => setSelectedClient({ ...selectedClient, status: e.target.value as 'active' | 'inactive' })}
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button className="bg-maint-blue hover:bg-blue-700" onClick={handleUpdateClient}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Region Assignment Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h3 className="text-lg font-medium text-maint-gray-800 mb-4">Region Assignment</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {regions.filter(region => region !== 'all').map((region) => (
            <div key={region} className="border rounded-md p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-maint-gray-700">
                  <Map className="h-4 w-4 inline mr-1" />
                  {region}
                </h4>
                <span className="text-sm text-maint-gray-500">
                  {clients.filter(client => client.region === region && client.status === 'active').length} Clients
                </span>
              </div>
              
              <div className="space-y-2 mt-3">
                {clients
                  .filter(client => client.region === region && client.status === 'active')
                  .map(client => (
                    <div key={client.id} className="flex items-center justify-between text-sm">
                      <span>{client.name}</span>
                      <span className="text-maint-gray-500">{client.contracts} contracts</span>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ClientsPage;
