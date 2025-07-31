import { useState, useEffect } from 'react';
// Authentication removed - no longer needed

interface UserPersona {
  name: string;
  business: string;
  industry: string;
  businessType: string;
  goals: string[];
  challenges: string[];
  budget: string;
  teamSize: string;
  brandVoice: string;
  targetAudience: string;
  contentTypes: string[];
  communicationStyle: string;
}

export function useUserPersona() {
  // Simplified without authentication
  const [userPersona, setUserPersona] = useState<UserPersona | null>(null);

  useEffect(() => {
    // Try to get user persona from localStorage (from onboarding)
    const storedOnboardingData = localStorage.getItem('onboardingData');
    const storedViviProfile = localStorage.getItem('viviProfile');
    
    if (storedOnboardingData) {
      const onboardingData = JSON.parse(storedOnboardingData);
      const persona: UserPersona = {
        name: 'User',
        business: onboardingData.businessName || 'My Business',
        industry: onboardingData.industry || 'General',
        businessType: onboardingData.businessType || 'Service Provider',
        goals: onboardingData.goals || ['Lead Generation', 'Brand Awareness'],
        challenges: onboardingData.currentChallenges || ['Time Constraints', 'Content Creation'],
        budget: onboardingData.monthlyBudget || '$1,000 - $5,000',
        teamSize: onboardingData.teamSize || '1-5 employees',
        brandVoice: onboardingData.brandVoice || 'Professional',
        targetAudience: onboardingData.targetAudience || 'Business professionals',
        contentTypes: onboardingData.contentPreferences || ['Social Media Posts', 'Blog Articles'],
        communicationStyle: onboardingData.communicationStyle || 'Direct and informative'
      };
      setUserPersona(persona);
    } else {
      // Fallback: create basic default persona
      const basicPersona: UserPersona = {
        name: 'User',
        business: 'My Business',
        industry: 'General',
        businessType: 'Service Provider',
        goals: ['Lead Generation', 'Brand Awareness'],
        challenges: ['Time Constraints', 'Content Creation'],
        budget: '$1,000 - $5,000',
        teamSize: '1-5 employees',
        brandVoice: 'Professional',
        targetAudience: 'Business professionals',
        contentTypes: ['Social Media Posts', 'Blog Articles'],
        communicationStyle: 'Direct and informative'
      };
      setUserPersona(basicPersona);
    }
  }, []);

  return { userPersona, setUserPersona };
}