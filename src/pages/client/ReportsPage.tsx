
import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from '@/components/ui/table';
import { Download, FileText, Calendar, DollarSign, BarChart3, Printer } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ClientReportsPage: React.FC = () => {
  const { toast } = useToast();
  const [dateRange, setDateRange] = useState<{ start: string; end: string }>({
    start: '2025-01-01',
    end: '2025-05-08',
  });
  
  // Mock data for client's reports
  const budgetData = [
    { month: 'January', allocated: 1500, used: 950, savings: 550 },
    { month: 'February', allocated: 1500, used: 1200, savings: 300 },
    { month: 'March', allocated: 1500, used: 1100, savings: 400 },
    { month: 'April', allocated: 1500, used: 1450, savings: 50 },
    { month: 'May', allocated: 1500, used: 450, savings: 1050 },
  ];
  
  const vehicleData = [
    { 
      vehicle: 'Toyota Hilux', 
      code: 'ABC-1234', 
      requests: 8,
      totalCost: 5450,
      lastMaintenance: '2025-04-15',
      status: 'Good'
    },
    { 
      vehicle: 'Ford Ranger', 
      code: 'XYZ-5678', 
      requests: 5,
      totalCost: 3200,
      lastMaintenance: '2025-03-20',
      status: 'Good'
    },
    { 
      vehicle: 'Nissan Navara', 
      code: 'DEF-9012', 
      requests: 3,
      totalCost: 1850,
      lastMaintenance: '2025-02-12',
      status: 'Needs Attention'
    },
    { 
      vehicle: 'Toyota Land Cruiser', 
      code: 'GHI-3456', 
      requests: 4,
      totalCost: 2800,
      lastMaintenance: '2025-05-02',
      status: 'Good'
    },
  ];
  
  const partsData = [
    { part: 'Engine Oil Filter', count: 12, cost: 600 },
    { part: 'Air Filter', count: 8, cost: 320 },
    { part: 'Brake Pads', count: 7, cost: 1050 },
    { part: 'Spark Plugs', count: 16, cost: 960 },
    { part: 'Fuel Filter', count: 5, cost: 400 },
    { part: 'Timing Belt', count: 2, cost: 400 },
    { part: 'Transmission Fluid', count: 4, cost: 320 },
    { part: 'Coolant', count: 6, cost: 300 },
  ];

  // Summary data
  const totalBudget = budgetData.reduce((sum, item) => sum + item.allocated, 0);
  const totalUsed = budgetData.reduce((sum, item) => sum + item.used, 0);
  const totalRequests = vehicleData.reduce((sum, item) => sum + item.requests, 0);
  const totalParts = partsData.reduce((sum, item) => sum + item.count, 0);

  const handleDownloadReport = (format: 'pdf' | 'csv') => {
    toast({
      title: `Report Downloaded`,
      description: `Your report has been downloaded in ${format.toUpperCase()} format.`,
    });
    // In a real app, this would trigger a download
  };
  
  const handlePrintReport = () => {
    toast({
      title: "Printing Report",
      description: "Your report has been sent to the printer.",
    });
    // In a real app, this would open the print dialog
    window.print();
  };
  
  const handleExportDetailedData = () => {
    // Open dialog with export options
    toast({
      title: "Data Exported",
      description: "Your data has been exported successfully.",
    });
  };
  
  // Chart data transformation for budget utilization
  const budgetChartData = budgetData.map(item => ({
    month: item.month,
    Allocated: item.allocated,
    Used: item.used,
    Savings: item.savings
  }));

  return (
    <DashboardLayout userRole="client">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-maint-gray-800">Reports & Analysis</h2>
        <p className="text-maint-gray-600">View and download your maintenance data and history</p>
      </div>
      
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
        <div className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-maint-gray-500" />
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
        </div>
        
        <div className="flex gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-maint-blue hover:bg-blue-700">
                <Download className="h-4 w-4 mr-2" />
                Export as PDF
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Export Report as PDF</DialogTitle>
                <DialogDescription>
                  Choose the sections you want to include in your exported report.
                </DialogDescription>
              </DialogHeader>
              <div className="py-4">
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input type="checkbox" id="budget" className="mr-2" defaultChecked />
                    <label htmlFor="budget">Budget Information</label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="vehicles" className="mr-2" defaultChecked />
                    <label htmlFor="vehicles">Vehicle Maintenance</label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="parts" className="mr-2" defaultChecked />
                    <label htmlFor="parts">Parts Usage</label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="requests" className="mr-2" defaultChecked />
                    <label htmlFor="requests">Service Requests</label>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => {}}>
                  Cancel
                </Button>
                <Button className="bg-maint-blue hover:bg-blue-700" onClick={() => handleDownloadReport('pdf')}>
                  <Download className="h-4 w-4 mr-2" />
                  Download PDF
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          
          <Button variant="outline" onClick={() => handleDownloadReport('csv')}>
            <FileText className="h-4 w-4 mr-2" />
            Export as CSV
          </Button>
          
          <Button variant="outline" onClick={handlePrintReport}>
            <Printer className="h-4 w-4 mr-2" />
            Print Report
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-maint-gray-500">Total Budget</p>
                <p className="text-2xl font-bold">${totalBudget.toLocaleString()}</p>
                <p className="text-xs text-maint-gray-500">Year to date</p>
              </div>
              <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-maint-blue" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-maint-gray-500">Total Spent</p>
                <p className="text-2xl font-bold">${totalUsed.toLocaleString()}</p>
                <p className="text-xs text-maint-gray-500">{((totalUsed / totalBudget) * 100).toFixed(1)}% of budget</p>
              </div>
              <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
                <BarChart3 className="h-6 w-6 text-maint-teal" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-maint-gray-500">Total Requests</p>
                <p className="text-2xl font-bold">{totalRequests}</p>
                <p className="text-xs text-maint-gray-500">All vehicles</p>
              </div>
              <div className="h-12 w-12 bg-yellow-100 rounded-full flex items-center justify-center">
                <FileText className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-maint-gray-500">Parts Used</p>
                <p className="text-2xl font-bold">{totalParts}</p>
                <p className="text-xs text-maint-gray-500">Across all requests</p>
              </div>
              <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center">
                <BarChart3 className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Budget Utilization</CardTitle>
              <Button variant="outline" size="sm" onClick={handleExportDetailedData}>
                <Download className="h-4 w-4 mr-1" />
                Export
              </Button>
            </CardHeader>
            <CardContent>
              <div className="h-60">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={budgetChartData}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="Allocated" fill="#3f83f8" />
                    <Bar dataKey="Used" fill="#16bdca" />
                    <Bar dataKey="Savings" fill="#84e1bc" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              
              <div className="mt-6">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Month</TableHead>
                      <TableHead>Allocated</TableHead>
                      <TableHead>Used</TableHead>
                      <TableHead>Savings</TableHead>
                      <TableHead>Utilization</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {budgetData.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{item.month}</TableCell>
                        <TableCell>${item.allocated}</TableCell>
                        <TableCell>${item.used}</TableCell>
                        <TableCell>${item.savings}</TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <span className="mr-2">{((item.used / item.allocated) * 100).toFixed(1)}%</span>
                            <div className="w-24 h-2 bg-gray-200 rounded-full">
                              <div 
                                className={`h-2 rounded-full ${
                                  (item.used / item.allocated) > 0.9 ? 'bg-red-500' : 
                                  (item.used / item.allocated) > 0.7 ? 'bg-yellow-500' : 'bg-maint-teal'
                                }`}
                                style={{ width: `${(item.used / item.allocated) * 100}%` }}
                              ></div>
                            </div>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="lg:col-span-2">
          <Card className="mb-6">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Vehicle Maintenance</CardTitle>
              <Button variant="outline" size="sm" onClick={handleExportDetailedData}>
                <Download className="h-4 w-4 mr-1" />
                Export
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {vehicleData.map((vehicle, index) => (
                  <div key={index} className="p-4 border rounded-md">
                    <div className="flex justify-between mb-2">
                      <h4 className="font-medium">{vehicle.vehicle}</h4>
                      <span className="text-xs px-2 py-1 rounded-full bg-gray-100">{vehicle.code}</span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <p className="text-maint-gray-500">Requests</p>
                        <p className="font-medium">{vehicle.requests}</p>
                      </div>
                      <div>
                        <p className="text-maint-gray-500">Total Cost</p>
                        <p className="font-medium">${vehicle.totalCost}</p>
                      </div>
                      <div>
                        <p className="text-maint-gray-500">Last Service</p>
                        <p className="font-medium">{new Date(vehicle.lastMaintenance).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <p className="text-maint-gray-500">Status</p>
                        <p className={`font-medium ${vehicle.status === 'Good' ? 'text-maint-teal' : 'text-yellow-600'}`}>
                          {vehicle.status}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Most Requested Parts</CardTitle>
              <Button variant="outline" size="sm" onClick={handleExportDetailedData}>
                <Download className="h-4 w-4 mr-1" />
                Export
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Part</TableHead>
                    <TableHead>Count</TableHead>
                    <TableHead>Cost</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {partsData.slice(0, 5).map((item, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{item.part}</TableCell>
                      <TableCell>{item.count}</TableCell>
                      <TableCell>${item.cost}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ClientReportsPage;
