
import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { useToast } from '@/hooks/use-toast';
import { FileText, Upload, CheckCircle, AlertCircle, Info } from 'lucide-react';

const ContractUploadPage: React.FC = () => {
  const { toast } = useToast();
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStep, setUploadStep] = useState(0);
  const [fileName, setFileName] = useState('');
  const [uploadSuccess, setUploadSuccess] = useState(false);
  
  // Simulated validation results
  const validationResults = {
    contracts: { valid: 15, invalid: 0 },
    clients: { valid: 8, invalid: 0 },
    budgets: { valid: 15, invalid: 0 },
    parts: { valid: 42, invalid: 3 },
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
    }
  };

  const simulateUpload = () => {
    setIsUploading(true);
    setUploadStep(1);
    
    // Simulate file validation
    setTimeout(() => {
      setUploadStep(2);
      
      // Simulate processing
      setTimeout(() => {
        setUploadStep(3);
        setIsUploading(false);
        setUploadSuccess(true);
        
        toast({
          title: "Upload Successful",
          description: "The contract data has been successfully imported.",
        });
      }, 2000);
    }, 2000);
  };

  const resetUpload = () => {
    setFileName('');
    setUploadStep(0);
    setUploadSuccess(false);
  };

  return (
    <DashboardLayout userRole="admin">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-maint-gray-800">Upload Contract Data</h2>
        <p className="text-maint-gray-600">Import contracts, clients, budgets and parts from Excel</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="mb-6">
              <h3 className="text-lg font-medium text-maint-gray-800 mb-2">Upload Excel File</h3>
              <p className="text-sm text-maint-gray-600">
                Upload an Excel file containing contract data with the required format. The system will process
                and import the data into the database.
              </p>
            </div>
            
            {!uploadSuccess ? (
              <>
                <div className="mb-6">
                  <div className="border-2 border-dashed border-maint-gray-300 rounded-lg p-6 flex flex-col items-center justify-center">
                    <Upload className="h-12 w-12 text-maint-gray-400 mb-4" />
                    <p className="text-sm text-maint-gray-600 mb-2">
                      {fileName ? fileName : 'Drag and drop your Excel file here, or click to browse'}
                    </p>
                    <input
                      type="file"
                      id="file-upload"
                      className="hidden"
                      accept=".xlsx,.xls"
                      onChange={handleFileChange}
                    />
                    <label
                      htmlFor="file-upload"
                      className="px-4 py-2 bg-maint-blue text-white rounded-md hover:bg-blue-700 transition-colors duration-200 cursor-pointer text-sm"
                    >
                      Select File
                    </label>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <button
                    disabled={!fileName || isUploading}
                    onClick={simulateUpload}
                    className={`px-6 py-2 bg-maint-blue text-white rounded-md hover:bg-blue-700 transition-colors duration-200 ${
                      !fileName || isUploading ? 'opacity-70 cursor-not-allowed' : ''
                    }`}
                  >
                    {isUploading ? 'Processing...' : 'Upload and Process'}
                  </button>
                </div>
                
                {uploadStep > 0 && (
                  <div className="mt-8">
                    <h4 className="text-md font-medium text-maint-gray-800 mb-4">Upload Progress</h4>
                    
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <div className={`rounded-full flex items-center justify-center h-6 w-6 ${
                          uploadStep >= 1 ? 'bg-maint-blue text-white' : 'bg-maint-gray-200 text-maint-gray-400'
                        }`}>
                          <span className="text-xs">1</span>
                        </div>
                        <div className="ml-3">
                          <p className={`text-sm font-medium ${uploadStep >= 1 ? 'text-maint-gray-900' : 'text-maint-gray-500'}`}>
                            Validating file format
                          </p>
                          {uploadStep === 1 && (
                            <p className="text-xs text-maint-gray-500 mt-1">
                              Checking Excel structure and required columns...
                            </p>
                          )}
                          {uploadStep > 1 && (
                            <p className="text-xs text-maint-teal mt-1">
                              <CheckCircle className="inline-block w-3 h-3 mr-1" />
                              File format is valid
                            </p>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className={`rounded-full flex items-center justify-center h-6 w-6 ${
                          uploadStep >= 2 ? 'bg-maint-blue text-white' : 'bg-maint-gray-200 text-maint-gray-400'
                        }`}>
                          <span className="text-xs">2</span>
                        </div>
                        <div className="ml-3">
                          <p className={`text-sm font-medium ${uploadStep >= 2 ? 'text-maint-gray-900' : 'text-maint-gray-500'}`}>
                            Processing data
                          </p>
                          {uploadStep === 2 && (
                            <p className="text-xs text-maint-gray-500 mt-1">
                              Reading contracts, clients, budgets and parts data...
                            </p>
                          )}
                          {uploadStep > 2 && (
                            <p className="text-xs text-maint-teal mt-1">
                              <CheckCircle className="inline-block w-3 h-3 mr-1" />
                              Data processed successfully
                            </p>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className={`rounded-full flex items-center justify-center h-6 w-6 ${
                          uploadStep >= 3 ? 'bg-maint-blue text-white' : 'bg-maint-gray-200 text-maint-gray-400'
                        }`}>
                          <span className="text-xs">3</span>
                        </div>
                        <div className="ml-3">
                          <p className={`text-sm font-medium ${uploadStep >= 3 ? 'text-maint-gray-900' : 'text-maint-gray-500'}`}>
                            Importing to database
                          </p>
                          {uploadStep === 3 && (
                            <p className="text-xs text-maint-gray-500 mt-1">
                              Saving data to the database...
                            </p>
                          )}
                          {uploadStep > 3 && (
                            <p className="text-xs text-maint-teal mt-1">
                              <CheckCircle className="inline-block w-3 h-3 mr-1" />
                              Import completed
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="mt-4">
                <div className="bg-green-50 border-l-4 border-maint-teal p-4 mb-6">
                  <div className="flex items-center">
                    <CheckCircle className="h-6 w-6 text-maint-teal mr-3" />
                    <div>
                      <p className="font-medium text-maint-teal">Upload Successful</p>
                      <p className="text-sm text-maint-gray-600 mt-1">
                        The file {fileName} has been successfully processed and imported.
                      </p>
                    </div>
                  </div>
                </div>
                
                <h4 className="text-md font-medium text-maint-gray-800 mb-4">Import Summary</h4>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  <div className="bg-maint-gray-50 p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-maint-gray-700">Contracts</span>
                      <span className="text-maint-blue font-medium">{validationResults.contracts.valid}</span>
                    </div>
                    <div className="text-xs text-maint-gray-500">
                      {validationResults.contracts.invalid > 0 ? (
                        <p className="text-yellow-600">
                          <AlertCircle className="inline-block w-3 h-3 mr-1" />
                          {validationResults.contracts.invalid} records with warnings
                        </p>
                      ) : (
                        <p className="text-maint-teal">
                          <CheckCircle className="inline-block w-3 h-3 mr-1" />
                          All records imported successfully
                        </p>
                      )}
                    </div>
                  </div>
                  
                  <div className="bg-maint-gray-50 p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-maint-gray-700">Clients</span>
                      <span className="text-maint-blue font-medium">{validationResults.clients.valid}</span>
                    </div>
                    <div className="text-xs text-maint-gray-500">
                      {validationResults.clients.invalid > 0 ? (
                        <p className="text-yellow-600">
                          <AlertCircle className="inline-block w-3 h-3 mr-1" />
                          {validationResults.clients.invalid} records with warnings
                        </p>
                      ) : (
                        <p className="text-maint-teal">
                          <CheckCircle className="inline-block w-3 h-3 mr-1" />
                          All records imported successfully
                        </p>
                      )}
                    </div>
                  </div>
                  
                  <div className="bg-maint-gray-50 p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-maint-gray-700">Budgets</span>
                      <span className="text-maint-blue font-medium">{validationResults.budgets.valid}</span>
                    </div>
                    <div className="text-xs text-maint-gray-500">
                      {validationResults.budgets.invalid > 0 ? (
                        <p className="text-yellow-600">
                          <AlertCircle className="inline-block w-3 h-3 mr-1" />
                          {validationResults.budgets.invalid} records with warnings
                        </p>
                      ) : (
                        <p className="text-maint-teal">
                          <CheckCircle className="inline-block w-3 h-3 mr-1" />
                          All records imported successfully
                        </p>
                      )}
                    </div>
                  </div>
                  
                  <div className="bg-maint-gray-50 p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-maint-gray-700">Parts</span>
                      <span className="text-maint-blue font-medium">{validationResults.parts.valid}</span>
                    </div>
                    <div className="text-xs text-text-yellow-600">
                      <AlertCircle className="inline-block w-3 h-3 mr-1" />
                      {validationResults.parts.invalid} records with warnings
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <button
                    onClick={resetUpload}
                    className="px-6 py-2 bg-maint-blue text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
                  >
                    Upload Another File
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
        
        <div>
          <div className="bg-white rounded-lg shadow-md p-5">
            <h3 className="text-lg font-medium text-maint-gray-800 mb-4">Instructions</h3>
            
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-maint-gray-700 mb-2">File Requirements</h4>
                <ul className="list-disc pl-5 text-sm text-maint-gray-600 space-y-1">
                  <li>Excel format (.xlsx or .xls)</li>
                  <li>Maximum file size: 10MB</li>
                  <li>Must contain required sheets</li>
                </ul>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-maint-gray-700 mb-2">Required Sheets</h4>
                <ul className="text-sm text-maint-gray-600 space-y-2">
                  <li className="flex items-start">
                    <FileText className="w-4 h-4 text-maint-blue mr-2 mt-0.5" />
                    <span><strong>Contracts</strong>: ID, Name, Start Date, End Date</span>
                  </li>
                  <li className="flex items-start">
                    <FileText className="w-4 h-4 text-maint-blue mr-2 mt-0.5" />
                    <span><strong>Clients</strong>: ID, Name, Region, Address, Contact</span>
                  </li>
                  <li className="flex items-start">
                    <FileText className="w-4 h-4 text-maint-blue mr-2 mt-0.5" />
                    <span><strong>Budgets</strong>: Contract ID, Monthly Amount</span>
                  </li>
                  <li className="flex items-start">
                    <FileText className="w-4 h-4 text-maint-blue mr-2 mt-0.5" />
                    <span><strong>Parts</strong>: ID, Name, Category, Unit Price</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-blue-50 border-l-4 border-maint-blue p-4">
                <div className="flex">
                  <Info className="h-5 w-5 text-maint-blue mr-3" />
                  <div className="text-sm text-maint-gray-600">
                    <p className="font-medium text-maint-blue mb-1">Important Note</p>
                    <p>
                      Ensure all related data is properly linked using IDs to maintain data integrity.
                      Download the template file for correct formatting.
                    </p>
                  </div>
                </div>
              </div>
              
              <div>
                <button className="w-full flex justify-center items-center px-4 py-2 border border-maint-blue text-maint-blue rounded-md hover:bg-blue-50 transition-colors duration-200">
                  <FileText className="w-4 h-4 mr-2" />
                  Download Template
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ContractUploadPage;
