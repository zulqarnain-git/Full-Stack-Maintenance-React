
import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Plus, Search, Edit, FileText, BarChart3, Calendar } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { format } from 'date-fns';

// Contract interface
interface Contract {
  id: string;
  name: string;
  client: string;
  startDate: string;
  endDate: string;
  budget: number;
  spent: number;
  status: 'active' | 'inactive' | 'expired';
}

// Mock data for contracts
const initialContracts = [
  {
    id: 'CON-2025-001',
    name: 'Annual Vehicle Maintenance',
    client: 'ABC Corporation',
    startDate: '2025-01-01',
    endDate: '2025-12-31',
    budget: 50000,
    spent: 12450,
    status: 'active',
  },
  {
    id: 'CON-2025-002',
    name: 'Fleet Servicing Agreement',
    client: 'XYZ Industries',
    startDate: '2025-02-15',
    endDate: '2026-02-14',
    budget: 75000,
    spent: 18750,
    status: 'active',
  },
  {
    id: 'CON-2025-003',
    name: 'Quarterly Maintenance Service',
    client: 'Global Logistics',
    startDate: '2025-03-01',
    endDate: '2026-02-28',
    budget: 28000,
    spent: 7000,
    status: 'active',
  },
  {
    id: 'CON-2025-004',
    name: 'Vehicle Support Agreement',
    client: 'Tech Solutions Inc',
    startDate: '2025-01-01',
    endDate: '2025-12-31',
    budget: 60000,
    spent: 21000,
    status: 'active',
  },
  {
    id: 'CON-2024-011',
    name: 'Annual Maintenance Plan',
    client: 'First National Bank',
    startDate: '2024-06-01',
    endDate: '2025-05-31',
    budget: 45000,
    spent: 32000,
    status: 'active',
  },
];

