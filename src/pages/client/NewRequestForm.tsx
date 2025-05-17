
import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { FileText, FileUp, CalendarDays, Clock, Truck, MapPin } from 'lucide-react';

type MaintenanceType = 
  | 'regular' 
  | 'repair' 
  | 'emergency' 
  | 'inspection';

type Priority =
  | 'low'
  | 'medium'
  | 'high';

interface VehicleOption {
  id: string;
  name: string;
  registration: string;
}

interface RequestFormData {
  title: string;
  description: string;
  vehicleId: string;
  maintenanceType: MaintenanceType;
  priority: Priority;
  preferredDate: string;
  preferredTime: string;
  location: string;
  additionalNotes: string;
  attachments: File[];
}

const NewRequestForm: React.FC = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // Sample vehicle options
  const vehicleOptions: VehicleOption[] = [
    { id: '1', name: 'Toyota Hilux', registration: 'ABC-1234' },
    { id: '2', name: 'Ford Ranger', registration: 'XYZ-5678' },
    { id: '3', name: 'Toyota Land Cruiser', registration: 'GHI-3456' },
    { id: '4', name: 'Nissan Navara', registration: 'DEF-9012' }
  ];
  
  // Form state
  const [formData, setFormData] = useState<RequestFormData>({
    title: '',
    description: '',
    vehicleId: '',
    maintenanceType: 'regular',
    priority: 'medium',
    preferredDate: '',
    preferredTime: '',
    location: '',
    additionalNotes: '',
    attachments: []
  });

  // Validation state
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when field is updated
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };
  
  // Handle file uploads
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFormData({
        ...formData,
        attachments: [...formData.attachments, ...newFiles]
      });
    }
  };
  
  // Remove an attached file
  const handleRemoveFile = (index: number) => {
    const updatedFiles = [...formData.attachments];
    updatedFiles.splice(index, 1);
    setFormData({
      ...formData,
      attachments: updatedFiles
    });
  };
  
  // Validate the form
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Request title is required';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    
    if (!formData.vehicleId) {
      newErrors.vehicleId = 'Please select a vehicle';
    }
    
    if (!formData.preferredDate) {
      newErrors.preferredDate = 'Preferred date is required';
    } else {
      const selectedDate = new Date(formData.preferredDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (selectedDate < today) {
        newErrors.preferredDate = 'Date cannot be in the past';
      }
    }
    
    if (!formData.location.trim()) {
      newErrors.location = 'Location is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // In a real app, this would send the data to an API
      console.log('Form data to be submitted:', formData);
      
      toast({
        title: "Request submitted",
        description: "Your maintenance request has been submitted successfully.",
      });
      
      // Redirect to requests list page
      navigate('/client/requests');
    } else {
      toast({
        title: "Validation Error",
        description: "Please check the form for errors.",
        variant: "destructive",
      });
    }
  };

  return (
    <DashboardLayout userRole="client">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-maint-gray-800">New Maintenance Request</h2>
        <p className="text-maint-gray-600">Submit a new maintenance request for your vehicle</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit}>
            <Card>
              <CardHeader>
                <CardTitle>Request Details</CardTitle>
                <CardDescription>
                  Provide information about your maintenance request
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <label htmlFor="title" className="block text-sm font-medium text-maint-gray-700 mb-1">
                      Request Title <span className="text-red-500">*</span>
                    </label>
                    <Input 
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      placeholder="Brief title for your maintenance request"
                      className={errors.title ? 'border-red-500' : ''}
                    />
                    {errors.title && (
                      <p className="text-sm text-red-500 mt-1">{errors.title}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="description" className="block text-sm font-medium text-maint-gray-700 mb-1">
                      Description <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      rows={4}
                      placeholder="Please describe the issue or maintenance needed in detail"
                      className={`w-full border rounded-md p-2 ${errors.description ? 'border-red-500' : 'border-maint-gray-300'}`}
                    ></textarea>
                    {errors.description && (
                      <p className="text-sm text-red-500 mt-1">{errors.description}</p>
                    )}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="vehicleId" className="block text-sm font-medium text-maint-gray-700 mb-1">
                      Vehicle <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="vehicleId"
                      name="vehicleId"
                      value={formData.vehicleId}
                      onChange={handleInputChange}
                      className={`w-full rounded-md ${errors.vehicleId ? 'border-red-500' : 'border-maint-gray-300'}`}
                    >
                      <option value="">Select Vehicle</option>
                      {vehicleOptions.map(vehicle => (
                        <option key={vehicle.id} value={vehicle.id}>
                          {vehicle.name} ({vehicle.registration})
                        </option>
                      ))}
                    </select>
                    {errors.vehicleId && (
                      <p className="text-sm text-red-500 mt-1">{errors.vehicleId}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="maintenanceType" className="block text-sm font-medium text-maint-gray-700 mb-1">
                      Maintenance Type
                    </label>
                    <select
                      id="maintenanceType"
                      name="maintenanceType"
                      value={formData.maintenanceType}
                      onChange={handleInputChange}
                      className="w-full border border-maint-gray-300 rounded-md"
                    >
                      <option value="regular">Regular Maintenance</option>
                      <option value="repair">Repair</option>
                      <option value="emergency">Emergency Repair</option>
                      <option value="inspection">Routine Inspection</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="priority" className="block text-sm font-medium text-maint-gray-700 mb-1">
                      Priority
                    </label>
                    <select
                      id="priority"
                      name="priority"
                      value={formData.priority}
                      onChange={handleInputChange}
                      className="w-full border border-maint-gray-300 rounded-md"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Schedule & Location</CardTitle>
                <CardDescription>
                  Specify when and where you need the maintenance service
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label htmlFor="preferredDate" className="block text-sm font-medium text-maint-gray-700 mb-1">
                      Preferred Date <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <CalendarDays className="w-4 h-4 absolute left-3 top-2.5 text-maint-gray-500" />
                      <Input
                        type="date"
                        id="preferredDate"
                        name="preferredDate"
                        value={formData.preferredDate}
                        onChange={handleInputChange}
                        className={`pl-10 ${errors.preferredDate ? 'border-red-500' : ''}`}
                      />
                    </div>
                    {errors.preferredDate && (
                      <p className="text-sm text-red-500 mt-1">{errors.preferredDate}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="preferredTime" className="block text-sm font-medium text-maint-gray-700 mb-1">
                      Preferred Time
                    </label>
                    <div className="relative">
                      <Clock className="w-4 h-4 absolute left-3 top-2.5 text-maint-gray-500" />
                      <Input
                        type="time"
                        id="preferredTime"
                        name="preferredTime"
                        value={formData.preferredTime}
                        onChange={handleInputChange}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  
                  <div className="md:col-span-3">
                    <label htmlFor="location" className="block text-sm font-medium text-maint-gray-700 mb-1">
                      Service Location <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <MapPin className="w-4 h-4 absolute left-3 top-2.5 text-maint-gray-500" />
                      <Input
                        id="location"
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        placeholder="Enter the address for service"
                        className={`pl-10 ${errors.location ? 'border-red-500' : ''}`}
                      />
                    </div>
                    {errors.location && (
                      <p className="text-sm text-red-500 mt-1">{errors.location}</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Additional Information</CardTitle>
                <CardDescription>
                  Provide any other details that may be helpful
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label htmlFor="additionalNotes" className="block text-sm font-medium text-maint-gray-700 mb-1">
                    Additional Notes
                  </label>
                  <textarea
                    id="additionalNotes"
                    name="additionalNotes"
                    value={formData.additionalNotes}
                    onChange={handleInputChange}
                    rows={3}
                    placeholder="Any additional information or special instructions"
                    className="w-full border border-maint-gray-300 rounded-md p-2"
                  ></textarea>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-maint-gray-700 mb-1">
                    Attachments
                  </label>
                  <div className="border-2 border-dashed border-maint-gray-300 rounded-md p-6 text-center">
                    <FileUp className="h-8 w-8 text-maint-gray-400 mx-auto mb-2" />
                    <p className="text-maint-gray-600 mb-2">
                      Drag and drop files here, or click to select files
                    </p>
                    <p className="text-sm text-maint-gray-500 mb-4">
                      (Upload photos, documents, or other relevant files)
                    </p>
                    <Input
                      type="file"
                      id="attachments"
                      onChange={handleFileChange}
                      multiple
                      className="hidden"
                    />
                    <label htmlFor="attachments">
                      <Button type="button" variant="outline" className="mx-auto">
                        Select Files
                      </Button>
                    </label>
                  </div>
                  
                  {formData.attachments.length > 0 && (
                    <div className="mt-4 space-y-2">
                      <p className="text-sm font-medium">Attached Files:</p>
                      {formData.attachments.map((file, index) => (
                        <div key={index} className="flex items-center justify-between bg-maint-gray-50 p-2 rounded">
                          <div className="flex items-center">
                            <FileText className="h-4 w-4 mr-2 text-maint-gray-500" />
                            <span className="text-sm">{file.name}</span>
                          </div>
                          <Button 
                            type="button"
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleRemoveFile(index)}
                          >
                            Remove
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
            
            <div className="mt-6 flex justify-end gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate('/client/requests')}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-maint-blue hover:bg-blue-700"
              >
                Submit Request
              </Button>
            </div>
          </form>
        </div>
        
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Request Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="font-medium mb-2">What happens next?</h4>
                <ol className="text-sm text-maint-gray-600 space-y-2 list-decimal list-inside">
                  <li>Your request will be reviewed by our team</li>
                  <li>A maintenance representative will be assigned</li>
                  <li>You'll receive confirmation of the appointment</li>
                  <li>Service will be performed at the scheduled time</li>
                  <li>You can track the status in "My Requests"</li>
                </ol>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Maintenance Types</h4>
                <div className="text-sm text-maint-gray-600 space-y-2">
                  <div>
                    <p className="font-medium">Regular Maintenance</p>
                    <p>Scheduled service like oil changes, filter replacements, etc.</p>
                  </div>
                  <div>
                    <p className="font-medium">Repair</p>
                    <p>Fix a specific issue with your vehicle</p>
                  </div>
                  <div>
                    <p className="font-medium">Emergency Repair</p>
                    <p>Urgent issues requiring immediate attention</p>
                  </div>
                  <div>
                    <p className="font-medium">Routine Inspection</p>
                    <p>General vehicle check-up and safety inspection</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Need Assistance?</h4>
                <p className="text-sm text-maint-gray-600">
                  If you need any help with submitting your maintenance request, please contact our support team at support@mainflow.com or call 555-123-4567.
                </p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Your Vehicles</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {vehicleOptions.map(vehicle => (
                  <div
                    key={vehicle.id}
                    className="p-3 border rounded-md flex items-center justify-between"
                    onClick={() => setFormData({ ...formData, vehicleId: vehicle.id })}
                  >
                    <div>
                      <p className="font-medium">{vehicle.name}</p>
                      <p className="text-sm text-maint-gray-500">{vehicle.registration}</p>
                    </div>
                    <Truck className="h-5 w-5 text-maint-gray-400" />
                  </div>
                ))}
                
                <Button variant="outline" className="w-full mt-2">
                  Manage Vehicles
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default NewRequestForm;
