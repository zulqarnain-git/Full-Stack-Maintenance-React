
import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from '@/components/ui/table';
import { Download, FileText, BarChart3, CalendarDays, Filter, Printer } from 'lucide-react';

const ReportsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'budgets' | 'requests' | 'performance' | 'parts'>('budgets');
  const [dateRange, setDateRange] = useState<{ start: string; end: string }>({
    start: '2025-01-01',
    end: '2025-05-08',
  });
  
  // Mock data for different reports
  const budgetData = [
    { client: 'ABC Corporation', allocated: 50000, used: 12450, remaining: 37550 },
    { client: 'XYZ Industries', allocated: 75000, used: 18750, remaining: 56250 },
    { client: 'Global Logistics', allocated: 28000, used: 7000, remaining: 21000 },
    { client: 'Tech Solutions Inc', allocated: 60000, used: 21000, remaining: 39000 },
    { client: 'First National Bank', allocated: 45000, used: 32000, remaining: 13000 },
  ];
  
  const requestsData = [
    { region: 'Northern', total: 42, pending: 5, approved: 8, inProgress: 12, completed: 15, rejected: 2 },
    { region: 'Southern', total: 36, pending: 3, approved: 7, inProgress: 9, completed: 14, rejected: 3 },
    { region: 'Eastern', total: 29, pending: 4, approved: 5, inProgress: 7, completed: 11, rejected: 2 },
    { region: 'Western', total: 48, pending: 8, approved: 9, inProgress: 14, completed: 15, rejected: 2 },
    { region: 'Central', total: 34, pending: 5, approved: 6, inProgress: 8, completed: 12, rejected: 3 },
  ];
  
  const performanceData = [
    { representative: 'James Wilson', assigned: 25, completed: 18, onTime: 16, late: 2, rating: 4.8 },
    { representative: 'Maria Rodriguez', assigned: 22, completed: 20, onTime: 19, late: 1, rating: 4.9 },
    { representative: 'Samuel Johnson', assigned: 19, completed: 15, onTime: 12, late: 3, rating: 4.3 },
    { representative: 'Lisa Chen', assigned: 27, completed: 23, onTime: 21, late: 2, rating: 4.7 },
    { representative: 'David Kim', assigned: 21, completed: 18, onTime: 17, late: 1, rating: 4.6 },
  ];
  
  const partsData = [
    { part: 'Engine Oil Filter', requests: 42, totalCost: 2100 },
    { part: 'Air Filter', requests: 38, totalCost: 1520 },
    { part: 'Brake Pads', requests: 35, totalCost: 5250 },
    { part: 'Spark Plugs', requests: 32, totalCost: 1920 },
    { part: 'Fuel Filter', requests: 30, totalCost: 2400 },
    { part: 'Timing Belt', requests: 25, totalCost: 5000 },
    { part: 'Serpentine Belt', requests: 22, totalCost: 1980 },
    { part: 'Transmission Fluid', requests: 20, totalCost: 1600 },
    { part: 'Coolant', requests: 18, totalCost: 900 },
    { part: 'Windshield Wipers', requests: 15, totalCost: 750 },
  ];

  // Summary data
  const totalBudget = budgetData.reduce((sum, item) => sum + item.allocated, 0);
  const totalUsed = budgetData.reduce((sum, item) => sum + item.used, 0);
  const totalRequests = requestsData.reduce((sum, item) => sum + item.total, 0);
  const totalCompleted = requestsData.reduce((sum, item) => sum + item.completed, 0);

  const renderReportContent = () => {
    switch (activeTab) {
      case 'budgets':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="space-y-1">
                    <p className="text-sm text-maint-gray-500">Total Budget Allocated</p>
                    <p className="text-2xl font-bold">${totalBudget.toLocaleString()}</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="space-y-1">
                    <p className="text-sm text-maint-gray-500">Total Budget Used</p>
                    <p className="text-2xl font-bold">${totalUsed.toLocaleString()}</p>
                    <p className="text-xs text-maint-gray-500">{((totalUsed / totalBudget) * 100).toFixed(1)}% of total</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="space-y-1">
                    <p className="text-sm text-maint-gray-500">Average Utilization</p>
                    <p className="text-2xl font-bold">{((totalUsed / totalBudget) * 100).toFixed(1)}%</p>
                    <div className="w-full h-2 bg-gray-200 rounded-full mt-1">
                      <div 
                        className="h-2 bg-maint-blue rounded-full" 
                        style={{ width: `${(totalUsed / totalBudget) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Client</TableHead>
                  <TableHead>Budget Allocated</TableHead>
                  <TableHead>Budget Used</TableHead>
                  <TableHead>Remaining</TableHead>
                  <TableHead>Utilization</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {budgetData.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{item.client}</TableCell>
                    <TableCell>${item.allocated.toLocaleString()}</TableCell>
                    <TableCell>${item.used.toLocaleString()}</TableCell>
                    <TableCell>${item.remaining.toLocaleString()}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <span className="mr-2">{((item.used / item.allocated) * 100).toFixed(1)}%</span>
                        <div className="w-32 h-2 bg-gray-200 rounded-full">
                          <div 
                            className={`h-2 rounded-full ${
                              (item.used / item.allocated) > 0.8 ? 'bg-red-500' : 
                              (item.used / item.allocated) > 0.6 ? 'bg-yellow-500' : 'bg-maint-teal'
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
        );
      
      case 'requests':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="space-y-1">
                    <p className="text-sm text-maint-gray-500">Total Requests</p>
                    <p className="text-2xl font-bold">{totalRequests}</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="space-y-1">
                    <p className="text-sm text-maint-gray-500">Completion Rate</p>
                    <p className="text-2xl font-bold">{((totalCompleted / totalRequests) * 100).toFixed(1)}%</p>
                    <p className="text-xs text-maint-gray-500">{totalCompleted} completed of {totalRequests}</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="space-y-1">
                    <p className="text-sm text-maint-gray-500">Average Processing Time</p>
                    <p className="text-2xl font-bold">3.2 days</p>
                    <p className="text-xs text-maint-gray-500">From submission to completion</p>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Region</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Pending</TableHead>
                  <TableHead>Approved</TableHead>
                  <TableHead>In Progress</TableHead>
                  <TableHead>Completed</TableHead>
                  <TableHead>Rejected</TableHead>
                  <TableHead>Completion Rate</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {requestsData.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{item.region}</TableCell>
                    <TableCell>{item.total}</TableCell>
                    <TableCell>{item.pending}</TableCell>
                    <TableCell>{item.approved}</TableCell>
                    <TableCell>{item.inProgress}</TableCell>
                    <TableCell>{item.completed}</TableCell>
                    <TableCell>{item.rejected}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <span className="mr-2">{((item.completed / item.total) * 100).toFixed(1)}%</span>
                        <div className="w-24 h-2 bg-gray-200 rounded-full">
                          <div 
                            className="h-2 bg-maint-teal rounded-full" 
                            style={{ width: `${(item.completed / item.total) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        );
        
      case 'performance':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="space-y-1">
                    <p className="text-sm text-maint-gray-500">Total Representatives</p>
                    <p className="text-2xl font-bold">{performanceData.length}</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="space-y-1">
                    <p className="text-sm text-maint-gray-500">Average Rating</p>
                    <p className="text-2xl font-bold">
                      {(performanceData.reduce((sum, item) => sum + item.rating, 0) / performanceData.length).toFixed(1)}
                      <span className="text-yellow-500 ml-1">★</span>
                    </p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="space-y-1">
                    <p className="text-sm text-maint-gray-500">On-Time Completion</p>
                    <p className="text-2xl font-bold">
                      {((performanceData.reduce((sum, item) => sum + item.onTime, 0) / performanceData.reduce((sum, item) => sum + item.completed, 0)) * 100).toFixed(1)}%
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Representative</TableHead>
                  <TableHead>Assigned</TableHead>
                  <TableHead>Completed</TableHead>
                  <TableHead>On Time</TableHead>
                  <TableHead>Late</TableHead>
                  <TableHead>Completion Rate</TableHead>
                  <TableHead>Rating</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {performanceData.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{item.representative}</TableCell>
                    <TableCell>{item.assigned}</TableCell>
                    <TableCell>{item.completed}</TableCell>
                    <TableCell>{item.onTime}</TableCell>
                    <TableCell>{item.late}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <span className="mr-2">{((item.completed / item.assigned) * 100).toFixed(1)}%</span>
                        <div className="w-24 h-2 bg-gray-200 rounded-full">
                          <div 
                            className="h-2 bg-maint-blue rounded-full" 
                            style={{ width: `${(item.completed / item.assigned) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <span className="mr-1">{item.rating.toFixed(1)}</span>
                        <span className="text-yellow-500">★</span>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        );
      
      case 'parts':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="space-y-1">
                    <p className="text-sm text-maint-gray-500">Total Parts Requested</p>
                    <p className="text-2xl font-bold">{partsData.reduce((sum, item) => sum + item.requests, 0)}</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="space-y-1">
                    <p className="text-sm text-maint-gray-500">Total Parts Cost</p>
                    <p className="text-2xl font-bold">${partsData.reduce((sum, item) => sum + item.totalCost, 0).toLocaleString()}</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="space-y-1">
                    <p className="text-sm text-maint-gray-500">Average Cost Per Request</p>
                    <p className="text-2xl font-bold">
                      ${(partsData.reduce((sum, item) => sum + item.totalCost, 0) / partsData.reduce((sum, item) => sum + item.requests, 0)).toFixed(2)}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Part Name</TableHead>
                  <TableHead>Number of Requests</TableHead>
                  <TableHead>Total Cost</TableHead>
                  <TableHead>Average Cost Per Request</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {partsData.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{item.part}</TableCell>
                    <TableCell>{item.requests}</TableCell>
                    <TableCell>${item.totalCost.toLocaleString()}</TableCell>
                    <TableCell>${(item.totalCost / item.requests).toFixed(2)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <DashboardLayout userRole="admin">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-maint-gray-800">Reports & Analytics</h2>
        <p className="text-maint-gray-600">View and download detailed reports on maintenance operations</p>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 gap-4">
          <div className="flex flex-wrap gap-2">
            <Button
              variant={activeTab === 'budgets' ? 'default' : 'outline'}
              onClick={() => setActiveTab('budgets')}
              className={activeTab === 'budgets' ? 'bg-maint-blue hover:bg-blue-700' : ''}
            >
              <BarChart3 className="h-4 w-4 mr-2" />
              Budget Reports
            </Button>
            
            <Button
              variant={activeTab === 'requests' ? 'default' : 'outline'}
              onClick={() => setActiveTab('requests')}
              className={activeTab === 'requests' ? 'bg-maint-blue hover:bg-blue-700' : ''}
            >
              <FileText className="h-4 w-4 mr-2" />
              Request Reports
            </Button>
            
            <Button
              variant={activeTab === 'performance' ? 'default' : 'outline'}
              onClick={() => setActiveTab('performance')}
              className={activeTab === 'performance' ? 'bg-maint-blue hover:bg-blue-700' : ''}
            >
              <BarChart3 className="h-4 w-4 mr-2" />
              Performance Reports
            </Button>
            
            <Button
              variant={activeTab === 'parts' ? 'default' : 'outline'}
              onClick={() => setActiveTab('parts')}
              className={activeTab === 'parts' ? 'bg-maint-blue hover:bg-blue-700' : ''}
            >
              <BarChart3 className="h-4 w-4 mr-2" />
              Parts Reports
            </Button>
          </div>
          
          <div className="flex flex-wrap gap-3">
            <div className="flex gap-2 items-center">
              <CalendarDays className="h-4 w-4 text-maint-gray-500" />
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
            
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
            
            <Button className="bg-maint-blue hover:bg-blue-700">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            
            <Button variant="outline">
              <Printer className="h-4 w-4 mr-2" />
              Print
            </Button>
          </div>
        </div>
        
        <div className="mt-6">
          <Card>
            <CardHeader className="pb-3 border-b">
              <CardTitle className="text-xl">
                {activeTab === 'budgets' && 'Budget Utilization Report'}
                {activeTab === 'requests' && 'Maintenance Requests Report'}
                {activeTab === 'performance' && 'Representative Performance Report'}
                {activeTab === 'parts' && 'Parts Usage Report'}
              </CardTitle>
              <p className="text-sm text-maint-gray-500">
                Period: {new Date(dateRange.start).toLocaleDateString()} - {new Date(dateRange.end).toLocaleDateString()}
              </p>
            </CardHeader>
            <CardContent className="pt-6">
              {renderReportContent()}
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ReportsPage;
