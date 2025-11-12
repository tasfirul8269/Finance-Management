import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  CheckCircle, 
  BarChart3, 
  Users, 
  Zap, 
  Shield,
  Star,
  Play
} from 'lucide-react';

const LandingPage = () => {
  const features = [
    {
      icon: BarChart3,
      title: 'Smart Budget Planning',
      description: 'Create detailed proposals with feature breakdowns and automatic budget calculations.'
    },
    {
      icon: Users,
      title: 'Team Salary Management',
      description: 'Automated salary calculations based on revenue percentages with role-based distributions.'
    },
    {
      icon: Zap,
      title: 'Automated Invoicing',
      description: 'Generate professional invoices automatically when projects are added to the system.'
    },
    {
      icon: Shield,
      title: 'Client Management',
      description: 'Comprehensive client database with project tracking and financial history.'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'CEO at TechStartup',
      content: 'Frooxi Finance transformed how we manage our agency finances. The automated salary calculations saved us hours every month.',
      rating: 5
    },
    {
      name: 'Michael Chen',
      role: 'CFO at DesignStudio',
      content: 'The budget proposal feature helped us close 40% more deals. Clients love seeing detailed breakdowns.',
      rating: 5
    },
    {
      name: 'Emily Rodriguez',
      role: 'Operations Manager',
      content: 'Finally, a finance tool built for agencies. The client management and invoice automation are game-changers.',
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-gray-200 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">F</span>
              </div>
              <span className="text-xl font-bold text-gray-900">Frooxi Finance</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 hover:text-gray-900 transition-colors">Features</a>
              <a href="#pricing" className="text-gray-600 hover:text-gray-900 transition-colors">Pricing</a>
              <a href="#testimonials" className="text-gray-600 hover:text-gray-900 transition-colors">Testimonials</a>
              <Link 
                to="/register" 
                className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2 rounded-lg hover:shadow-lg transition-all duration-200"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 mb-6">
              Build your <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Finance Future</span> with a secure, reliable platform
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Transform your financial management with our secure platform, offering balanced insights and powerful tools for your success.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/register" 
                className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-lg hover:shadow-lg transition-all duration-200 flex items-center justify-center"
              >
                Get Started
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <button className="border border-gray-300 text-gray-700 px-8 py-4 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center">
                <Play className="mr-2 w-5 h-5" />
                Watch Demo
              </button>
            </div>
          </div>
          
          {/* Dashboard Preview */}
          <div className="mt-16">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-2xl blur-3xl"></div>
              <div className="relative bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
                <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                </div>
                <div className="p-8">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl p-6 text-white">
                      <h3 className="text-sm font-semibold opacity-80">Total Revenue</h3>
                      <p className="text-3xl font-bold">$124,500</p>
                      <p className="text-sm opacity-80">+12.5% from last month</p>
                    </div>
                    <div className="bg-white rounded-xl p-6 border border-gray-200">
                      <h3 className="text-sm font-semibold text-gray-600">Active Projects</h3>
                      <p className="text-3xl font-bold text-gray-900">28</p>
                      <p className="text-sm text-green-600">+5 new this week</p>
                    </div>
                    <div className="bg-white rounded-xl p-6 border border-gray-200">
                      <h3 className="text-sm font-semibold text-gray-600">Team Salary</h3>
                      <p className="text-3xl font-bold text-gray-900">$49,800</p>
                      <p className="text-sm text-gray-500">40% of revenue</p>
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h3 className="font-semibold text-gray-900 mb-4">Recent Activity</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Website redesign proposal sent</span>
                        <span className="text-sm text-gray-400">2 hours ago</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Invoice #1234 paid</span>
                        <span className="text-sm text-gray-400">1 day ago</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">New client added: TechCorp</span>
                        <span className="text-sm text-gray-400">2 days ago</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Everything you need to manage finances
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive tools designed specifically for agencies and businesses
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Trusted by finance teams worldwide
            </h2>
            <p className="text-xl text-gray-600">See what our customers are saying</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">"{testimonial.content}"</p>
                <div>
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to transform your finance management?
          </h2>
          <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
            Join thousands of businesses already using Frooxi Finance to streamline their operations
          </p>
          <Link 
            to="/register" 
            className="bg-white text-purple-600 px-8 py-4 rounded-lg hover:shadow-lg transition-all duration-200 inline-flex items-center font-semibold"
          >
            Start Free Trial
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">F</span>
                </div>
                <span className="text-xl font-bold">Frooxi Finance</span>
              </div>
              <p className="text-gray-400">
                Complete finance management solution for modern businesses.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Features</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Budget Planning</li>
                <li>Salary Management</li>
                <li>Invoice Automation</li>
                <li>Client Management</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Documentation</li>
                <li>Help Center</li>
                <li>Contact Us</li>
                <li>Community</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li>About</li>
                <li>Blog</li>
                <li>Careers</li>
                <li>Privacy Policy</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Frooxi Finance. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;