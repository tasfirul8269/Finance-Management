import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Client {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  company: string;
  totalProjects: number;
  totalRevenue: number;
  status: 'active' | 'inactive';
  joinDate: string;
  lastProject: string;
  notes: string;
}

interface Proposal {
  id: number;
  title: string;
  client: string;
  totalBudget: number;
  status: 'draft' | 'sent' | 'approved' | 'rejected';
  createdDate: string;
  features: Array<{
    name: string;
    hours: number;
    rate: number;
  }>;
}

interface TeamMember {
  id: number;
  name: string;
  role: string;
  salaryPercentage: number;
  email: string;
}

interface Invoice {
  id: string;
  clientName: string;
  clientEmail: string;
  projectName: string;
  amount: number;
  status: 'draft' | 'sent' | 'paid' | 'overdue';
  issueDate: string;
  dueDate: string;
  paidDate: string | null;
  items: Array<{
    description: string;
    quantity: number;
    rate: number;
    amount: number;
  }>;
}

interface Transaction {
  id: number;
  type: 'income' | 'expense';
  title: string;
  client: string;
  amount: number;
  date: string;
  category: string;
  description: string;
  invoiceGenerated: boolean;
  status: string;
}

interface AppContextType {
  clients: Client[];
  setClients: React.Dispatch<React.SetStateAction<Client[]>>;
  proposals: Proposal[];
  setProposals: React.Dispatch<React.SetStateAction<Proposal[]>>;
  teamMembers: TeamMember[];
  setTeamMembers: React.Dispatch<React.SetStateAction<TeamMember[]>>;
  invoices: Invoice[];
  setInvoices: React.Dispatch<React.SetStateAction<Invoice[]>>;
  transactions: Transaction[];
  setTransactions: React.Dispatch<React.SetStateAction<Transaction[]>>;
  revenueSettings: {
    fundPercentage: number;
    salaryPercentage: number;
    monthlyRevenue: number;
  };
  setRevenueSettings: React.Dispatch<React.SetStateAction<{
    fundPercentage: number;
    salaryPercentage: number;
    monthlyRevenue: number;
  }>>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [clients, setClients] = useState<Client[]>([
    {
      id: 1,
      name: 'TechCorp Solutions',
      email: 'contact@techcorp.com',
      phone: '+1 (555) 123-4567',
      address: '123 Tech Street, Silicon Valley, CA 94025',
      company: 'TechCorp Inc.',
      totalProjects: 5,
      totalRevenue: 125000,
      status: 'active',
      joinDate: '2024-01-15',
      lastProject: '2025-01-10',
      notes: 'Great client, always pays on time. Prefers modern designs.'
    },
    {
      id: 2,
      name: 'StartupXYZ',
      email: 'hello@startupxyz.com',
      phone: '+1 (555) 987-6543',
      address: '456 Innovation Ave, Austin, TX 78701',
      company: 'StartupXYZ LLC',
      totalProjects: 3,
      totalRevenue: 85000,
      status: 'active',
      joinDate: '2024-03-22',
      lastProject: '2025-01-08',
      notes: 'Fast-growing startup, requires quick turnarounds.'
    },
    {
      id: 3,
      name: 'Design Studio Pro',
      email: 'info@designstudio.com',
      phone: '+1 (555) 456-7890',
      address: '789 Creative Blvd, New York, NY 10001',
      company: 'Design Studio Pro',
      totalProjects: 8,
      totalRevenue: 245000,
      status: 'active',
      joinDate: '2023-11-10',
      lastProject: '2025-01-05',
      notes: 'Established agency, focuses on brand identity projects.'
    }
  ]);

  const [proposals, setProposals] = useState<Proposal[]>([
    {
      id: 1,
      title: 'E-commerce Website Redesign',
      client: 'TechCorp Solutions',
      totalBudget: 45000,
      status: 'draft',
      createdDate: '2025-01-10',
      features: [
        { name: 'Homepage Design', hours: 40, rate: 100 },
        { name: 'Product Pages', hours: 60, rate: 100 },
        { name: 'Shopping Cart', hours: 80, rate: 120 },
        { name: 'Payment Integration', hours: 50, rate: 120 },
      ]
    }
  ]);

  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
    { id: 1, name: 'John Doe', role: 'CEO', salaryPercentage: 12.5, email: 'john@company.com' },
    { id: 2, name: 'Jane Smith', role: 'CTO', salaryPercentage: 12.5, email: 'jane@company.com' },
    { id: 3, name: 'Mike Johnson', role: 'Lead Developer', salaryPercentage: 7.5, email: 'mike@company.com' },
    { id: 4, name: 'Sarah Wilson', role: 'UI/UX Designer', salaryPercentage: 7.5, email: 'sarah@company.com' },
  ]);

  const [invoices, setInvoices] = useState<Invoice[]>([
    {
      id: 'INV-2025-001',
      clientName: 'TechCorp Solutions',
      clientEmail: 'contact@techcorp.com',
      projectName: 'E-commerce Platform',
      amount: 15000,
      status: 'paid',
      issueDate: '2025-01-10',
      dueDate: '2025-02-09',
      paidDate: '2025-01-15',
      items: [
        { description: 'Homepage Design', quantity: 1, rate: 5000, amount: 5000 },
        { description: 'Product Pages', quantity: 1, rate: 6000, amount: 6000 },
        { description: 'Shopping Cart', quantity: 1, rate: 4000, amount: 4000 }
      ]
    }
  ]);

  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: 1,
      type: 'income',
      title: 'E-commerce Website Project',
      client: 'TechCorp Solutions',
      amount: 15000,
      date: '2025-01-15',
      category: 'Project Revenue',
      description: 'Homepage and product pages development',
      invoiceGenerated: true,
      status: 'completed'
    }
  ]);

  const [revenueSettings, setRevenueSettings] = useState({
    fundPercentage: 60,
    salaryPercentage: 40,
    monthlyRevenue: 120000
  });

  return (
    <AppContext.Provider value={{
      clients,
      setClients,
      proposals,
      setProposals,
      teamMembers,
      setTeamMembers,
      invoices,
      setInvoices,
      transactions,
      setTransactions,
      revenueSettings,
      setRevenueSettings
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};