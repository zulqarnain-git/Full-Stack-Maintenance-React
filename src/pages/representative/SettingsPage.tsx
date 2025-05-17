
import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { User, Bell, Lock, MapPin, Clock } from 'lucide-react';

const RepresentativeSettingsPage: React.FC = () => {
  const { toast } = useToast();
  
  // Profile state
  const [profileData, setProfileData] = useState({
    name: 'Representative User',
    email: 'representative@example.com',
    phone: '+1 (555) 234-5678',
    specialization: 'Engine Repairs',
  });

  // Location settings
  const [locationData, setLocationData] = useState({
    region: 'North',
    maxTravelDistance: '50',
    preferredZones: ['Downtown', 'Industrial District'],
    availableOnWeekends: false,
  });

  // Notification settings
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
    newAssignments: true,
    statusChanges: true,
    scheduleReminders: true,
  });

  // Security settings
  const [passwords, setPasswords] = useState({
    current: '',
    new: '',
    confirm: '',
  });

  // Availability settings
  const [availability, setAvailability] = useState({
    monday: {start: '09:00', end: '17:00', available: true},
    tuesday: {start: '09:00', end: '17:00', available: true},
    wednesday: {start: '09:00', end: '17:00', available: true},
    thursday: {start: '09:00', end: '17:00', available: true},
    friday: {start: '09:00', end: '17:00', available: true},
    saturday: {start: '10:00', end: '15:00', available: false},
    sunday: {start: '10:00', end: '15:00', available: false},
  });

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Profile updated",
      description: "Your profile information has been updated successfully.",
    });
  };

  const handleLocationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Location settings updated",
      description: "Your location preferences have been updated successfully.",
    });
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwords.new !== passwords.confirm) {
      toast({
        title: "Passwords do not match",
        description: "New password and confirmation password must match.",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Password updated",
      description: "Your password has been changed successfully.",
    });
    
    setPasswords({
      current: '',
      new: '',
      confirm: '',
    });
  };

  const handleAvailabilitySubmit = () => {
    toast({
      title: "Availability updated",
      description: "Your availability schedule has been saved.",
    });
  };

  return (
    <DashboardLayout userRole="representative">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-maint-gray-800">Settings</h2>
        <p className="text-maint-gray-600">Manage your account and preferences</p>
      </div>
      
      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="bg-maint-gray-100 p-1">
          <TabsTrigger value="profile" className="data-[state=active]:bg-white rounded-md">
            <User className="h-4 w-4 mr-2" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="location" className="data-[state=active]:bg-white">
            <MapPin className="h-4 w-4 mr-2" />
            Location
          </TabsTrigger>
          <TabsTrigger value="availability" className="data-[state=active]:bg-white">
            <Clock className="h-4 w-4 mr-2" />
            Availability
          </TabsTrigger>
          <TabsTrigger value="notifications" className="data-[state=active]:bg-white">
            <Bell className="h-4 w-4 mr-2" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="security" className="data-[state=active]:bg-white">
            <Lock className="h-4 w-4 mr-2" />
            Security
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>
                Update your account profile information
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleProfileSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Full Name</label>
                    <Input
                      value={profileData.name}
                      onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email Address</label>
                    <Input
                      type="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Phone Number</label>
                    <Input
                      value={profileData.phone}
                      onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Specialization</label>
                    <Input
                      value={profileData.specialization}
                      onChange={(e) => setProfileData({ ...profileData, specialization: e.target.value })}
                    />
                  </div>
                </div>
                
                <div className="pt-4">
                  <Button type="submit" className="bg-maint-blue hover:bg-blue-700">
                    Save Changes
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Profile Picture</CardTitle>
              <CardDescription>
                Upload a profile picture or avatar
              </CardDescription>
            </CardHeader>
            <CardContent className="flex items-center gap-6">
              <div className="h-24 w-24 rounded-full bg-maint-blue flex items-center justify-center text-white text-2xl font-semibold">
                R
              </div>
              <div>
                <Button className="bg-maint-blue hover:bg-blue-700 mb-2">
                  Upload New Picture
                </Button>
                <p className="text-sm text-maint-gray-500">
                  Recommended: Square image, at least 400x400 pixels
                </p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Skills & Certifications</CardTitle>
              <CardDescription>
                Add your technical skills and certifications
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  <span className="bg-maint-gray-100 text-maint-gray-800 rounded-full px-3 py-1 text-sm">Engine Repair</span>
                  <span className="bg-maint-gray-100 text-maint-gray-800 rounded-full px-3 py-1 text-sm">Electrical Systems</span>
                  <span className="bg-maint-gray-100 text-maint-gray-800 rounded-full px-3 py-1 text-sm">Brake Systems</span>
                  <span className="bg-maint-gray-100 text-maint-gray-800 rounded-full px-3 py-1 text-sm">Transmission</span>
                  <span className="bg-maint-gray-100 text-maint-gray-800 rounded-full px-3 py-1 text-sm">Suspension</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <Input placeholder="Add new skill" className="max-w-xs" />
                  <Button className="bg-maint-blue hover:bg-blue-700">Add</Button>
                </div>
                
                <div className="pt-4 border-t">
                  <h4 className="font-medium mb-2">Certifications</h4>
                  <div className="space-y-2">
                    <div className="p-3 bg-maint-gray-50 rounded-md flex justify-between items-center">
                      <div>
                        <p className="font-medium">ASE Master Technician</p>
                        <p className="text-sm text-maint-gray-500">Expires: Dec 2026</p>
                      </div>
                      <Button variant="outline" size="sm">View</Button>
                    </div>
                    <div className="p-3 bg-maint-gray-50 rounded-md flex justify-between items-center">
                      <div>
                        <p className="font-medium">Toyota Certified Technician</p>
                        <p className="text-sm text-maint-gray-500">Expires: Aug 2025</p>
                      </div>
                      <Button variant="outline" size="sm">View</Button>
                    </div>
                  </div>
                  
                  <Button variant="outline" className="mt-4">
                    Add Certification
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="location" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Location Settings</CardTitle>
              <CardDescription>
                Configure your service area and location preferences
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLocationSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Primary Region</label>
                    <select
                      className="w-full border rounded-md p-2"
                      value={locationData.region}
                      onChange={(e) => setLocationData({ ...locationData, region: e.target.value })}
                    >
                      <option>North</option>
                      <option>South</option>
                      <option>East</option>
                      <option>West</option>
                      <option>Central</option>
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Maximum Travel Distance (km)</label>
                    <Input
                      type="number"
                      value={locationData.maxTravelDistance}
                      onChange={(e) => setLocationData({ ...locationData, maxTravelDistance: e.target.value })}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Preferred Work Zones</label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="downtown" className="rounded" defaultChecked />
                      <label htmlFor="downtown">Downtown</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="industrial" className="rounded" defaultChecked />
                      <label htmlFor="industrial">Industrial District</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="suburbs" className="rounded" />
                      <label htmlFor="suburbs">Suburbs</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="rural" className="rounded" />
                      <label htmlFor="rural">Rural Areas</label>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between border-t pt-4">
                  <div>
                    <p className="font-medium">Available for Weekend Work</p>
                    <p className="text-sm text-maint-gray-500">Set your availability for weekends</p>
                  </div>
                  <Switch 
                    checked={locationData.availableOnWeekends}
                    onCheckedChange={(checked) => setLocationData({ ...locationData, availableOnWeekends: checked })}
                  />
                </div>
                
                <div className="pt-4">
                  <Button type="submit" className="bg-maint-blue hover:bg-blue-700">
                    Save Location Settings
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Current Location</CardTitle>
              <CardDescription>
                View your service area on the map
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-maint-gray-100 rounded-lg flex items-center justify-center">
                <MapPin className="h-8 w-8 text-maint-gray-400" />
                <p className="ml-2 text-maint-gray-500">Map view showing service area</p>
              </div>
              
              <div className="flex justify-between mt-4">
                <Button variant="outline">
                  Update Current Location
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => {
                    toast({
                      title: "GPS tracking enabled",
                      description: "Your location will be updated automatically during work hours.",
                    });
                  }}
                >
                  Enable GPS Tracking
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="availability" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Weekly Availability</CardTitle>
              <CardDescription>
                Set your regular working hours
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries(availability).map(([day, dayData]) => (
                  <div key={day} className="flex flex-col md:flex-row md:items-center gap-3 py-3 border-b last:border-0">
                    <div className="md:w-36">
                      <div className="flex items-center gap-2">
                        <Switch 
                          checked={dayData.available}
                          onCheckedChange={(checked) => {
                            setAvailability({
                              ...availability,
                              [day]: { ...dayData, available: checked }
                            });
                          }}
                        />
                        <span className="font-medium capitalize">{day}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Input
                        type="time"
                        className="w-32"
                        value={dayData.start}
                        onChange={(e) => {
                          setAvailability({
                            ...availability,
                            [day]: { ...dayData, start: e.target.value }
                          });
                        }}
                        disabled={!dayData.available}
                      />
                      <span>to</span>
                      <Input
                        type="time"
                        className="w-32"
                        value={dayData.end}
                        onChange={(e) => {
                          setAvailability({
                            ...availability,
                            [day]: { ...dayData, end: e.target.value }
                          });
                        }}
                        disabled={!dayData.available}
                      />
                    </div>
                  </div>
                ))}
                
                <div className="pt-4">
                  <Button 
                    onClick={handleAvailabilitySubmit}
                    className="bg-maint-blue hover:bg-blue-700"
                  >
                    Save Schedule
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Time Off Requests</CardTitle>
              <CardDescription>
                Request vacation or time off
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="space-y-2 flex-1">
                    <label className="text-sm font-medium">Start Date</label>
                    <Input type="date" />
                  </div>
                  
                  <div className="space-y-2 flex-1">
                    <label className="text-sm font-medium">End Date</label>
                    <Input type="date" />
                  </div>
                  
                  <div className="space-y-2 flex-1">
                    <label className="text-sm font-medium">Type</label>
                    <select className="w-full border rounded-md p-2">
                      <option>Vacation</option>
                      <option>Sick Leave</option>
                      <option>Personal Day</option>
                      <option>Other</option>
                    </select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Reason (Optional)</label>
                  <textarea 
                    className="w-full border rounded-md p-2 h-20"
                    placeholder="Briefly describe the reason for your time off request"
                  ></textarea>
                </div>
                
                <Button
                  onClick={() => {
                    toast({
                      title: "Time off request submitted",
                      description: "Your request has been sent for approval.",
                    });
                  }}
                  className="bg-maint-blue hover:bg-blue-700"
                >
                  Submit Request
                </Button>
                
                <div className="pt-4 border-t mt-6">
                  <h4 className="font-medium mb-2">Upcoming Time Off</h4>
                  <div className="text-sm text-maint-gray-500">
                    No upcoming time off scheduled
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>
                Configure how you want to receive notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="font-medium">Notification Channels</h3>
                
                <div className="flex items-center justify-between border-b pb-3">
                  <div>
                    <p className="font-medium">Email Notifications</p>
                    <p className="text-sm text-maint-gray-500">Receive updates via email</p>
                  </div>
                  <Switch 
                    checked={notifications.email}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, email: checked })}
                  />
                </div>
                
                <div className="flex items-center justify-between border-b pb-3">
                  <div>
                    <p className="font-medium">Push Notifications</p>
                    <p className="text-sm text-maint-gray-500">Receive updates in the browser</p>
                  </div>
                  <Switch 
                    checked={notifications.push}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, push: checked })}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">SMS Notifications</p>
                    <p className="text-sm text-maint-gray-500">Receive text messages for urgent updates</p>
                  </div>
                  <Switch 
                    checked={notifications.sms}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, sms: checked })}
                  />
                </div>
              </div>
              
              <div className="space-y-4 pt-4">
                <h3 className="font-medium">Notification Types</h3>
                
                <div className="flex items-center justify-between border-b pb-3">
                  <div>
                    <p className="font-medium">New Work Assignments</p>
                    <p className="text-sm text-maint-gray-500">When you're assigned new maintenance requests</p>
                  </div>
                  <Switch 
                    checked={notifications.newAssignments}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, newAssignments: checked })}
                  />
                </div>
                
                <div className="flex items-center justify-between border-b pb-3">
                  <div>
                    <p className="font-medium">Request Status Changes</p>
                    <p className="text-sm text-maint-gray-500">When the status of your assigned requests changes</p>
                  </div>
                  <Switch 
                    checked={notifications.statusChanges}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, statusChanges: checked })}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Schedule Reminders</p>
                    <p className="text-sm text-maint-gray-500">Daily notifications about your upcoming schedule</p>
                  </div>
                  <Switch 
                    checked={notifications.scheduleReminders}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, scheduleReminders: checked })}
                  />
                </div>
              </div>
              
              <div className="pt-4">
                <Button 
                  onClick={() => {
                    toast({
                      title: "Notification preferences updated",
                      description: "Your notification preferences have been saved.",
                    });
                  }}
                  className="bg-maint-blue hover:bg-blue-700"
                >
                  Save Preferences
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Change Password</CardTitle>
              <CardDescription>
                Update your account password
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handlePasswordChange} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Current Password</label>
                  <Input
                    type="password"
                    value={passwords.current}
                    onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">New Password</label>
                  <Input
                    type="password"
                    value={passwords.new}
                    onChange={(e) => setPasswords({ ...passwords, new: e.target.value })}
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Confirm New Password</label>
                  <Input
                    type="password"
                    value={passwords.confirm}
                    onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
                  />
                </div>
                
                <div className="pt-4">
                  <Button type="submit" className="bg-maint-blue hover:bg-blue-700">
                    Update Password
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Mobile Application</CardTitle>
              <CardDescription>
                Access your account on mobile devices
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Mobile App Access</p>
                  <p className="text-sm text-maint-gray-500">Enable access to the mobile application</p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="pt-4 flex flex-col md:flex-row gap-4">
                <Button variant="outline" className="flex-1">Download Mobile App</Button>
                <Button variant="outline" className="flex-1">
                  Reset Mobile Access
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default RepresentativeSettingsPage;
