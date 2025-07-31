import { createContext, useContext, useEffect, useState } from 'react';

export interface Profile {
  id: string;
  name: string;
  email: string;
  role: string;
  industry: string;
  businessName: string;
  avatar?: string;
  preferences: {
    notifications: boolean;
    darkMode: boolean;
    language: string;
    timezone: string;
  };
}

interface ProfileContextType {
  profile: Profile | null;
  setProfile: (profile: Profile | null) => void;
  updateProfile: (updates: Partial<Profile>) => void;
  profiles: Profile[];
  switchProfile: (profileId: string) => void;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

// Demo profiles for different industries
const demoProfiles: Profile[] = [
  {
    id: 'karen-thomas',
    name: 'Karen Thomas',
    email: 'karen@luxuryhomes.com',
    role: 'Real Estate Agent',
    industry: 'Real Estate',
    businessName: 'Luxury Homes Realty',
    preferences: {
      notifications: true,
      darkMode: true,
      language: 'en',
      timezone: 'America/New_York'
    }
  },
  {
    id: 'sarah-wellness',
    name: 'Sarah Mitchell',
    email: 'sarah@serenitymedspA.com',
    role: 'MedSpa Owner',
    industry: 'Health & Wellness',
    businessName: 'Serenity MedSpa',
    preferences: {
      notifications: true,
      darkMode: true,
      language: 'en',
      timezone: 'America/Los_Angeles'
    }
  },
  {
    id: 'marco-restaurant',
    name: 'Marco Rossi',
    email: 'marco@bellaitalia.com',
    role: 'Restaurant Owner',
    industry: 'Food & Beverage',
    businessName: 'Bella Italia',
    preferences: {
      notifications: true,
      darkMode: true,
      language: 'en',
      timezone: 'America/New_York'
    }
  },
  {
    id: 'alex-fitness',
    name: 'Alex Johnson',
    email: 'alex@peakfitness.com',
    role: 'Gym Owner',
    industry: 'Fitness',
    businessName: 'Peak Fitness Studio',
    preferences: {
      notifications: true,
      darkMode: true,
      language: 'en',
      timezone: 'America/Denver'
    }
  },
  {
    id: 'emma-consulting',
    name: 'Emma Davis',
    email: 'emma@strategiconsulting.com',
    role: 'Business Consultant',
    industry: 'Professional Services',
    businessName: 'Strategic Consulting Group',
    preferences: {
      notifications: true,
      darkMode: true,
      language: 'en',
      timezone: 'America/Chicago'
    }
  }
];

export function ProfileProvider({ children }: { children: React.ReactNode }) {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [profiles] = useState<Profile[]>(demoProfiles);

  // Load profile from localStorage on mount
  useEffect(() => {
    const savedProfileId = localStorage.getItem('mavro-profile-id');
    if (savedProfileId) {
      const savedProfile = profiles.find(p => p.id === savedProfileId);
      if (savedProfile) {
        setProfile(savedProfile);
      } else {
        setProfile(profiles[0]); // Default to first profile
      }
    } else {
      setProfile(profiles[0]); // Default to first profile
    }
  }, [profiles]);

  // Save profile to localStorage when changed
  useEffect(() => {
    if (profile) {
      localStorage.setItem('mavro-profile-id', profile.id);
    }
  }, [profile]);

  const updateProfile = (updates: Partial<Profile>) => {
    if (profile) {
      const updatedProfile = { ...profile, ...updates };
      setProfile(updatedProfile);
      
      // Update in profiles array if it exists
      const profileIndex = profiles.findIndex(p => p.id === profile.id);
      if (profileIndex !== -1) {
        profiles[profileIndex] = updatedProfile;
      }
    }
  };

  const switchProfile = (profileId: string) => {
    const newProfile = profiles.find(p => p.id === profileId);
    if (newProfile) {
      setProfile(newProfile);
    }
  };

  return (
    <ProfileContext.Provider value={{ 
      profile, 
      setProfile, 
      updateProfile, 
      profiles, 
      switchProfile 
    }}>
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  const context = useContext(ProfileContext);
  if (context === undefined) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
}