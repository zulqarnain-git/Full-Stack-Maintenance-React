import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { User, Bell, Lock, Shield, Database, Mail, Upload, Download } from 'lucide-react';

const SettingsPage: React.FC = () => {
  const { toast } = useToast();
  
  // Profile state
  const [profileData, setProfileData] = useState({
    name: 'Admin User',
    email: 'admin@example.com',
    phone: '+1 (555) 123-4567',
    jobTitle: 'System Administrator',
  });

  // Notification settings
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    requestUpdates: true,
    newClients: true,
    systemAlerts: true,
  });

  // Security settings
  const [passwords, setPasswords] = useState({
    current: '',
    new: '',
    confirm: '',
  });

  // System settings
  const [systemSettings, setSystemSettings] = useState({
    maintenanceMode: false,
    debugMode: false,
    autoAssign: true,
    backupFrequency: 'daily',
    dataRetention: '90',
  });

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Profile updated",
      description: "Your profile information has been updated successfully.",
      className: "bg-green-500 text-white",
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
      className: "bg-green-500 text-white",
    });
    
    setPasswords({
      current: '',
      new: '',
      confirm: '',
    });
  };

  const handleSystemSettingsSave = () => {
    toast({
      title: "Settings updated",
      description: "System settings have been updated successfully.",
      className: "bg-green-500 text-white",
    });
  };

  return (
    <DashboardLayout userRole="admin">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Settings</h2>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Manage your account and system preferences
        </p>
      </div>
      
      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg h-12">
          <TabsTrigger 
            value="profile" 
            className="data-[state=active]:bg-white data-[state=active]:shadow-sm dark:data-[state=active]:bg-gray-700 rounded-md transition-all"
          >
            <User className="h-4 w-4 mr-2" />
            Profile
          </TabsTrigger>
          <TabsTrigger 
            value="notifications" 
            className="data-[state=active]:bg-white data-[state=active]:shadow-sm dark:data-[state=active]:bg-gray-700 rounded-md transition-all"
          >
            <Bell className="h-4 w-4 mr-2" />
            Notifications
          </TabsTrigger>
          <TabsTrigger 
            value="security" 
            className="data-[state=active]:bg-white data-[state=active]:shadow-sm dark:data-[state=active]:bg-gray-700 rounded-md transition-all"
          >
            <Lock className="h-4 w-4 mr-2" />
            Security
          </TabsTrigger>
          <TabsTrigger 
            value="system" 
            className="data-[state=active]:bg-white data-[state=active]:shadow-sm dark:data-[state=active]:bg-gray-700 rounded-md transition-all"
          >
            <Shield className="h-4 w-4 mr-2" />
            System
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="profile" className="mt-6">
          <div className="grid gap-6">
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-xl">Profile Information</CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-400">
                  Update your account profile information
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleProfileSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</label>
                      <Input
                        className="dark:bg-gray-800 dark:border-gray-700"
                        value={profileData.name}
                        onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Email Address</label>
                      <Input
                        type="email"
                        className="dark:bg-gray-800 dark:border-gray-700"
                        value={profileData.email}
                        onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Phone Number</label>
                      <Input
                        className="dark:bg-gray-800 dark:border-gray-700"
                        value={profileData.phone}
                        onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Job Title</label>
                      <Input
                        className="dark:bg-gray-800 dark:border-gray-700"
                        value={profileData.jobTitle}
                        onChange={(e) => setProfileData({ ...profileData, jobTitle: e.target.value })}
                      />
                    </div>
                  </div>
                  
                  <div className="pt-2">
                    <Button 
                      type="submit" 
                      className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white"
                    >
                      Save Changes
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-xl">Profile Picture</CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-400">
                  Upload a profile picture or avatar
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                <div className="h-24 w-24 rounded-full bg-blue-600 flex items-center justify-center text-white text-2xl font-semibold shadow-md">
                  {profileData.name.charAt(0)}
                </div>
                <div className="flex-1 space-y-4">
                  <div className="flex gap-3">
                    <Button className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white">
                      <Upload className="h-4 w-4 mr-2" />
                      Upload New Picture
                    </Button>
                    <Button variant="outline" className="border-gray-300 dark:border-gray-600">
                      Remove
                    </Button>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Recommended: Square image, at least 400x400 pixels. JPG, PNG or GIF.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="notifications" className="mt-6">
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl">Notification Preferences</CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-400">
                Configure how you want to receive notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="space-y-4">
                <h3 className="font-medium text-gray-900 dark:text-white">Notification Channels</h3>
                
                <div className="flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Email Notifications</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Receive updates via email</p>
                  </div>
                  <Switch 
                    checked={notifications.email}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, email: checked })}
                    className="data-[state=checked]:bg-blue-600"
                  />
                </div>
                
                <div className="flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Push Notifications</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Receive updates in the browser</p>
                  </div>
                  <Switch 
                    checked={notifications.push}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, push: checked })}
                    className="data-[state=checked]:bg-blue-600"
                  />
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="font-medium text-gray-900 dark:text-white">Notification Types</h3>
                
                <div className="flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Request Updates</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">When maintenance requests are updated</p>
                  </div>
                  <Switch 
                    checked={notifications.requestUpdates}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, requestUpdates: checked })}
                    className="data-[state=checked]:bg-blue-600"
                  />
                </div>
                
                <div className="flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">New Clients</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">When new clients are registered</p>
                  </div>
                  <Switch 
                    checked={notifications.newClients}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, newClients: checked })}
                    className="data-[state=checked]:bg-blue-600"
                  />
                </div>
                
                <div className="flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">System Alerts</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Critical system notifications</p>
                  </div>
                  <Switch 
                    checked={notifications.systemAlerts}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, systemAlerts: checked })}
                    className="data-[state=checked]:bg-blue-600"
                  />
                </div>
              </div>
              
              <div className="pt-2">
                <Button 
                  onClick={() => {
                    toast({
                      title: "Notification preferences updated",
                      description: "Your notification preferences have been saved.",
                      className: "bg-green-500 text-white",
                    });
                  }}
                  className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white"
                >
                  Save Preferences
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="security" className="mt-6">
          <div className="grid gap-6">
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-xl">Change Password</CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-400">
                  Update your account password
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handlePasswordChange} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Current Password</label>
                    <Input
                      type="password"
                      className="dark:bg-gray-800 dark:border-gray-700"
                      value={passwords.current}
                      onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">New Password</label>
                    <Input
                      type="password"
                      className="dark:bg-gray-800 dark:border-gray-700"
                      value={passwords.new}
                      onChange={(e) => setPasswords({ ...passwords, new: e.target.value })}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Confirm New Password</label>
                    <Input
                      type="password"
                      className="dark:bg-gray-800 dark:border-gray-700"
                      value={passwords.confirm}
                      onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
                    />
                  </div>
                  
                  <div className="pt-2">
                    <Button 
                      type="submit" 
                      className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white"
                    >
                      Update Password
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-xl">Two-Factor Authentication</CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-400">
                  Add an extra layer of security to your account
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Two-Factor Authentication</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Enable 2FA for added security using an authenticator app
                    </p>
                  </div>
                  <Switch 
                    onCheckedChange={(checked) => {
                      toast({
                        title: checked ? "2FA Enabled" : "2FA Disabled",
                        description: checked 
                          ? "Two-factor authentication is now enabled." 
                          : "Two-factor authentication has been disabled.",
                        className: checked ? "bg-green-500 text-white" : "bg-gray-500 text-white",
                      });
                    }}
                    className="data-[state=checked]:bg-blue-600"
                  />
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <Button 
                    variant="outline"
                    className="border-gray-300 dark:border-gray-600"
                    onClick={() => {
                      toast({
                        title: "Security log downloaded",
                        description: "Your account security log has been downloaded as a PDF.",
                        className: "bg-blue-500 text-white",
                      });
                    }}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download Security Log
                  </Button>
                  
                  <Button 
                    variant="outline"
                    className="border-gray-300 dark:border-gray-600"
                    onClick={() => {
                      toast({
                        title: "Recovery codes generated",
                        description: "New recovery codes have been generated.",
                        className: "bg-blue-500 text-white",
                      });
                    }}
                  >
                    Generate Recovery Codes
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="system" className="mt-6">
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl">System Settings</CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-400">
                Configure global system preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Maintenance Mode</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Temporarily disable access for non-admin users
                    </p>
                  </div>
                  <Switch 
                    checked={systemSettings.maintenanceMode}
                    onCheckedChange={(checked) => setSystemSettings({ ...systemSettings, maintenanceMode: checked })}
                    className="data-[state=checked]:bg-blue-600"
                  />
                </div>
                
                <div className="flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Debug Mode</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Enable detailed error logging (for development only)
                    </p>
                  </div>
                  <Switch 
                    checked={systemSettings.debugMode}
                    onCheckedChange={(checked) => setSystemSettings({ ...systemSettings, debugMode: checked })}
                    className="data-[state=checked]:bg-blue-600"
                  />
                </div>
                
                <div className="flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Auto-Assign Requests</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Automatically assign requests to available representatives
                    </p>
                  </div>
                  <Switch 
                    checked={systemSettings.autoAssign}
                    onCheckedChange={(checked) => setSystemSettings({ ...systemSettings, autoAssign: checked })}
                    className="data-[state=checked]:bg-blue-600"
                  />
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Database Backup Frequency</label>
                    <select
                      className="w-full border rounded-md p-2 dark:bg-gray-800 dark:border-gray-700"
                      value={systemSettings.backupFrequency}
                      onChange={(e) => setSystemSettings({ ...systemSettings, backupFrequency: e.target.value })}
                    >
                      <option value="hourly">Every Hour</option>
                      <option value="daily">Daily</option>
                      <option value="weekly">Weekly</option>
                      <option value="monthly">Monthly</option>
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Data Retention Period (Days)</label>
                    <Input
                      type="number"
                      className="dark:bg-gray-800 dark:border-gray-700"
                      value={systemSettings.dataRetention}
                      onChange={(e) => setSystemSettings({ ...systemSettings, dataRetention: e.target.value })}
                    />
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:gap-3">
                <Button 
                  onClick={handleSystemSettingsSave}
                  className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white"
                >
                  Save Settings
                </Button>
                
                <Button
                  variant="outline"
                  className="border-gray-300 dark:border-gray-600"
                  onClick={() => {
                    toast({
                      title: "Database backup started",
                      description: "A manual backup has been initiated.",
                      className: "bg-blue-500 text-white",
                    });
                  }}
                >
                  <Database className="mr-2 h-4 w-4" />
                  Backup Now
                </Button>
                
                <Button
                  variant="outline"
                  className="border-gray-300 dark:border-gray-600"
                  onClick={() => {
                    toast({
                      title: "Test email sent",
                      description: "A test email has been sent to your inbox.",
                      className: "bg-blue-500 text-white",
                    });
                  }}
                >
                  <Mail className="mr-2 h-4 w-4" />
                  Send Test Email
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default SettingsPage;