
import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from '@/components/ui/table';
import { Download, Calendar, Clock, CheckCircle, FileText, Printer, BarChart3 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
         LineChart, Line, PieChart, Pie, Cell } from 'recharts';

const RepresentativeReportsPage: React.FC = () => {
  const { toast } = useToast();
  const [dateRange, setDateRange] = useState<{ start: string; end: string }>({
    start: '2025-01-01',
    end: '2025-05-08',
  });

  // Mock data for representative's reports
  const performanceData = [
    { week: 'Week 1', completed: 12, onTime: 10, satisfaction: 4.5 },
    { week: 'Week 2', completed: 15, onTime: 13, satisfaction: 4.7 },
    { week: 'Week 3', completed: 11, onTime: 9, satisfaction: 4.2 },
    { week: 'Week 4', completed: 14, onTime: 12, satisfaction: 4.8 },
  ];

  const requestsData = [
    { 
      id: 'REQ-2025-053',
      client: 'ABC Corporation',
      vehicle: 'Toyota Hilux (ABC-1234)',
      type: 'Regular Maintenance',
      date: '2025-05-05',
      duration: 3.5,
      status: 'completed',
    },
    { 
      id: 'REQ-2025-049',
      client: 'XYZ Industries',
      vehicle: 'Ford Ranger (XYZ-5678)',
      type: 'Repair',
      date: '2025-05-03',
      duration: 5.0,
      status: 'completed',
    },
    { 
      id: 'REQ-2025-048',
      client: 'Tech Solutions Inc',
      vehicle: 'Toyota Land Cruiser (TEC-012)',
      type: 'Emergency Repair',
      date: '2025-05-02',
      duration: 2.5,
      status: 'completed',
    },
    { 
      id: 'REQ-2025-045',
      client: 'Global Logistics',
      vehicle: 'Nissan Navara (GLO-789)',
      type: 'Routine Inspection',
      date: '2025-05-01',
      duration: 1.0,
      status: 'completed',
    },
    { 
      id: 'REQ-2025-042',
      client: 'First National Bank',
      vehicle: 'Mercedes Sprinter (FNB-345)',
      type: 'Regular Maintenance',
      date: '2025-04-30',
      duration: 3.0,
      status: 'completed',
    },
  ];

  const serviceTypesData = [
    { name: 'Regular Maintenance', value: 45 },
    { name: 'Repairs', value: 30 },
    { name: 'Emergency Repairs', value: 15 },
    { name: 'Inspections', value: 10 },
  ];

  const hoursData = [
    { date: '05-01', hours: 6.5 },
    { date: '05-02', hours: 8.0 },
    { date: '05-03', hours: 7.5 },
    { date: '05-04', hours: 0 },
    { date: '05-05', hours: 9.0 },
    { date: '05-06', hours: 8.5 },
    { date: '05-07', hours: 7.0 },
    { date: '05-08', hours: 6.0 },
  ];

  const feedbackData = [
    {
      client: 'ABC Corporation',
      date: '2025-05-04',
      rating: 5,
      comment: 'Excellent service, very thorough and professional.'
    },
    {
      client: 'XYZ Industries',
      date: '2025-05-02',
      rating: 4,
      comment: 'Good work, completed on time.'
    },
    {
      client: 'Tech Solutions Inc',
      date: '2025-04-30',
      rating: 5,
      comment: 'Great attention to detail and solved the issue quickly.'
    },
  ];

  // Calculate summary statistics
  const totalRequests = requestsData.length;
  const totalHours = requestsData.reduce((sum, item) => sum + item.duration, 0);
  const avgRating = feedbackData.reduce((sum, item) => sum + item.rating, 0) / feedbackData.length;
  const completionRate = performanceData.reduce((sum, item) => sum + item.onTime, 0) / 
                      performanceData.reduce((sum, item) => sum + item.completed, 0) * 100;

  // Colors for pie chart
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  const handlePrint = () => {
    toast({
      title: "Printing Report",
      description: "Your report has been sent to the printer.",
    });
    window.print();
  };

  const handleExport = (format: 'pdf' | 'csv') => {
    toast({
      title: `Report Downloaded`,
      description: `Your report has been downloaded in ${format.toUpperCase()} format.`,
    });
  };

  return (
    <DashboardLayout userRole="representative">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-maint-gray-800">Work Reports</h2>
        <p className="text-maint-gray-600">View and analyze your performance and work history</p>
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
          <Button className="bg-maint-blue hover:bg-blue-700" onClick={() => handleExport('pdf')}>
            <Download className="h-4 w-4 mr-2" />
            Export as PDF
          </Button>
          <Button variant="outline" onClick={() => handleExport('csv')}>
            <FileText className="h-4 w-4 mr-2" />
            Export as CSV
          </Button>
          <Button variant="outline" onClick={handlePrint}>
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
                <p className="text-sm text-maint-gray-500">Completed Requests</p>
                <p className="text-2xl font-bold">{totalRequests}</p>
                <p className="text-xs text-maint-gray-500">Last 30 days</p>
              </div>
              <div className="h-12 w-12 bg-maint-blue bg-opacity-10 rounded-full flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-maint-blue" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-maint-gray-500">Total Hours</p>
                <p className="text-2xl font-bold">{totalHours.toFixed(1)}</p>
                <p className="text-xs text-maint-gray-500">Worked hours</p>
              </div>
              <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
                <Clock className="h-6 w-6 text-maint-teal" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-maint-gray-500">On-Time Completion</p>
                <p className="text-2xl font-bold">{completionRate.toFixed(0)}%</p>
                <p className="text-xs text-maint-gray-500">Requests completed on schedule</p>
              </div>
              <div className="h-12 w-12 bg-yellow-100 rounded-full flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-maint-gray-500">Average Rating</p>
                <p className="text-2xl font-bold">{avgRating.toFixed(1)}/5</p>
                <p className="text-xs text-maint-gray-500">Client satisfaction rating</p>
              </div>
              <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center">
                <BarChart3 className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="performance" className="space-y-6">
        <TabsList className="bg-maint-gray-100 p-1">
          <TabsTrigger value="performance" className="data-[state=active]:bg-white rounded-md">
            Performance
          </TabsTrigger>
          <TabsTrigger value="requests" className="data-[state=active]:bg-white">
            Request History
          </TabsTrigger>
          <TabsTrigger value="hours" className="data-[state=active]:bg-white">
            Hours & Utilization
          </TabsTrigger>
          <TabsTrigger value="feedback" className="data-[state=active]:bg-white">
            Client Feedback
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="performance" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Weekly Performance</CardTitle>
                <CardDescription>Completed requests and on-time performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={performanceData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="week" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="completed" name="Completed Requests" fill="#3f83f8" />
                      <Bar dataKey="onTime" name="On-Time Completion" fill="#16bdca" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Service Types</CardTitle>
                <CardDescription>Breakdown of service request types</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={serviceTypesData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {serviceTypesData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="mt-4">
                  <div className="grid grid-cols-2 gap-2">
                    {serviceTypesData.map((entry, index) => (
                      <div key={`legend-${index}`} className="flex items-center">
                        <span
                          className="w-3 h-3 mr-1 rounded-full"
                          style={{ backgroundColor: COLORS[index % COLORS.length] }}
                        ></span>
                        <span className="text-xs">{entry.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="lg:col-span-3">
              <CardHeader>
                <CardTitle>Client Satisfaction Rating Trend</CardTitle>
                <CardDescription>Average rating by week</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={performanceData}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="week" />
                      <YAxis domain={[0, 5]} />
                      <Tooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="satisfaction"
                        name="Satisfaction Rating"
                        stroke="#8884d8"
                        activeDot={{ r: 8 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="requests" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Service Requests</CardTitle>
              <CardDescription>History of your completed service requests</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Request ID</TableHead>
                    <TableHead>Client</TableHead>
                    <TableHead>Vehicle</TableHead>
                    <TableHead>Service Type</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Hours</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {requestsData.map((request) => (
                    <TableRow key={request.id}>
                      <TableCell className="font-mono text-sm">{request.id}</TableCell>
                      <TableCell>{request.client}</TableCell>
                      <TableCell>{request.vehicle}</TableCell>
                      <TableCell>{request.type}</TableCell>
                      <TableCell>{new Date(request.date).toLocaleDateString()}</TableCell>
                      <TableCell>{request.duration.toFixed(1)}</TableCell>
                      <TableCell>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Completed
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              
              <div className="mt-4 flex justify-end">
                <Button variant="outline">
                  View All Requests
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Request Completion Time</CardTitle>
                <CardDescription>Average time spent by request type</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span>Regular Maintenance</span>
                      <span className="font-semibold">3.25 hrs</span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 rounded-full">
                      <div className="h-2 rounded-full bg-maint-blue" style={{ width: '65%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span>Repairs</span>
                      <span className="font-semibold">5.00 hrs</span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 rounded-full">
                      <div className="h-2 rounded-full bg-maint-blue" style={{ width: '100%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span>Emergency Repairs</span>
                      <span className="font-semibold">2.50 hrs</span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 rounded-full">
                      <div className="h-2 rounded-full bg-maint-blue" style={{ width: '50%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span>Routine Inspection</span>
                      <span className="font-semibold">1.00 hrs</span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 rounded-full">
                      <div className="h-2 rounded-full bg-maint-blue" style={{ width: '20%' }}></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Request Locations</CardTitle>
                <CardDescription>Distribution of service requests by location</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-maint-gray-100 rounded-lg flex items-center justify-center">
                  <p className="text-maint-gray-500">Map view showing request locations</p>
                </div>
                
                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div className="bg-maint-gray-50 p-3 rounded-md">
                    <p className="font-medium">North Region</p>
                    <p className="text-2xl font-bold">8</p>
                    <p className="text-xs text-maint-gray-500">Requests</p>
                  </div>
                  <div className="bg-maint-gray-50 p-3 rounded-md">
                    <p className="font-medium">South Region</p>
                    <p className="text-2xl font-bold">5</p>
                    <p className="text-xs text-maint-gray-500">Requests</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="hours" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Daily Hours</CardTitle>
              <CardDescription>Hours logged for the past week</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={hoursData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis domain={[0, 10]} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="hours" name="Hours Worked" fill="#3f83f8" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              
              <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-4">Weekly Summary</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Total Hours:</span>
                      <span className="font-semibold">52.5</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Average Daily:</span>
                      <span className="font-semibold">7.5</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Overtime:</span>
                      <span className="font-semibold">2.5</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Efficiency Rate:</span>
                      <span className="font-semibold">92%</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-4">Time Utilization</h4>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm">Service Time</span>
                        <span className="text-sm font-semibold">75%</span>
                      </div>
                      <div className="w-full h-2 bg-gray-200 rounded-full">
                        <div className="h-2 rounded-full bg-maint-teal" style={{ width: '75%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm">Travel Time</span>
                        <span className="text-sm font-semibold">15%</span>
                      </div>
                      <div className="w-full h-2 bg-gray-200 rounded-full">
                        <div className="h-2 rounded-full bg-yellow-500" style={{ width: '15%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm">Administrative</span>
                        <span className="text-sm font-semibold">10%</span>
                      </div>
                      <div className="w-full h-2 bg-gray-200 rounded-full">
                        <div className="h-2 rounded-full bg-blue-500" style={{ width: '10%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="feedback" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Client Feedback</CardTitle>
              <CardDescription>Recent feedback from clients</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {feedbackData.map((feedback, index) => (
                  <div key={index} className="bg-maint-gray-50 p-4 rounded-lg">
                    <div className="flex justify-between mb-2">
                      <h4 className="font-medium">{feedback.client}</h4>
                      <span className="text-sm text-maint-gray-500">
                        {new Date(feedback.date).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center mb-3">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className={`text-lg ${i < feedback.rating ? 'text-yellow-500' : 'text-gray-300'}`}>
                            ★
                          </span>
                        ))}
                      </div>
                      <span className="ml-2 font-semibold">{feedback.rating}/5</span>
                    </div>
                    <p className="text-sm text-maint-gray-600">"{feedback.comment}"</p>
                  </div>
                ))}
                
                <div className="pt-4">
                  <Button variant="outline" className="w-full">
                    View All Feedback
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Rating Distribution</CardTitle>
                <CardDescription>Breakdown of ratings received</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <div className="flex items-center">
                        <span className="text-yellow-500 text-lg mr-1">★★★★★</span>
                        <span>(5 stars)</span>
                      </div>
                      <span className="font-semibold">65%</span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 rounded-full">
                      <div className="h-2 rounded-full bg-maint-teal" style={{ width: '65%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <div className="flex items-center">
                        <span className="text-yellow-500 text-lg mr-1">★★★★</span>
                        <span className="text-gray-300">★</span>
                        <span className="ml-1">(4 stars)</span>
                      </div>
                      <span className="font-semibold">25%</span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 rounded-full">
                      <div className="h-2 rounded-full bg-maint-teal" style={{ width: '25%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <div className="flex items-center">
                        <span className="text-yellow-500 text-lg mr-1">★★★</span>
                        <span className="text-gray-300">★★</span>
                        <span className="ml-1">(3 stars)</span>
                      </div>
                      <span className="font-semibold">10%</span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 rounded-full">
                      <div className="h-2 rounded-full bg-maint-teal" style={{ width: '10%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <div className="flex items-center">
                        <span className="text-yellow-500 text-lg mr-1">★★</span>
                        <span className="text-gray-300">★★★</span>
                        <span className="ml-1">(2 stars)</span>
                      </div>
                      <span className="font-semibold">0%</span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 rounded-full">
                      <div className="h-2 rounded-full bg-maint-teal" style={{ width: '0%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <div className="flex items-center">
                        <span className="text-yellow-500 text-lg mr-1">★</span>
                        <span className="text-gray-300">★★★★</span>
                        <span className="ml-1">(1 star)</span>
                      </div>
                      <span className="font-semibold">0%</span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 rounded-full">
                      <div className="h-2 rounded-full bg-maint-teal" style={{ width: '0%' }}></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Performance Metrics</CardTitle>
                <CardDescription>Key performance indicators</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-maint-gray-50 p-4 rounded-md text-center">
                      <p className="text-sm text-maint-gray-500">Response Time</p>
                      <p className="text-xl font-bold text-maint-blue">24 min</p>
                      <p className="text-xs text-green-600">⬆ 15% better than average</p>
                    </div>
                    
                    <div className="bg-maint-gray-50 p-4 rounded-md text-center">
                      <p className="text-sm text-maint-gray-500">First-Time Fix</p>
                      <p className="text-xl font-bold text-maint-blue">92%</p>
                      <p className="text-xs text-green-600">⬆ 7% better than average</p>
                    </div>
                    
                    <div className="bg-maint-gray-50 p-4 rounded-md text-center">
                      <p className="text-sm text-maint-gray-500">Customer Retention</p>
                      <p className="text-xl font-bold text-maint-blue">98%</p>
                      <p className="text-xs text-green-600">⬆ 3% better than average</p>
                    </div>
                    
                    <div className="bg-maint-gray-50 p-4 rounded-md text-center">
                      <p className="text-sm text-maint-gray-500">Parts Usage</p>
                      <p className="text-xl font-bold text-maint-blue">Optimal</p>
                      <p className="text-xs text-green-600">⬆ 10% more efficient</p>
                    </div>
                  </div>
                  
                  <div className="pt-4">
                    <Button variant="outline" className="w-full" onClick={() => handleExport('pdf')}>
                      Download Performance Report
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default RepresentativeReportsPage;
