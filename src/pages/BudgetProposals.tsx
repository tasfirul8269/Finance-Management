import React, { useState } from 'react';
import { Plus, Search, Filter, Eye, Edit, Trash2, Send, DollarSign, Mail, Phone } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import Modal from '../components/ui/Modal';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Select from '../components/ui/Select';
import Card from '../components/ui/Card';

const BudgetProposals = () => {
  const { proposals, setProposals, clients, setClients } = useApp();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showClientModal, setShowClientModal] = useState(false);
  const [showSendModal, setShowSendModal] = useState(false);
  const [selectedProposal, setSelectedProposal] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const [newProposal, setNewProposal] = useState({
    title: '',
    client: '',
    features: [{ name: '', hours: 0, rate: 0 }]
  });

  const [newClient, setNewClient] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    company: '',
    notes: ''
  });

  const [emailData, setEmailData] = useState({
    to: '',
    subject: '',
    message: ''
  });

  const addFeature = () => {
    setNewProposal({
      ...newProposal,
      features: [...newProposal.features, { name: '', hours: 0, rate: 0 }]
    });
  };

  const removeFeature = (index: number) => {
    if (newProposal.features.length > 1) {
      const updatedFeatures = newProposal.features.filter((_, i) => i !== index);
      setNewProposal({ ...newProposal, features: updatedFeatures });
    }
  };

  const updateFeature = (index: number, field: string, value: string | number) => {
    const updatedFeatures = newProposal.features.map((feature, i) => 
      i === index ? { ...feature, [field]: value } : feature
    );
    setNewProposal({ ...newProposal, features: updatedFeatures });
  };

  const calculateTotal = () => {
    return newProposal.features.reduce((total, feature) => 
      total + (feature.hours * feature.rate), 0
    );
  };

  const handleClientSelect = (clientName: string) => {
    if (clientName === 'add_new') {
      setShowClientModal(true);
    } else {
      setNewProposal({ ...newProposal, client: clientName });
    }
  };

  const handleAddClient = (e: React.FormEvent) => {
    e.preventDefault();
    const newId = Math.max(...clients.map(c => c.id)) + 1;
    const client = {
      ...newClient,
      id: newId,
      totalProjects: 0,
      totalRevenue: 0,
      status: 'active' as const,
      joinDate: new Date().toISOString().split('T')[0],
      lastProject: '',
    };
    setClients([...clients, client]);
    setNewProposal({ ...newProposal, client: newClient.name });
    setNewClient({ name: '', email: '', phone: '', address: '', company: '', notes: '' });
    setShowClientModal(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const totalBudget = calculateTotal();
    const newId = Math.max(...proposals.map(p => p.id)) + 1;
    
    setProposals([...proposals, {
      id: newId,
      title: newProposal.title,
      client: newProposal.client,
      totalBudget,
      status: 'draft',
      createdDate: new Date().toISOString().split('T')[0],
      features: newProposal.features
    }]);

    setNewProposal({
      title: '',
      client: '',
      features: [{ name: '', hours: 0, rate: 0 }]
    });
    setShowCreateModal(false);
  };

  const handleSendProposal = (proposal: any) => {
    const client = clients.find(c => c.name === proposal.client);
    setEmailData({
      to: client?.email || '',
      subject: `Proposal: ${proposal.title}`,
      message: `Dear ${proposal.client},\n\nPlease find attached our proposal for "${proposal.title}".\n\nTotal Budget: $${proposal.totalBudget.toLocaleString()}\n\nWe look forward to working with you.\n\nBest regards,\nFrooxi Finance Team`
    });
    setSelectedProposal(proposal);
    setShowSendModal(true);
  };

  const sendEmail = () => {
    // Update proposal status to sent
    setProposals(proposals.map(p => 
      p.id === selectedProposal.id ? { ...p, status: 'sent' } : p
    ));
    
    // In a real app, you would send the email here
    alert('Proposal sent successfully!');
    setShowSendModal(false);
    setSelectedProposal(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft': return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
      case 'sent': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'approved': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'rejected': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  const filteredProposals = proposals.filter(proposal => {
    const matchesSearch = proposal.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         proposal.client.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || proposal.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const clientOptions = [
    ...clients.map(client => ({ value: client.name, label: client.name })),
    { value: 'add_new', label: '+ Add New Client' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Budget Proposals</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Create and manage project proposals with detailed budgets</p>
        </div>
        <Button
          onClick={() => setShowCreateModal(true)}
          icon={Plus}
          className="mt-4 sm:mt-0"
        >
          New Proposal
        </Button>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search proposals..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-3 w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900 dark:text-white"
          />
        </div>
        <Select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          options={[
            { value: 'all', label: 'All Status' },
            { value: 'draft', label: 'Draft' },
            { value: 'sent', label: 'Sent' },
            { value: 'approved', label: 'Approved' },
            { value: 'rejected', label: 'Rejected' }
          ]}
          className="sm:w-48"
        />
      </div>

      {/* Proposals Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredProposals.map((proposal) => (
          <Card key={proposal.id} hover className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">{proposal.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{proposal.client}</p>
              </div>
              <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(proposal.status)}`}>
                {proposal.status}
              </span>
            </div>
            
            <div className="mb-4">
              <div className="flex items-center mb-2">
                <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                <span className="text-2xl font-bold text-gray-900 dark:text-white">${proposal.totalBudget.toLocaleString()}</span>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Total project budget</p>
            </div>

            <div className="mb-4">
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Features ({proposal.features.length})</p>
              <div className="space-y-1">
                {proposal.features.slice(0, 3).map((feature, index) => (
                  <div key={index} className="flex justify-between text-xs">
                    <span className="text-gray-600 dark:text-gray-400">{feature.name}</span>
                    <span className="text-gray-900 dark:text-white font-medium">${(feature.hours * feature.rate).toLocaleString()}</span>
                  </div>
                ))}
                {proposal.features.length > 3 && (
                  <p className="text-xs text-gray-500 dark:text-gray-400">+{proposal.features.length - 3} more features</p>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {new Date(proposal.createdDate).toLocaleDateString()}
              </span>
              <div className="flex items-center space-x-2">
                <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors">
                  <Eye className="w-4 h-4" />
                </button>
                <button className="p-2 text-gray-400 hover:text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-lg transition-colors">
                  <Edit className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => handleSendProposal(proposal)}
                  className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
                <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Create Proposal Modal */}
      <Modal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        title="Create New Proposal"
        size="lg"
      >
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Project Title"
              value={newProposal.title}
              onChange={(e) => setNewProposal({ ...newProposal, title: e.target.value })}
              placeholder="e.g., E-commerce Website Redesign"
              required
            />
            <Select
              label="Client"
              value={newProposal.client}
              onChange={(e) => handleClientSelect(e.target.value)}
              options={clientOptions}
              placeholder="Select a client"
              required
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Project Features</h3>
              <Button
                type="button"
                onClick={addFeature}
                variant="ghost"
                size="sm"
              >
                + Add Feature
              </Button>
            </div>
            
            <div className="space-y-4">
              {newProposal.features.map((feature, index) => (
                <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 border border-gray-200 dark:border-gray-700 rounded-xl">
                  <Input
                    label="Feature Name"
                    value={feature.name}
                    onChange={(e) => updateFeature(index, 'name', e.target.value)}
                    placeholder="e.g., Homepage Design"
                    className="md:col-span-2"
                    required
                  />
                  <Input
                    label="Hours"
                    type="number"
                    value={feature.hours}
                    onChange={(e) => updateFeature(index, 'hours', parseInt(e.target.value) || 0)}
                    min="0"
                    required
                  />
                  <div className="flex gap-2">
                    <Input
                      label="Rate ($)"
                      type="number"
                      value={feature.rate}
                      onChange={(e) => updateFeature(index, 'rate', parseInt(e.target.value) || 0)}
                      min="0"
                      required
                    />
                    {newProposal.features.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeFeature(index)}
                        className="mt-8 p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Card className="p-4">
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold text-gray-900 dark:text-white">Total Budget:</span>
              <span className="text-2xl font-bold text-purple-600">${calculateTotal().toLocaleString()}</span>
            </div>
          </Card>

          <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200 dark:border-gray-700">
            <Button
              type="button"
              onClick={() => setShowCreateModal(false)}
              variant="secondary"
            >
              Cancel
            </Button>
            <Button type="submit">
              Create Proposal
            </Button>
          </div>
        </form>
      </Modal>

      {/* Add Client Modal */}
      <Modal
        isOpen={showClientModal}
        onClose={() => setShowClientModal(false)}
        title="Add New Client"
      >
        <form onSubmit={handleAddClient} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Client Name"
              value={newClient.name}
              onChange={(e) => setNewClient({ ...newClient, name: e.target.value })}
              required
            />
            <Input
              label="Company"
              value={newClient.company}
              onChange={(e) => setNewClient({ ...newClient, company: e.target.value })}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Email"
              type="email"
              value={newClient.email}
              onChange={(e) => setNewClient({ ...newClient, email: e.target.value })}
              required
            />
            <Input
              label="Phone"
              type="tel"
              value={newClient.phone}
              onChange={(e) => setNewClient({ ...newClient, phone: e.target.value })}
              required
            />
          </div>

          <Input
            label="Address"
            value={newClient.address}
            onChange={(e) => setNewClient({ ...newClient, address: e.target.value })}
            required
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Notes
            </label>
            <textarea
              value={newClient.notes}
              onChange={(e) => setNewClient({ ...newClient, notes: e.target.value })}
              rows={3}
              className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              placeholder="Any additional notes about the client..."
            />
          </div>

          <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200 dark:border-gray-700">
            <Button
              type="button"
              onClick={() => setShowClientModal(false)}
              variant="secondary"
            >
              Cancel
            </Button>
            <Button type="submit">
              Add Client
            </Button>
          </div>
        </form>
      </Modal>

      {/* Send Proposal Modal */}
      <Modal
        isOpen={showSendModal}
        onClose={() => setShowSendModal(false)}
        title="Send Proposal via Email"
      >
        <div className="p-6 space-y-6">
          <Input
            label="To"
            type="email"
            value={emailData.to}
            onChange={(e) => setEmailData({ ...emailData, to: e.target.value })}
            required
          />
          
          <Input
            label="Subject"
            value={emailData.subject}
            onChange={(e) => setEmailData({ ...emailData, subject: e.target.value })}
            required
          />
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Message
            </label>
            <textarea
              value={emailData.message}
              onChange={(e) => setEmailData({ ...emailData, message: e.target.value })}
              rows={6}
              className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              required
            />
          </div>

          <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200 dark:border-gray-700">
            <Button
              type="button"
              onClick={() => setShowSendModal(false)}
              variant="secondary"
            >
              Cancel
            </Button>
            <Button
              onClick={sendEmail}
              icon={Mail}
            >
              Send Email
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default BudgetProposals;