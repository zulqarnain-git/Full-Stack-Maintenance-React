
import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import { Calendar as CalendarIcon, Clock, MapPin, ArrowRight, Check, Plus, ChevronLeft, ChevronRight, Filter, Download, Edit } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';

interface ScheduleEvent {
  id: string;
  title: string;
  time: string;
  client: string;
  location: string;
  requestId?: string;
  type: 'delivery' | 'installation' | 'inspection' | 'parts-pickup' | 'meeting';
  completed: boolean;
}

interface ScheduleDay {
  date: string;
  events: ScheduleEvent[];
}

// Mock data for the representative's schedule
const initialSchedule: ScheduleDay[] = [
  {
    date: '2025-05-08',
    events: [
      {
        id: 'EVT-001',
        title: 'Parts Pickup',
        time: '09:00',
        client: 'ABC Corporation',
        location: 'Supplier Warehouse',
        requestId: 'REQ-2025-044',
        type: 'parts-pickup',
        completed: false,
      },
      {
        id: 'EVT-002',
        title: 'Deliver and Install Parts',
        time: '11:30',
        client: 'XYZ Industries',
        location: 'Site B, Northern Region',
        requestId: 'REQ-2025-043',
        type: 'delivery',
        completed: false,
      },
      {
        id: 'EVT-003',
        title: 'Installation Inspection',
        time: '14:00',
        client: 'Global Logistics',
        location: 'Distribution Center',
        requestId: 'REQ-2025-042',
        type: 'installation',
        completed: false,
      }
    ]
  },
  {
    date: '2025-05-09',
    events: [
      {
        id: 'EVT-004',
        title: 'Weekly Team Meeting',
        time: '09:30',
        client: 'Internal',
        location: 'Regional Office',
        type: 'meeting',
        completed: false,
      },
      {
        id: 'EVT-005',
        title: 'Parts Delivery',
        time: '11:00',
        client: 'Tech Solutions Inc',
        location: 'Regional HQ',
        requestId: 'REQ-2025-041',
        type: 'delivery',
        completed: false,
      },
      {
        id: 'EVT-006',
        title: 'Installation Check',
        time: '15:30',
        client: 'ABC Corporation',
        location: 'Main Office',
        requestId: 'REQ-2025-044',
        type: 'inspection',
        completed: false,
      }
    ]
  },
  {
    date: '2025-05-10',
    events: [
      {
        id: 'EVT-007',
        title: 'Parts Pickup',
        time: '10:00',
        client: 'First National Bank',
        location: 'Supplier Warehouse',
        requestId: 'REQ-2025-040',
        type: 'parts-pickup',
        completed: false,
      }
    ]
  },
  {
    date: '2025-05-11',
    events: []
  },
  {
    date: '2025-05-12',
    events: [
      {
        id: 'EVT-008',
        title: 'Installation',
        time: '09:30',
        client: 'First National Bank',
        location: 'Branch Office',
        requestId: 'REQ-2025-040',
        type: 'installation',
        completed: false,
      },
      {
        id: 'EVT-009',
        title: 'Monthly Review',
        time: '14:00',
        client: 'Internal',
        location: 'Regional Office',
        type: 'meeting',
        completed: false,
      }
    ]
  },
  {
    date: '2025-05-13',
    events: [
      {
        id: 'EVT-010',
        title: 'Maintenance Inspection',
        time: '11:00',
        client: 'Global Logistics',
        location: 'Distribution Center',
        requestId: 'REQ-2025-042',
        type: 'inspection',
        completed: false,
      }
    ]
  },
  {
    date: '2025-05-14',
    events: [
      {
        id: 'EVT-011',
        title: 'Parts Delivery',
        time: '10:30',
        client: 'Tech Solutions Inc',
        location: 'Regional HQ',
        requestId: 'REQ-2025-041',
        type: 'delivery',
        completed: false,
      }
    ]
  }
];

// Helper function to get day of week
const getDayOfWeek = (dateString: string) => {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const date = new Date(dateString);
  return days[date.getDay()];
};

// Helper function to format date
const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

// Helper function for event type label and color
const getEventTypeInfo = (type: string) => {
  switch (type) {
    case 'delivery':
      return { label: 'Delivery', bgColor: 'bg-blue-100', textColor: 'text-blue-800' };
    case 'installation':
      return { label: 'Installation', bgColor: 'bg-purple-100', textColor: 'text-purple-800' };
    case 'inspection':
      return { label: 'Inspection', bgColor: 'bg-maint-teal bg-opacity-20', textColor: 'text-maint-teal' };
    case 'parts-pickup':
      return { label: 'Parts Pickup', bgColor: 'bg-yellow-100', textColor: 'text-yellow-800' };
    case 'meeting':
      return { label: 'Meeting', bgColor: 'bg-gray-100', textColor: 'text-gray-800' };
    default:
      return { label: 'Other', bgColor: 'bg-gray-100', textColor: 'text-gray-800' };
  }
};

