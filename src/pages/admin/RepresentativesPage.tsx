import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import { Plus, Search, Edit, Trash, MapPin, CheckCircle, XCircle, Phone } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

interface Representative {
  id: number;
  name: string;
  email: string;
  phone: string;
  region: string;
  status: 'active' | 'inactive';
  assignedRequests: number;
  completedRequests: number;
}

// Mock data for representatives
const initialRepresentatives: Representative[] = [
  {
    id: 1,
    name: 'James Wilson',
    email: 'james@mainflow.com',
    phone: '+1 (555) 123-7890',
    region: 'Northern Region',
    status: 'active',
    assignedRequests: 5,
    completedRequests: 120,
  },
  {
    id: 2,
    name: 'Maria Rodriguez',
    email: 'maria@mainflow.com',
    phone: '+1 (555) 234-5678',
    region: 'Southern Region',
    status: 'active',
    assignedRequests: 3,
    completedRequests: 87,
  },
  {
    id: 3,
    name: 'Samuel Johnson',
    email: 'samuel@mainflow.com',
    phone: '+1 (555) 345-6789',
    region: 'Eastern Region',
    status: 'inactive',
    assignedRequests: 0,
    completedRequests: 54,
  },
  {
    id: 4,
    name: 'Lisa Chen',
    email: 'lisa@mainflow.com',
    phone: '+1 (555) 456-7890',
    region: 'Western Region',
    status: 'active',
    assignedRequests: 7,
    completedRequests: 92,
  },
  {
    id: 5,
    name: 'David Kim',
    email: 'david@mainflow.com',
    phone: '+1 (555) 567-8901',
    region: 'Central Region',
    status: 'active',
    assignedRequests: 4,
    completedRequests: 76,
  },
];

// Available regions for selection
const availableRegions = ['Northern Region', 'Southern Region', 'Eastern Region', 'Western Region', 'Central Region'];

