
import React from 'react';
import { Link } from 'react-router-dom';
import { Settings, Users, Truck, FileText } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-maint-gray-100">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-xl font-bold text-maint-blue">MainFlow Connect</h1>
              </div>
            </div>
            <div>
              <Link
                to="/login"
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-maint-blue hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-maint-blue"
              >
                Log In
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero section */}
      <section className="py-12 md:py-20 bg-maint-blue">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Streamlined Maintenance Management System
              </h2>
              <p className="text-lg text-blue-100 mb-8">
                Efficiently manage vehicle maintenance requests, track parts, and oversee repairs with our integrated solution.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Link
                  to="/login"
                  className="inline-flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-maint-blue bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
                >
                  Get Started
                </Link>
                <a
                  href="#features"
                  className="inline-flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-700 bg-opacity-40 hover:bg-opacity-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Learn More
                </a>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="bg-white p-6 rounded-lg shadow-xl">
                <div className="aspect-w-16 aspect-h-9 bg-maint-gray-200 rounded-lg mb-4">
                  <div className="p-4 text-center flex items-center justify-center h-full">
                    <span className="text-maint-gray-500">Maintenance Dashboard Preview</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-maint-gray-100 rounded p-3 h-20 flex items-center justify-center">
                    <span className="text-sm text-maint-gray-500">Dashboard Overview</span>
                  </div>
                  <div className="bg-maint-gray-100 rounded p-3 h-20 flex items-center justify-center">
                    <span className="text-sm text-maint-gray-500">Maintenance Status</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features section */}
      <section id="features" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-maint-gray-900">Key Features</h2>
            <p className="mt-4 text-xl text-maint-gray-600">
              Our platform offers comprehensive tools for all roles in the maintenance workflow
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-maint-gray-50 p-6 rounded-lg shadow-sm">
              <div className="rounded-full bg-blue-100 w-12 h-12 flex items-center justify-center mb-4">
                <Settings className="h-6 w-6 text-maint-blue" />
              </div>
              <h3 className="text-xl font-medium text-maint-gray-900 mb-2">Admin Controls</h3>
              <ul className="space-y-2 text-maint-gray-600">
                <li className="flex items-start">
                  <span className="text-maint-blue mr-2">•</span>
                  <span>Excel contract uploads with automatic processing</span>
                </li>
                <li className="flex items-start">
                  <span className="text-maint-blue mr-2">•</span>
                  <span>Budget management and allocation</span>
                </li>
                <li className="flex items-start">
                  <span className="text-maint-blue mr-2">•</span>
                  <span>Representative assignment by region</span>
                </li>
                <li className="flex items-start">
                  <span className="text-maint-blue mr-2">•</span>
                  <span>Comprehensive analytics dashboard</span>
                </li>
              </ul>
            </div>

            <div className="bg-maint-gray-50 p-6 rounded-lg shadow-sm">
              <div className="rounded-full bg-green-100 w-12 h-12 flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-maint-teal" />
              </div>
              <h3 className="text-xl font-medium text-maint-gray-900 mb-2">Client Portal</h3>
              <ul className="space-y-2 text-maint-gray-600">
                <li className="flex items-start">
                  <span className="text-maint-teal mr-2">•</span>
                  <span>Easy maintenance request submission</span>
                </li>
                <li className="flex items-start">
                  <span className="text-maint-teal mr-2">•</span>
                  <span>Vehicle information management</span>
                </li>
                <li className="flex items-start">
                  <span className="text-maint-teal mr-2">•</span>
                  <span>Parts selection and authorization</span>
                </li>
                <li className="flex items-start">
                  <span className="text-maint-teal mr-2">•</span>
                  <span>Budget tracking and request history</span>
                </li>
              </ul>
            </div>

            <div className="bg-maint-gray-50 p-6 rounded-lg shadow-sm">
              <div className="rounded-full bg-orange-100 w-12 h-12 flex items-center justify-center mb-4">
                <Truck className="h-6 w-6 text-maint-orange" />
              </div>
              <h3 className="text-xl font-medium text-maint-gray-900 mb-2">Representative Tools</h3>
              <ul className="space-y-2 text-maint-gray-600">
                <li className="flex items-start">
                  <span className="text-maint-orange mr-2">•</span>
                  <span>Task management and scheduling</span>
                </li>
                <li className="flex items-start">
                  <span className="text-maint-orange mr-2">•</span>
                  <span>Parts delivery tracking</span>
                </li>
                <li className="flex items-start">
                  <span className="text-maint-orange mr-2">•</span>
                  <span>Installation documentation</span>
                </li>
                <li className="flex items-start">
                  <span className="text-maint-orange mr-2">•</span>
                  <span>Performance analytics</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Process section */}
      <section className="py-16 bg-maint-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-maint-gray-900">How It Works</h2>
            <p className="mt-4 text-xl text-maint-gray-600">
              A streamlined workflow for maintenance request processing
            </p>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div className="w-full md:w-auto mb-8 md:mb-0">
              <div className="relative">
                {/* Process steps */}
                <div className="hidden md:block w-full h-2 bg-maint-gray-200 absolute top-1/4 transform -translate-y-1/2 z-0"></div>
                
                <div className="flex flex-col md:flex-row justify-between relative z-10">
                  <div className="flex flex-col items-center mb-8 md:mb-0 md:w-40 mx-3">
                    <div className="rounded-full bg-maint-blue text-white w-12 h-12 flex items-center justify-center mb-2">
                      1
                    </div>
                    <h3 className="text-lg font-medium text-maint-gray-900 text-center">Request Submission</h3>
                    <p className="text-sm text-maint-gray-600 text-center mt-2">Client submits maintenance request</p>
                  </div>
                  
                  <div className="flex flex-col items-center mb-8 md:mb-0 md:w-40 mx-3">
                    <div className="rounded-full bg-maint-blue text-white w-12 h-12 flex items-center justify-center mb-2">
                      2
                    </div>
                    <h3 className="text-lg font-medium text-maint-gray-900 text-center">Admin Review</h3>
                    <p className="text-sm text-maint-gray-600 text-center mt-2">Admin approves or rejects request</p>
                  </div>
                  
                  <div className="flex flex-col items-center mb-8 md:mb-0 md:w-40 mx-3">
                    <div className="rounded-full bg-maint-blue text-white w-12 h-12 flex items-center justify-center mb-2">
                      3
                    </div>
                    <h3 className="text-lg font-medium text-maint-gray-900 text-center">Representative Assigned</h3>
                    <p className="text-sm text-maint-gray-600 text-center mt-2">Task assigned by region</p>
                  </div>
                  
                  <div className="flex flex-col items-center mb-8 md:mb-0 md:w-40 mx-3">
                    <div className="rounded-full bg-maint-blue text-white w-12 h-12 flex items-center justify-center mb-2">
                      4
                    </div>
                    <h3 className="text-lg font-medium text-maint-gray-900 text-center">Execution</h3>
                    <p className="text-sm text-maint-gray-600 text-center mt-2">Parts delivery and installation</p>
                  </div>
                  
                  <div className="flex flex-col items-center md:w-40 mx-3">
                    <div className="rounded-full bg-maint-blue text-white w-12 h-12 flex items-center justify-center mb-2">
                      5
                    </div>
                    <h3 className="text-lg font-medium text-maint-gray-900 text-center">Documentation</h3>
                    <p className="text-sm text-maint-gray-600 text-center mt-2">Records and closure</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <div className="inline-flex items-center p-4 bg-blue-50 rounded-lg">
              <FileText className="h-6 w-6 text-maint-blue mr-3" />
              <p className="text-maint-blue">
                WhatsApp notifications are sent automatically at each stage of the process
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA section */}
      <section className="py-16 bg-maint-blue">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to streamline your maintenance operations?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Join organizations that have simplified their maintenance workflows and improved operational efficiency.
          </p>
          <Link
            to="/login"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-maint-blue bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
          >
            Get Started Today
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-maint-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <h3 className="text-xl font-bold mb-4">MainFlow Connect</h3>
              <p className="text-maint-gray-400 mb-4">
                A comprehensive maintenance management system designed for efficiency and reliability.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-medium mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-maint-gray-400 hover:text-white">About Us</a></li>
                <li><a href="#" className="text-maint-gray-400 hover:text-white">Features</a></li>
                <li><Link to="/login" className="text-maint-gray-400 hover:text-white">Login</Link></li>
                <li><a href="#" className="text-maint-gray-400 hover:text-white">Support</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-medium mb-4">Contact</h4>
              <ul className="space-y-2 text-maint-gray-400">
                <li>Email: info@mainflow-connect.com</li>
                <li>Phone: +1 (555) 123-4567</li>
                <li>Address: 123 Maintenance Ave, Suite 100</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-maint-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-maint-gray-500 mb-4 md:mb-0">
              © 2025 MainFlow Connect. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-maint-gray-500 hover:text-white">Privacy</a>
              <a href="#" className="text-maint-gray-500 hover:text-white">Terms</a>
              <a href="#" className="text-maint-gray-500 hover:text-white">Cookies</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
