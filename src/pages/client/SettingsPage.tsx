
import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { User, Bell, Lock, Building, Car } from 'lucide-react';

const ClientSettingsPage: React.FC = () => {
  const { toast } = useToast();
  
  // Profile state
  const [profileData, setProfileData] = useState({
    name: 'Client User',
    email: 'client@example.com',
    phone: '+1 (555) 987-6543',
    position: 'Fleet Manager',
  });

  // Company details
  const [companyData, setCompanyData] = useState({
    companyName: 'ABC Corporation',
    address: '123 Main Street, City, State',
    taxId: 'TAX-12345-XYZ',
    contactPerson: 'John Smith',
  });

  // Notification settings
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    requestUpdates: true,
    maintenanceReminders: true,
    reportGeneration: false,
  });

  // Security settings
  const [passwords, setPasswords] = useState({
    current: '',
    new: '',
    confirm: '',
  });

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Profile updated",
      description: "Your profile information has been updated successfully.",
    });
  };

  const handleCompanySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Company details updated",
      description: "Your company information has been updated successfully.",
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

  return (
    <DashboardLayout userRole="client">
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
          <TabsTrigger value="company" className="data-[state=active]:bg-white">
            <Building className="h-4 w-4 mr-2" />
            Company
          </TabsTrigger>
          <TabsTrigger value="vehicles" className="data-[state=active]:bg-white">
            <Car className="h-4 w-4 mr-2" />
            Vehicles
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
                    <label className="text-sm font-medium">Position</label>
                    <Input
                      value={profileData.position}
                      onChange={(e) => setProfileData({ ...profileData, position: e.target.value })}
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
                C
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
        </TabsContent>
        
        <TabsContent value="company" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Company Details</CardTitle>
              <CardDescription>
                Update your company information
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCompanySubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Company Name</label>
                    <Input
                      value={companyData.companyName}
                      onChange={(e) => setCompanyData({ ...companyData, companyName: e.target.value })}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Tax ID / Registration Number</label>
                    <Input
                      value={companyData.taxId}
                      onChange={(e) => setCompanyData({ ...companyData, taxId: e.target.value })}
                    />
                  </div>
                  
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-medium">Address</label>
                    <Input
                      value={companyData.address}
                      onChange={(e) => setCompanyData({ ...companyData, address: e.target.value })}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Primary Contact Person</label>
                    <Input
                      value={companyData.contactPerson}
                      onChange={(e) => setCompanyData({ ...companyData, contactPerson: e.target.value })}
                    />
                  </div>
                </div>
                
                <div className="pt-4">
                  <Button type="submit" className="bg-maint-blue hover:bg-blue-700">
                    Save Company Details
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Company Logo</CardTitle>
              <CardDescription>
                Upload your company logo
              </CardDescription>
            </CardHeader>
            <CardContent className="flex items-center gap-6">
              <div className="h-24 w-36 rounded bg-maint-gray-100 flex items-center justify-center text-maint-gray-500">
                Logo
              </div>
              <div>
                <Button className="bg-maint-blue hover:bg-blue-700 mb-2">
                  Upload Logo
                </Button>
                <p className="text-sm text-maint-gray-500">
                  Recommended: PNG or SVG format with transparent background
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="vehicles" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Vehicle Management</CardTitle>
              <CardDescription>
                Configure your vehicle fleet information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col gap-4">
                <div className="flex flex-wrap justify-between items-center">
                  <h3 className="font-medium">Registered Vehicles</h3>
                  <Button className="bg-maint-blue hover:bg-blue-700">
                    Add New Vehicle
                  </Button>
                </div>
                
                <div className="border rounded-lg overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-maint-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-maint-gray-500 uppercase tracking-wider">Vehicle</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-maint-gray-500 uppercase tracking-wider">Registration</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-maint-gray-500 uppercase tracking-wider">Type</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-maint-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-maint-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="font-medium">Toyota Hilux</div>
                          <div className="text-sm text-maint-gray-500">2023 Model</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">ABC-1234</td>
                        <td className="px-6 py-4 whitespace-nowrap">Pickup Truck</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            Active
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <a href="#" className="text-maint-blue hover:text-blue-900">Edit</a>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="font-medium">Ford Ranger</div>
                          <div className="text-sm text-maint-gray-500">2022 Model</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">XYZ-5678</td>
                        <td className="px-6 py-4 whitespace-nowrap">Pickup Truck</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            Active
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <a href="#" className="text-maint-blue hover:text-blue-900">Edit</a>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="font-medium">Toyota Land Cruiser</div>
                          <div className="text-sm text-maint-gray-500">2024 Model</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">GHI-3456</td>
                        <td className="px-6 py-4 whitespace-nowrap">SUV</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                            Maintenance
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <a href="#" className="text-maint-blue hover:text-blue-900">Edit</a>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              
              <div className="pt-4">
                <Button 
                  variant="outline"
                  onClick={() => {
                    toast({
                      title: "Fleet report generated",
                      description: "Your vehicle fleet report has been downloaded as a PDF.",
                    });
                  }}
                >
                  Download Fleet Report
                </Button>
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
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Push Notifications</p>
                    <p className="text-sm text-maint-gray-500">Receive updates in the browser</p>
                  </div>
                  <Switch 
                    checked={notifications.push}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, push: checked })}
                  />
                </div>
              </div>
              
              <div className="space-y-4 pt-4">
                <h3 className="font-medium">Notification Types</h3>
                
                <div className="flex items-center justify-between border-b pb-3">
                  <div>
                    <p className="font-medium">Request Updates</p>
                    <p className="text-sm text-maint-gray-500">When your maintenance requests status changes</p>
                  </div>
                  <Switch 
                    checked={notifications.requestUpdates}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, requestUpdates: checked })}
                  />
                </div>
                
                <div className="flex items-center justify-between border-b pb-3">
                  <div>
                    <p className="font-medium">Maintenance Reminders</p>
                    <p className="text-sm text-maint-gray-500">Scheduled maintenance reminders</p>
                  </div>
                  <Switch 
                    checked={notifications.maintenanceReminders}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, maintenanceReminders: checked })}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Report Generation</p>
                    <p className="text-sm text-maint-gray-500">When new reports are generated</p>
                  </div>
                  <Switch 
                    checked={notifications.reportGeneration}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, reportGeneration: checked })}
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
              <CardTitle>Account Security</CardTitle>
              <CardDescription>
                Manage your account security settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Two-Factor Authentication</p>
                  <p className="text-sm text-maint-gray-500">Enable 2FA for added security</p>
                </div>
                <Switch 
                  onCheckedChange={(checked) => {
                    toast({
                      title: checked ? "2FA Enabled" : "2FA Disabled",
                      description: checked 
                        ? "Two-factor authentication is now enabled." 
                        : "Two-factor authentication has been disabled.",
                    });
                  }}
                />
              </div>
              
              <div className="pt-4">
                <Button 
                  variant="outline"
                  onClick={() => {
                    toast({
                      title: "Login activity available",
                      description: "Your recent login activity has been sent to your email.",
                    });
                  }}
                >
                  View Login Activity
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default ClientSettingsPage;