const RepresentativesPage: React.FC = () => {
  const { toast } = useToast();
  const [representatives, setRepresentatives] = useState(initialRepresentatives);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'active' | 'inactive'>('all');
  const [regionFilter, setRegionFilter] = useState<string>('all');
  
  // Representative dialog state
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedRepresentative, setSelectedRepresentative] = useState<Representative | null>(null);
  const [newRepresentative, setNewRepresentative] = useState<Omit<Representative, 'id' | 'assignedRequests' | 'completedRequests'>>({
    name: '',
    email: '',
    phone: '',
    region: 'Northern Region',
    status: 'active',
  });

  // Get unique regions from representatives data
  const regions = ['all', ...new Set(initialRepresentatives.map(rep => rep.region))];

  // Filter representatives based on search term and filters
  const filteredRepresentatives = representatives.filter(rep => {
    const matchesSearch = 
      rep.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rep.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rep.region.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = 
      activeFilter === 'all' || 
      (activeFilter === 'active' && rep.status === 'active') || 
      (activeFilter === 'inactive' && rep.status === 'inactive');
    
    const matchesRegion =
      regionFilter === 'all' ||
      rep.region === regionFilter;
    
    return matchesSearch && matchesStatus && matchesRegion;
  });

  const handleStatusToggle = (id: number) => {
    setRepresentatives(representatives.map(rep => 
      rep.id === id 
        ? { ...rep, status: rep.status === 'active' ? 'inactive' : 'active' }
        : rep
    ));
    
    const rep = representatives.find(r => r.id === id);
    const newStatus = rep?.status === 'active' ? 'inactive' : 'active';
    
    toast({
      title: `Representative status updated`,
      description: `${rep?.name} is now ${newStatus}.`,
    });
  };

  const handleDelete = (id: number) => {
    const rep = representatives.find(r => r.id === id);
    
    // In a real app, you would confirm with the user before deletion
    setRepresentatives(representatives.filter(rep => rep.id !== id));
    
    toast({
      title: "Representative removed",
      description: `${rep?.name} has been removed from the system.`,
    });
  };

  const handleCall = (phone: string) => {
    toast({
      title: "Calling representative",
      description: `Dialing ${phone}...`,
    });
    // In a real app, this would initiate a call or show contact info
  };
  
  const handleAddRepresentative = () => {
    const newId = representatives.length > 0 ? Math.max(...representatives.map(r => r.id)) + 1 : 1;
    
    const representativeToAdd: Representative = {
      id: newId,
      ...newRepresentative,
      assignedRequests: 0,
      completedRequests: 0,
    };
    
    setRepresentatives([...representatives, representativeToAdd]);
    setIsAddDialogOpen(false);
    
    // Reset the form
    setNewRepresentative({
      name: '',
      email: '',
      phone: '',
      region: 'Northern Region',
      status: 'active',
    });
    
    toast({
      title: "Representative added",
      description: `${representativeToAdd.name} has been added to the system.`,
    });
  };
  
  const handleEditRepresentative = (id: number) => {
    const representative = representatives.find(r => r.id === id);
    if (representative) {
      setSelectedRepresentative(representative);
      setIsEditDialogOpen(true);
    }
  };
  
  const handleUpdateRepresentative = () => {
    if (!selectedRepresentative) return;
    
    setRepresentatives(representatives.map(rep => 
      rep.id === selectedRepresentative.id ? selectedRepresentative : rep
    ));
    
    setIsEditDialogOpen(false);
    
    toast({
      title: "Representative updated",
      description: `${selectedRepresentative.name} has been updated successfully.`,
    });
  };
  
  const handleAddToRegion = (region: string) => {
    setNewRepresentative({
      ...newRepresentative,
      region: region
    });
    setIsAddDialogOpen(true);
  };

  return (
    <DashboardLayout userRole="admin">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-maint-gray-800">Representatives</h2>
        <p className="text-maint-gray-600">Manage field representatives and their assignments</p>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div className="flex items-center w-full md:w-80">
            <Search className="w-5 h-5 mr-2 text-maint-gray-400" />
            <Input
              placeholder="Search representatives..."
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
            
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-maint-blue hover:bg-blue-700">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Representative
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Representative</DialogTitle>
                  <DialogDescription>
                    Create a new representative record in the system.
                  </DialogDescription>
                </DialogHeader>
                
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label className="text-right text-sm">Full Name</label>
                    <Input
                      className="col-span-3"
                      value={newRepresentative.name}
                      onChange={(e) => setNewRepresentative({ ...newRepresentative, name: e.target.value })}
                    />
                  </div>
                  
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label className="text-right text-sm">Email</label>
                    <Input
                      type="email"
                      className="col-span-3"
                      value={newRepresentative.email}
                      onChange={(e) => setNewRepresentative({ ...newRepresentative, email: e.target.value })}
                    />
                  </div>
                  
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label className="text-right text-sm">Phone</label>
                    <Input
                      className="col-span-3"
                      value={newRepresentative.phone}
                      onChange={(e) => setNewRepresentative({ ...newRepresentative, phone: e.target.value })}
                    />
                  </div>
                  
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label className="text-right text-sm">Region</label>
                    <select
                      className="col-span-3 form-input"
                      value={newRepresentative.region}
                      onChange={(e) => setNewRepresentative({ ...newRepresentative, region: e.target.value })}
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
                      value={newRepresentative.status}
                      onChange={(e) => setNewRepresentative({ ...newRepresentative, status: e.target.value as 'active' | 'inactive' })}
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>
                </div>
                
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button 
                    className="bg-maint-blue hover:bg-blue-700" 
                    onClick={handleAddRepresentative}
                    disabled={!newRepresentative.name || !newRepresentative.email}
                  >
                    Add Representative
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
                <TableHead>Email</TableHead>
                <TableHead>Region</TableHead>
                <TableHead>Active Requests</TableHead>
                <TableHead>Completed</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRepresentatives.map((rep) => (
                <TableRow key={rep.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-full bg-maint-blue text-white flex items-center justify-center">
                        {rep.name.charAt(0)}
                      </div>
                      {rep.name}
                    </div>
                  </TableCell>
                  <TableCell>{rep.email}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1 text-maint-gray-500" />
                      {rep.region}
                    </div>
                  </TableCell>
                  <TableCell>{rep.assignedRequests}</TableCell>
                  <TableCell>{rep.completedRequests}</TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      rep.status === 'active'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {rep.status === 'active' ? 'Active' : 'Inactive'}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 text-maint-blue"
                        onClick={() => handleCall(rep.phone)}
                      >
                        <Phone className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 w-8 p-0"
                        onClick={() => handleEditRepresentative(rep.id)}
                      >
                        <Edit className="h-4 w-4 text-maint-gray-500" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0"
                        onClick={() => handleStatusToggle(rep.id)}
                      >
                        {rep.status === 'active' ? (
                          <XCircle className="h-4 w-4 text-maint-gray-500" />
                        ) : (
                          <CheckCircle className="h-4 w-4 text-maint-gray-500" />
                        )}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-50"
                        onClick={() => handleDelete(rep.id)}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              
              {filteredRepresentatives.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-maint-gray-500">
                    No representatives found matching your filters
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
      
      {/* Edit Representative Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Representative</DialogTitle>
            <DialogDescription>
              Update representative information.
            </DialogDescription>
          </DialogHeader>
          
          {selectedRepresentative && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <label className="text-right text-sm">Full Name</label>
                <Input
                  className="col-span-3"
                  value={selectedRepresentative.name}
                  onChange={(e) => setSelectedRepresentative({ ...selectedRepresentative, name: e.target.value })}
                />
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <label className="text-right text-sm">Email</label>
                <Input
                  type="email"
                  className="col-span-3"
                  value={selectedRepresentative.email}
                  onChange={(e) => setSelectedRepresentative({ ...selectedRepresentative, email: e.target.value })}
                />
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <label className="text-right text-sm">Phone</label>
                <Input
                  className="col-span-3"
                  value={selectedRepresentative.phone}
                  onChange={(e) => setSelectedRepresentative({ ...selectedRepresentative, phone: e.target.value })}
                />
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <label className="text-right text-sm">Region</label>
                <select
                  className="col-span-3 form-input"
                  value={selectedRepresentative.region}
                  onChange={(e) => setSelectedRepresentative({ ...selectedRepresentative, region: e.target.value })}
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
                  value={selectedRepresentative.status}
                  onChange={(e) => setSelectedRepresentative({ ...selectedRepresentative, status: e.target.value as 'active' | 'inactive' })}
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
            <Button className="bg-maint-blue hover:bg-blue-700" onClick={handleUpdateRepresentative}>
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
                  <MapPin className="h-4 w-4 inline mr-1" />
                  {region}
                </h4>
                <span className="text-sm text-maint-gray-500">
                  {representatives.filter(rep => rep.region === region && rep.status === 'active').length} Representatives
                </span>
              </div>
              
              <div className="space-y-2 mt-3">
                {representatives
                  .filter(rep => rep.region === region && rep.status === 'active')
                  .map(rep => (
                    <div key={rep.id} className="flex items-center justify-between text-sm">
                      <span>{rep.name}</span>
                      <span className="text-maint-gray-500">{rep.assignedRequests} active</span>
                    </div>
                  ))}
                  
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full mt-2 text-maint-blue border-maint-blue hover:bg-blue-50"
                  onClick={() => handleAddToRegion(region)}
                >
                  <Plus className="h-3 w-3 mr-1" />
                  Add to Region
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default RepresentativesPage;