const SchedulePage: React.FC = () => {
  const { toast } = useToast();
  const [schedule, setSchedule] = useState<ScheduleDay[]>(initialSchedule);
  const [currentWeekStart, setCurrentWeekStart] = useState<Date>(new Date('2025-05-08'));
  
  // New state for event management
  const [isNewEventDialogOpen, setIsNewEventDialogOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [newEvent, setNewEvent] = useState<{
    title: string;
    time: string;
    client: string;
    location: string;
    type: 'delivery' | 'installation' | 'inspection' | 'parts-pickup' | 'meeting';
  }>({
    title: '',
    time: '09:00',
    client: '',
    location: '',
    type: 'delivery',
  });

  const markEventCompleted = (dayIndex: number, eventId: string) => {
    const newSchedule = [...schedule];
    const eventIndex = newSchedule[dayIndex].events.findIndex(event => event.id === eventId);
    
    if (eventIndex !== -1) {
      newSchedule[dayIndex].events[eventIndex].completed = true;
      setSchedule(newSchedule);
      
      toast({
        title: "Event Completed",
        description: `${newSchedule[dayIndex].events[eventIndex].title} has been marked as completed.`,
      });
    }
  };

  const navigateWeek = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentWeekStart);
    if (direction === 'prev') {
      newDate.setDate(newDate.getDate() - 7);
    } else {
      newDate.setDate(newDate.getDate() + 7);
    }
    setCurrentWeekStart(newDate);
    
    // In a real app, this would fetch data for the new week
    toast({
      title: "Calendar Navigation",
      description: `Navigated to ${direction === 'prev' ? 'previous' : 'next'} week`,
    });
  };

  const handleAddEvent = () => {
    if (!selectedDate) return;
    
    const formattedDate = selectedDate.toISOString().split('T')[0];
    const dayIndex = schedule.findIndex(day => day.date === formattedDate);
    
    if (dayIndex === -1) {
      // Create a new day if it doesn't exist
      const newDay: ScheduleDay = {
        date: formattedDate,
        events: [
          {
            id: `EVT-${Math.floor(Math.random() * 1000)}`,
            ...newEvent,
            completed: false
          }
        ]
      };
      setSchedule([...schedule, newDay].sort((a, b) => a.date.localeCompare(b.date)));
    } else {
      // Add to existing day
      const updatedSchedule = [...schedule];
      updatedSchedule[dayIndex].events.push({
        id: `EVT-${Math.floor(Math.random() * 1000)}`,
        ...newEvent,
        completed: false
      });
      setSchedule(updatedSchedule);
    }
    
    // Reset form and close dialog
    setNewEvent({
      title: '',
      time: '09:00',
      client: '',
      location: '',
      type: 'delivery',
    });
    setIsNewEventDialogOpen(false);
    
    toast({
      title: "Event Added",
      description: `New event "${newEvent.title}" added to schedule.`,
    });
  };

  // Calculate week dates
  const weekDates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(currentWeekStart);
    date.setDate(date.getDate() + i);
    return date.toISOString().split('T')[0];
  });

  // Get upcoming events (events for today and future dates)
  const today = new Date().toISOString().split('T')[0];
  const upcomingEvents = schedule
    .flatMap(day => day.events.map(event => ({ ...event, date: day.date })))
    .filter(event => event.date >= today && !event.completed)
    .sort((a, b) => {
      if (a.date !== b.date) return a.date > b.date ? 1 : -1;
      return a.time > b.time ? 1 : -1;
    })
    .slice(0, 5);

  const handleExportSchedule = () => {
    // In a real app, this would generate a file for download
    toast({
      title: "Schedule Exported",
      description: "Your schedule has been exported to PDF format.",
    });
  };

  const handleFilterEvents = () => {
    // In a real app, this would show a filter dialog or dropdown
    toast({
      title: "Filter Events",
      description: "Event filtering functionality would appear here.",
    });
  };

  return (
    <DashboardLayout userRole="representative">
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <div>
          <h2 className="text-2xl font-bold text-maint-gray-800">Schedule</h2>
          <p className="text-maint-gray-600">Manage your maintenance tasks and appointments</p>
        </div>
        
        <div className="flex gap-2 mt-3 sm:mt-0">
          <Button variant="outline" size="sm" onClick={handleFilterEvents}>
            <Filter className="h-4 w-4 mr-1" />
            Filter
          </Button>
          <Button variant="outline" size="sm" onClick={handleExportSchedule}>
            <Download className="h-4 w-4 mr-1" />
            Export
          </Button>
          <Dialog open={isNewEventDialogOpen} onOpenChange={setIsNewEventDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm" className="bg-maint-blue hover:bg-blue-700">
                <Plus className="h-4 w-4 mr-1" />
                Add Event
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Event</DialogTitle>
                <DialogDescription>
                  Create a new event in your schedule.
                </DialogDescription>
              </DialogHeader>
              
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <label className="text-right text-sm">Title</label>
                  <Input 
                    className="col-span-3" 
                    value={newEvent.title}
                    onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                  />
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <label className="text-right text-sm">Date</label>
                  <div className="col-span-3">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button 
                          variant="outline" 
                          className="w-full justify-start text-left"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {selectedDate ? format(selectedDate, "PPP") : "Select a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={selectedDate}
                          onSelect={setSelectedDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <label className="text-right text-sm">Time</label>
                  <Input 
                    type="time"
                    className="col-span-3" 
                    value={newEvent.time}
                    onChange={(e) => setNewEvent({...newEvent, time: e.target.value})}
                  />
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <label className="text-right text-sm">Client</label>
                  <Input 
                    className="col-span-3" 
                    value={newEvent.client}
                    onChange={(e) => setNewEvent({...newEvent, client: e.target.value})}
                  />
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <label className="text-right text-sm">Location</label>
                  <Input 
                    className="col-span-3" 
                    value={newEvent.location}
                    onChange={(e) => setNewEvent({...newEvent, location: e.target.value})}
                  />
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <label className="text-right text-sm">Type</label>
                  <Select 
                    value={newEvent.type}
                    onValueChange={(value: any) => setNewEvent({...newEvent, type: value})}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select event type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Event Types</SelectLabel>
                        <SelectItem value="delivery">Delivery</SelectItem>
                        <SelectItem value="installation">Installation</SelectItem>
                        <SelectItem value="inspection">Inspection</SelectItem>
                        <SelectItem value="parts-pickup">Parts Pickup</SelectItem>
                        <SelectItem value="meeting">Meeting</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsNewEventDialogOpen(false)}>
                  Cancel
                </Button>
                <Button 
                  className="bg-maint-blue hover:bg-blue-700"
                  onClick={handleAddEvent}
                  disabled={!newEvent.title || !newEvent.client || !newEvent.location || !selectedDate}
                >
                  Add Event
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xl">Weekly Schedule</CardTitle>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" onClick={() => navigateWeek('prev')}>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <span className="text-sm font-medium">
                  {formatDate(weekDates[0])} - {formatDate(weekDates[6])}
                </span>
                <Button variant="outline" size="sm" onClick={() => navigateWeek('next')}>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-2 mb-2">
                {weekDates.map((date, index) => (
                  <div key={index} className="text-center">
                    <div className="text-xs font-medium text-maint-gray-600 mb-1">
                      {getDayOfWeek(date)}
                    </div>
                    <div className={`text-sm rounded-full w-8 h-8 flex items-center justify-center mx-auto
                      ${date === today 
                        ? 'bg-maint-blue text-white' 
                        : 'text-maint-gray-800'}
                    `}>
                      {new Date(date).getDate()}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="grid grid-cols-7 gap-2 mt-2">
                {weekDates.map((date, dateIndex) => {
                  const daySchedule = schedule.find(day => day.date === date);
                  const events = daySchedule ? daySchedule.events : [];
                  
                  return (
                    <div 
                      key={dateIndex} 
                      className={`min-h-[300px] border rounded-md p-2 ${
                        date === today ? 'border-maint-blue bg-blue-50' : ''
                      }`}
                    >
                      <div className="flex justify-end mb-1">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                              <Plus className="h-3.5 w-3.5" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Add Event for {formatDate(date)}</DialogTitle>
                            </DialogHeader>
                            {/* Form would go here */}
                            <DialogFooter>
                              <Button variant="outline">Cancel</Button>
                              <Button>Add Event</Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </div>
                      
                      {events.length > 0 ? (
                        <div className="space-y-2">
                          {events.map((event, eventIndex) => {
                            const typeInfo = getEventTypeInfo(event.type);
                            
                            return (
                              <div 
                                key={eventIndex} 
                                className={`p-2 rounded-md text-xs ${event.completed ? 'bg-gray-100 text-maint-gray-500' : typeInfo.bgColor + ' ' + typeInfo.textColor}`}
                              >
                                <div className="font-medium">{event.time} - {event.title}</div>
                                <div className="mt-1">{event.client}</div>
                                <div className="flex items-center mt-1 text-maint-gray-600">
                                  <MapPin className="h-3 w-3 mr-1" />
                                  {event.location}
                                </div>
                                <div className="flex items-center justify-between mt-2">
                                  {!event.completed && (
                                    <button
                                      onClick={() => markEventCompleted(dateIndex, event.id)}
                                      className="text-center bg-white bg-opacity-50 rounded py-0.5 px-1 hover:bg-opacity-80 transition-colors"
                                    >
                                      <Check className="h-3 w-3 inline-block mr-1" />
                                      Complete
                                    </button>
                                  )}
                                  <button className="text-center bg-white bg-opacity-50 rounded py-0.5 px-1 hover:bg-opacity-80 transition-colors ml-auto">
                                    <Edit className="h-3 w-3" />
                                  </button>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        <div className="h-full flex items-center justify-center">
                          <p className="text-maint-gray-400 text-xs">No events</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Upcoming Events</CardTitle>
            </CardHeader>
            <CardContent>
              {upcomingEvents.length > 0 ? (
                <div className="space-y-3">
                  {upcomingEvents.map((event, index) => {
                    const typeInfo = getEventTypeInfo(event.type);
                    const isToday = event.date === today;
                    
                    return (
                      <div key={index} className="border rounded-md p-3 hover:border-maint-blue transition-colors">
                        <div className="flex justify-between items-center mb-2">
                          <span className={`px-2 py-0.5 rounded text-xs ${typeInfo.bgColor} ${typeInfo.textColor}`}>
                            {typeInfo.label}
                          </span>
                          <span className="text-xs text-maint-gray-500">
                            {isToday ? 'Today' : formatDate(event.date)}
                          </span>
                        </div>
                        
                        <div className="text-sm font-medium">{event.title}</div>
                        
                        <div className="flex items-center mt-1 text-xs text-maint-gray-600">
                          <Clock className="h-3 w-3 mr-1" />
                          {event.time}
                          <span className="mx-1">•</span>
                          {event.client}
                        </div>
                        
                        <div className="flex items-center mt-1 text-xs text-maint-gray-600">
                          <MapPin className="h-3 w-3 mr-1" />
                          {event.location}
                        </div>
                        
                        {event.requestId && (
                          <div className="mt-2 text-xs">
                            <span className="text-maint-gray-500">Request: </span>
                            <span className="font-mono">{event.requestId}</span>
                          </div>
                        )}
                        
                        <button
                          onClick={() => {
                            const dayIndex = weekDates.findIndex(d => d === event.date);
                            if (dayIndex !== -1) {
                              markEventCompleted(dayIndex, event.id);
                            }
                          }}
                          className="mt-2 text-xs text-maint-blue hover:text-maint-teal transition-colors flex items-center"
                        >
                          <Check className="h-3 w-3 mr-1" />
                          Mark as completed
                        </button>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="py-8 text-center text-maint-gray-500">
                  <CalendarIcon className="h-10 w-10 mx-auto text-maint-gray-300 mb-2" />
                  <p>No upcoming events</p>
                </div>
              )}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Monthly Overview</span>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <Filter className="h-4 w-4" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-maint-gray-600">Total Assignments</p>
                    <p className="text-xl font-bold">24</p>
                  </div>
                  <div>
                    <p className="text-sm text-maint-gray-600">Completed</p>
                    <p className="text-xl font-bold">18</p>
                  </div>
                  <div>
                    <p className="text-sm text-maint-gray-600">Completion</p>
                    <p className="text-xl font-bold">75%</p>
                  </div>
                </div>
                
                <div className="pt-3 border-t">
                  <p className="text-sm font-medium mb-2">Task Types</p>
                  <Table>
                    <TableBody>
                      <TableRow>
                        <TableCell className="py-1.5">
                          <span className="flex items-center">
                            <span className="h-3 w-3 rounded-full bg-blue-500 mr-2"></span>
                            Deliveries
                          </span>
                        </TableCell>
                        <TableCell className="py-1.5 text-right">10</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="py-1.5">
                          <span className="flex items-center">
                            <span className="h-3 w-3 rounded-full bg-purple-500 mr-2"></span>
                            Installations
                          </span>
                        </TableCell>
                        <TableCell className="py-1.5 text-right">8</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="py-1.5">
                          <span className="flex items-center">
                            <span className="h-3 w-3 rounded-full bg-maint-teal mr-2"></span>
                            Inspections
                          </span>
                        </TableCell>
                        <TableCell className="py-1.5 text-right">4</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="py-1.5">
                          <span className="flex items-center">
                            <span className="h-3 w-3 rounded-full bg-yellow-500 mr-2"></span>
                            Parts Pickup
                          </span>
                        </TableCell>
                        <TableCell className="py-1.5 text-right">2</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                  <div className="mt-3 text-center">
                    <Button variant="outline" size="sm" className="w-full text-maint-blue border-maint-blue hover:bg-blue-50">
                      <Download className="h-3 w-3 mr-1" />
                      Export Report
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SchedulePage;
