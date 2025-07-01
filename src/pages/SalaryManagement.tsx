import React, { useState } from 'react';
import { Settings, Users, Calculator, Bell, TrendingUp, Edit, Save, CreditCard, Smartphone } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import Modal from '../components/ui/Modal';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Select from '../components/ui/Select';
import Card from '../components/ui/Card';

const SalaryManagement = () => {
  const { revenueSettings, setRevenueSettings, teamMembers, setTeamMembers } = useApp();
  const [editingSettings, setEditingSettings] = useState(false);
  const [showAddMember, setShowAddMember] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedMember, setSelectedMember] = useState<any>(null);
  
  const [newMember, setNewMember] = useState({ 
    name: '', 
    role: '', 
    salaryPercentage: 0, 
    email: '' 
  });

  const [paymentData, setPaymentData] = useState({
    method: 'bank',
    bankAccount: '',
    bkashNumber: '',
    nagadNumber: '',
    amount: 0
  });

  const calculateSalaryBudget = () => {
    return (revenueSettings.monthlyRevenue * revenueSettings.salaryPercentage) / 100;
  };

  const calculateFundBudget = () => {
    return (revenueSettings.monthlyRevenue * revenueSettings.fundPercentage) / 100;
  };

  const calculateMemberSalary = (percentage: number) => {
    const salaryBudget = calculateSalaryBudget();
    return (salaryBudget * percentage) / 100;
  };

  const getTotalAllocatedPercentage = () => {
    return teamMembers.reduce((total, member) => total + member.salaryPercentage, 0);
  };

  const handleUpdateRevenue = () => {
    setEditingSettings(false);
  };

  const handleAddMember = (e: React.FormEvent) => {
    e.preventDefault();
    const newId = Math.max(...teamMembers.map(m => m.id)) + 1;
    setTeamMembers([...teamMembers, { ...newMember, id: newId }]);
    setNewMember({ name: '', role: '', salaryPercentage: 0, email: '' });
    setShowAddMember(false);
  };

  const updateMemberPercentage = (id: number, percentage: number) => {
    setTeamMembers(teamMembers.map(member => 
      member.id === id ? { ...member, salaryPercentage: percentage } : member
    ));
  };

  const handlePaySalary = (member: any) => {
    setSelectedMember(member);
    setPaymentData({
      ...paymentData,
      amount: calculateMemberSalary(member.salaryPercentage)
    });
    setShowPaymentModal(true);
  };

  const processSalaryPayment = () => {
    // In a real app, you would process the payment here
    alert(`Salary payment of $${paymentData.amount.toLocaleString()} sent to ${selectedMember.name} via ${paymentData.method}`);
    setShowPaymentModal(false);
    setSelectedMember(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Salary Management</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Manage team salaries based on revenue distribution</p>
        </div>
        <div className="flex items-center space-x-3 mt-4 sm:mt-0">
          <Button
            icon={Bell}
            variant="secondary"
          >
            Set Reminders
          </Button>
          <Button
            onClick={() => setShowAddMember(true)}
            icon={Users}
          >
            Add Team Member
          </Button>
        </div>
      </div>

      {/* Revenue Distribution Settings */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Settings className="w-6 h-6 text-purple-600 mr-3" />
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Revenue Distribution Settings</h2>
          </div>
          <Button
            onClick={() => editingSettings ? handleUpdateRevenue() : setEditingSettings(true)}
            icon={editingSettings ? Save : Edit}
            variant="ghost"
          >
            {editingSettings ? 'Save' : 'Edit'}
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm opacity-80">Monthly Revenue</span>
              <TrendingUp className="w-5 h-5" />
            </div>
            {editingSettings ? (
              <input
                type="number"
                value={revenueSettings.monthlyRevenue}
                onChange={(e) => setRevenueSettings({
                  ...revenueSettings,
                  monthlyRevenue: parseInt(e.target.value) || 0
                })}
                className="w-full bg-white/20 border border-white/30 rounded-xl px-3 py-2 text-white placeholder-white/70"
              />
            ) : (
              <div className="text-2xl font-bold">${revenueSettings.monthlyRevenue.toLocaleString()}</div>
            )}
          </Card>

          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm opacity-80">Fund Allocation</span>
              <span className="text-sm font-semibold">{revenueSettings.fundPercentage}%</span>
            </div>
            {editingSettings ? (
              <input
                type="range"
                min="0"
                max="100"
                value={revenueSettings.fundPercentage}
                onChange={(e) => {
                  const fund = parseInt(e.target.value);
                  setRevenueSettings({
                    ...revenueSettings,
                    fundPercentage: fund,
                    salaryPercentage: 100 - fund
                  });
                }}
                className="w-full mb-2"
              />
            ) : null}
            <div className="text-2xl font-bold">${calculateFundBudget().toLocaleString()}</div>
          </Card>

          <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm opacity-80">Salary Budget</span>
              <span className="text-sm font-semibold">{revenueSettings.salaryPercentage}%</span>
            </div>
            {editingSettings ? (
              <input
                type="range"
                min="0"
                max="100"
                value={revenueSettings.salaryPercentage}
                onChange={(e) => {
                  const salary = parseInt(e.target.value);
                  setRevenueSettings({
                    ...revenueSettings,
                    salaryPercentage: salary,
                    fundPercentage: 100 - salary
                  });
                }}
                className="w-full mb-2"
              />
            ) : null}
            <div className="text-2xl font-bold">${calculateSalaryBudget().toLocaleString()}</div>
          </Card>
        </div>
      </Card>

      {/* Team Members */}
      <Card>
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Users className="w-6 h-6 text-purple-600 mr-3" />
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Team Members</h2>
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Allocated: {getTotalAllocatedPercentage()}% of {revenueSettings.salaryPercentage}%
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Team Member</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Salary %</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Monthly Salary</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {teamMembers.map((member) => (
                <tr key={member.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900 dark:text-white">{member.name}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">{member.email}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                    {member.role}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <input
                        type="number"
                        value={member.salaryPercentage}
                        onChange={(e) => updateMemberPercentage(member.id, parseFloat(e.target.value) || 0)}
                        className="w-20 px-2 py-1 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        step="0.1"
                        min="0"
                        max="100"
                      />
                      <span className="text-sm text-gray-500 dark:text-gray-400">%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      ${calculateMemberSalary(member.salaryPercentage).toLocaleString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex space-x-2">
                      <Button
                        onClick={() => handlePaySalary(member)}
                        size="sm"
                        variant="secondary"
                      >
                        Pay Salary
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                      >
                        Edit
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Summary */}
        <div className="p-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">${calculateSalaryBudget().toLocaleString()}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Total Salary Budget</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                ${teamMembers.reduce((total, member) => total + calculateMemberSalary(member.salaryPercentage), 0).toLocaleString()}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Allocated Salaries</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                ${(calculateSalaryBudget() - teamMembers.reduce((total, member) => total + calculateMemberSalary(member.salaryPercentage), 0)).toLocaleString()}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Remaining Budget</div>
            </div>
          </div>
        </div>
      </Card>

      {/* Add Team Member Modal */}
      <Modal
        isOpen={showAddMember}
        onClose={() => setShowAddMember(false)}
        title="Add Team Member"
      >
        <form onSubmit={handleAddMember} className="p-6 space-y-4">
          <Input
            label="Name"
            value={newMember.name}
            onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
            required
          />
          <Input
            label="Role"
            value={newMember.role}
            onChange={(e) => setNewMember({ ...newMember, role: e.target.value })}
            required
          />
          <Input
            label="Email"
            type="email"
            value={newMember.email}
            onChange={(e) => setNewMember({ ...newMember, email: e.target.value })}
            required
          />
          <Input
            label="Salary Percentage"
            type="number"
            value={newMember.salaryPercentage}
            onChange={(e) => setNewMember({ ...newMember, salaryPercentage: parseFloat(e.target.value) || 0 })}
            step="0.1"
            min="0"
            max="100"
            required
          />

          <div className="flex justify-end space-x-4 pt-4">
            <Button
              type="button"
              onClick={() => setShowAddMember(false)}
              variant="secondary"
            >
              Cancel
            </Button>
            <Button type="submit">
              Add Member
            </Button>
          </div>
        </form>
      </Modal>

      {/* Payment Modal */}
      <Modal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        title={`Pay Salary - ${selectedMember?.name}`}
      >
        <div className="p-6 space-y-6">
          <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-4">
            <div className="flex justify-between items-center">
              <span className="text-lg font-medium text-gray-900 dark:text-white">Salary Amount:</span>
              <span className="text-2xl font-bold text-purple-600">${paymentData.amount.toLocaleString()}</span>
            </div>
          </div>

          <Select
            label="Payment Method"
            value={paymentData.method}
            onChange={(e) => setPaymentData({ ...paymentData, method: e.target.value })}
            options={[
              { value: 'bank', label: 'Bank Transfer' },
              { value: 'bkash', label: 'bKash' },
              { value: 'nagad', label: 'Nagad' }
            ]}
          />

          {paymentData.method === 'bank' && (
            <Input
              label="Bank Account Number"
              value={paymentData.bankAccount}
              onChange={(e) => setPaymentData({ ...paymentData, bankAccount: e.target.value })}
              placeholder="Enter bank account number"
              required
            />
          )}

          {paymentData.method === 'bkash' && (
            <Input
              label="bKash Number"
              value={paymentData.bkashNumber}
              onChange={(e) => setPaymentData({ ...paymentData, bkashNumber: e.target.value })}
              placeholder="Enter bKash number"
              required
            />
          )}

          {paymentData.method === 'nagad' && (
            <Input
              label="Nagad Number"
              value={paymentData.nagadNumber}
              onChange={(e) => setPaymentData({ ...paymentData, nagadNumber: e.target.value })}
              placeholder="Enter Nagad number"
              required
            />
          )}

          <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200 dark:border-gray-700">
            <Button
              type="button"
              onClick={() => setShowPaymentModal(false)}
              variant="secondary"
            >
              Cancel
            </Button>
            <Button
              onClick={processSalaryPayment}
              icon={paymentData.method === 'bank' ? CreditCard : Smartphone}
            >
              Send Payment
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default SalaryManagement;