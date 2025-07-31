import { createContext, useContext, useEffect, useState } from 'react';

export interface Organization {
  id: string;
  name: string;
  industry: string;
  size: 'small' | 'medium' | 'large';
  settings: {
    primaryColor: string;
    logo?: string;
    timezone: string;
    currency: string;
  };
}

interface OrganizationContextType {
  organization: Organization | null;
  setOrganization: (org: Organization | null) => void;
  updateOrganization: (updates: Partial<Organization>) => void;
}

const OrganizationContext = createContext<OrganizationContextType | undefined>(undefined);

const defaultOrganization: Organization = {
  id: 'demo-org',
  name: 'Demo Organization',
  industry: 'Technology',
  size: 'medium',
  settings: {
    primaryColor: '#ff6b6b',
    timezone: 'UTC',
    currency: 'USD'
  }
};

export function OrganizationProvider({ children }: { children: React.ReactNode }) {
  const [organization, setOrganization] = useState<Organization | null>(null);

  // Load organization from localStorage on mount
  useEffect(() => {
    const savedOrg = localStorage.getItem('mavro-organization');
    if (savedOrg) {
      try {
        setOrganization(JSON.parse(savedOrg));
      } catch (error) {
        console.error('Error loading organization:', error);
        setOrganization(defaultOrganization);
      }
    } else {
      setOrganization(defaultOrganization);
    }
  }, []);

  // Save organization to localStorage when changed
  useEffect(() => {
    if (organization) {
      localStorage.setItem('mavro-organization', JSON.stringify(organization));
    }
  }, [organization]);

  const updateOrganization = (updates: Partial<Organization>) => {
    if (organization) {
      setOrganization({ ...organization, ...updates });
    }
  };

  return (
    <OrganizationContext.Provider value={{ organization, setOrganization, updateOrganization }}>
      {children}
    </OrganizationContext.Provider>
  );
}

export function useOrganization() {
  const context = useContext(OrganizationContext);
  if (context === undefined) {
    throw new Error('useOrganization must be used within an OrganizationProvider');
  }
  return context;
}