const ContractsPage: React.FC = () => {
  const { toast } = useToast();
  const [contracts, setContracts] = useState<Contract[]>(initialContracts);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedContract, setSelectedContract] = useState<Contract | null>(null);
  const [isContractDialogOpen, setIsContractDialogOpen] = useState(false);
  const [isViewDetailsOpen, setIsViewDetailsOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  
  // New contract form state
  const [newContract, setNewContract] = useState<Omit<Contract, 'id' | 'spent'>>({
    name: '',
    client: '',
    startDate: format(new Date(), 'yyyy-MM-dd'),
    endDate: format(new Date(new Date().setFullYear(new Date().getFullYear() + 1)), 'yyyy-MM-dd'),
    budget: 0,
    status: 'active',
  });

  // Filter contracts based on search term
  const filteredContracts = contracts.filter(contract => {
    const searchTermLower = searchTerm.toLowerCase();
    return (
      contract.name.toLowerCase().includes(searchTermLower) ||
      contract.client.toLowerCase().includes(searchTermLower) ||
      contract.id.toLowerCase().includes(searchTermLower)
    );
  });

  const totalBudget = contracts.reduce((total, contract) => total + contract.budget, 0);
  const totalSpent = contracts.reduce((total, contract) => total + contract.spent, 0);
  const averageUtilization = (totalSpent / totalBudget) * 100;

  const handleViewContract = (id: string) => {
    const contract = contracts.find(c => c.id === id);
    if (contract) {
      setSelectedContract(contract);
      setIsViewDetailsOpen(true);
    }
  };
  
  const handleEditContract = (id: string) => {
    const contract = contracts.find(c => c.id === id);
    if (contract) {
      setSelectedContract(contract);
      setIsEditDialogOpen(true);
    }
  };
  
  const handleAddContract = () => {
    // Generate a new ID for the contract
    const year = new Date().getFullYear();
    const newId = `CON-${year}-${String(contracts.length + 1).padStart(3, '0')}`;
    
    // Add the new contract to the list
    const contractToAdd: Contract = {
      id: newId,
      ...newContract,
      spent: 0,
    };
    
    setContracts([...contracts, contractToAdd]);
    
    // Reset form and close dialog
    setNewContract({
      name: '',
      client: '',
      startDate: format(new Date(), 'yyyy-MM-dd'),
      endDate: format(new Date(new Date().setFullYear(new Date().getFullYear() + 1)), 'yyyy-MM-dd'),
      budget: 0,
      status: 'active',
    });
    setIsContractDialogOpen(false);
    
    toast({
      title: "Contract Added",
      description: `Contract ${newId} has been added successfully.`,
    });
  };
  
  const handleUpdateContract = () => {
    if (!selectedContract) return;
    
    const updatedContracts = contracts.map(contract => 
      contract.id === selectedContract.id ? selectedContract : contract
    );
    
    setContracts(updatedContracts);
    setIsEditDialogOpen(false);
    
    toast({
      title: "Contract Updated",
      description: `Contract ${selectedContract.id} has been updated successfully.`,
    });
  };

  return (
    <DashboardLayout userRole="admin">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-maint-gray-800">Contracts</h2>
        <p className="text-maint-gray-600">Manage maintenance contracts and budget allocations</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-maint-gray-500">Total Contract Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <div className="mr-2 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                <FileText className="h-5 w-5 text-maint-blue" />
              </div>
              <div>
                <div className="text-2xl font-bold text-maint-gray-800">${totalBudget.toLocaleString()}</div>
                <p className="text-xs text-maint-gray-500">{contracts.length} active contracts</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-maint-gray-500">Budget Utilized</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <div className="mr-2 h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                <BarChart3 className="h-5 w-5 text-maint-teal" />
              </div>
              <div>
                <div className="text-2xl font-bold text-maint-gray-800">${totalSpent.toLocaleString()}</div>
                <p className="text-xs text-maint-gray-500">{averageUtilization.toFixed(1)}% of total budget</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-maint-gray-500">Average Duration</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <div className="mr-2 h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
                <Calendar className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-maint-gray-800">12 months</div>
                <p className="text-xs text-maint-gray-500">Average contract length</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div className="flex items-center w-full md:w-80">
            <Search className="w-5 h-5 mr-2 text-maint-gray-400" />
            <Input
              placeholder="Search contracts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
          </div>
          
          <div className="flex gap-3">
            <Dialog open={isContractDialogOpen} onOpenChange={setIsContractDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-maint-blue hover:bg-blue-700">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Contract
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Add New Contract</DialogTitle>
                  <DialogDescription>
                    Create a new maintenance contract for a client.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label className="text-right text-sm">Contract Name</label>
                    <Input
                      className="col-span-3"
                      value={newContract.name}
                      onChange={(e) => setNewContract({ ...newContract, name: e.target.value })}
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label className="text-right text-sm">Client</label>
                    <Input
                      className="col-span-3"
                      value={newContract.client}
                      onChange={(e) => setNewContract({ ...newContract, client: e.target.value })}
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label className="text-right text-sm">Start Date</label>
                    <Input
                      type="date"
                      className="col-span-3"
                      value={newContract.startDate}
                      onChange={(e) => setNewContract({ ...newContract, startDate: e.target.value })}
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label className="text-right text-sm">End Date</label>
                    <Input
                      type="date"
                      className="col-span-3"
                      value={newContract.endDate}
                      onChange={(e) => setNewContract({ ...newContract, endDate: e.target.value })}
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label className="text-right text-sm">Budget ($)</label>
                    <Input
                      type="number"
                      className="col-span-3"
                      value={newContract.budget.toString()}
                      onChange={(e) => setNewContract({ ...newContract, budget: Number(e.target.value) })}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsContractDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button className="bg-maint-blue hover:bg-blue-700" onClick={handleAddContract}>
                    Add Contract
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
                <TableHead>Contract ID</TableHead>
                <TableHead>Contract Name</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Start Date</TableHead>
                <TableHead>End Date</TableHead>
                <TableHead>Budget</TableHead>
                <TableHead>Utilization</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredContracts.map((contract) => {
                const utilizationPercentage = (contract.spent / contract.budget) * 100;
                
                return (
                  <TableRow key={contract.id}>
                    <TableCell className="font-mono text-sm">{contract.id}</TableCell>
                    <TableCell className="font-medium">{contract.name}</TableCell>
                    <TableCell>{contract.client}</TableCell>
                    <TableCell>{new Date(contract.startDate).toLocaleDateString()}</TableCell>
                    <TableCell>{new Date(contract.endDate).toLocaleDateString()}</TableCell>
                    <TableCell>${contract.budget.toLocaleString()}</TableCell>
                    <TableCell>
                      <div className="w-full">
                        <div className="flex justify-between mb-1 text-xs">
                          <span>${contract.spent.toLocaleString()}</span>
                          <span>{utilizationPercentage.toFixed(1)}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${
                              utilizationPercentage > 90 
                                ? 'bg-red-500' 
                                : utilizationPercentage > 70 
                                  ? 'bg-yellow-500' 
                                  : 'bg-maint-teal'
                            }`} 
                            style={{ width: `${Math.min(utilizationPercentage, 100)}%` }}
                          ></div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 p-0 px-2 text-maint-blue"
                          onClick={() => handleViewContract(contract.id)}
                        >
                          View
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-8 w-8 p-0"
                          onClick={() => handleEditContract(contract.id)}
                        >
                          <Edit className="h-4 w-4 text-maint-gray-500" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
              
              {filteredContracts.length === 0 && (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8 text-maint-gray-500">
                    No contracts found matching your search
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
      
      {/* View Contract Details Dialog */}
      <Dialog open={isViewDetailsOpen} onOpenChange={setIsViewDetailsOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Contract Details</DialogTitle>
            <DialogDescription>
              Complete information about the selected contract.
            </DialogDescription>
          </DialogHeader>
          
          {selectedContract && (
            <div className="py-4">
              <div className="mb-4">
                <div className="text-sm text-maint-gray-500">Contract ID</div>
                <div className="font-medium">{selectedContract.id}</div>
              </div>
              
              <div className="mb-4">
                <div className="text-sm text-maint-gray-500">Name</div>
                <div className="font-medium">{selectedContract.name}</div>
              </div>
              
              <div className="mb-4">
                <div className="text-sm text-maint-gray-500">Client</div>
                <div className="font-medium">{selectedContract.client}</div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <div className="text-sm text-maint-gray-500">Start Date</div>
                  <div className="font-medium">{new Date(selectedContract.startDate).toLocaleDateString()}</div>
                </div>
                
                <div>
                  <div className="text-sm text-maint-gray-500">End Date</div>
                  <div className="font-medium">{new Date(selectedContract.endDate).toLocaleDateString()}</div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <div className="text-sm text-maint-gray-500">Budget</div>
                  <div className="font-medium">${selectedContract.budget.toLocaleString()}</div>
                </div>
                
                <div>
                  <div className="text-sm text-maint-gray-500">Spent</div>
                  <div className="font-medium">${selectedContract.spent.toLocaleString()}</div>
                </div>
              </div>
              
              <div className="mb-4">
                <div className="text-sm text-maint-gray-500">Utilization</div>
                <div className="w-full mt-2">
                  <div className="flex justify-between mb-1 text-xs">
                    <span>${selectedContract.spent.toLocaleString()}</span>
                    <span>{((selectedContract.spent / selectedContract.budget) * 100).toFixed(1)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        (selectedContract.spent / selectedContract.budget) > 0.9 
                          ? 'bg-red-500' 
                          : (selectedContract.spent / selectedContract.budget) > 0.7 
                            ? 'bg-yellow-500' 
                            : 'bg-maint-teal'
                      }`} 
                      style={{ width: `${Math.min((selectedContract.spent / selectedContract.budget) * 100, 100)}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <DialogFooter className="sm:justify-between">
            <Button variant="outline" onClick={() => setIsViewDetailsOpen(false)}>
              Close
            </Button>
            <Button 
              onClick={() => {
                setIsViewDetailsOpen(false);
                if (selectedContract) {
                  handleEditContract(selectedContract.id);
                }
              }}
            >
              <Edit className="h-4 w-4 mr-2" />
              Edit Contract
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Edit Contract Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Contract</DialogTitle>
            <DialogDescription>
              Update the contract details.
            </DialogDescription>
          </DialogHeader>
          
          {selectedContract && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <label className="text-right text-sm">Contract ID</label>
                <Input className="col-span-3" value={selectedContract.id} disabled />
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <label className="text-right text-sm">Contract Name</label>
                <Input
                  className="col-span-3"
                  value={selectedContract.name}
                  onChange={(e) => setSelectedContract({ ...selectedContract, name: e.target.value })}
                />
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <label className="text-right text-sm">Client</label>
                <Input
                  className="col-span-3"
                  value={selectedContract.client}
                  onChange={(e) => setSelectedContract({ ...selectedContract, client: e.target.value })}
                />
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <label className="text-right text-sm">Start Date</label>
                <Input
                  type="date"
                  className="col-span-3"
                  value={selectedContract.startDate}
                  onChange={(e) => setSelectedContract({ ...selectedContract, startDate: e.target.value })}
                />
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <label className="text-right text-sm">End Date</label>
                <Input
                  type="date"
                  className="col-span-3"
                  value={selectedContract.endDate}
                  onChange={(e) => setSelectedContract({ ...selectedContract, endDate: e.target.value })}
                />
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <label className="text-right text-sm">Budget ($)</label>
                <Input
                  type="number"
                  className="col-span-3"
                  value={selectedContract.budget}
                  onChange={(e) => setSelectedContract({ ...selectedContract, budget: Number(e.target.value) })}
                />
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <label className="text-right text-sm">Status</label>
                <select 
                  className="col-span-3 form-input"
                  value={selectedContract.status}
                  onChange={(e) => setSelectedContract({ ...selectedContract, status: e.target.value as Contract['status'] })}
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="expired">Expired</option>
                </select>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button className="bg-maint-blue hover:bg-blue-700" onClick={handleUpdateContract}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default ContractsPage;
