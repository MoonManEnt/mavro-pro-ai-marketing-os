import React, { useState } from 'react';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, ArrowRight, Sparkles, Target, TrendingUp, Users } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface OnboardingData {
  businessName: string;
  industry: string;
  businessType: string;
  goals: string[];
  currentChallenges: string[];
  monthlyBudget: string;
  teamSize: string;
  brandVoice: string;
  targetAudience: string;
  contentPreferences: string[];
  communicationStyle: string;
}

const brandVoiceOptions = [
  'Professional and authoritative',
  'Friendly and approachable',
  'Creative and innovative',
  'Trustworthy and reliable',
  'Bold and confident',
  'Warm and personal'
];

const contentPreferenceOptions = [
  'Educational and informative content',
  'Behind-the-scenes content',
  'User-generated content',
  'Promotional and sales-focused',
  'Industry news and trends',
  'Personal stories and experiences'
];

const industries = [
  'Professional Services',
  'Real Estate',
  'Healthcare & MedSpa',
  'Restaurant & Food',
  'Fitness & Wellness',
  'Automotive',
  'E-commerce',
  'Technology',
  'Education',
  'Other'
];

const businessTypes = [
  'Solo Entrepreneur',
  'Small Business (2-10 employees)',
  'Growing Business (11-50 employees)',
  'Established Business (50+ employees)',
  'Agency/Consultant',
  'Franchise'
];

const goalOptions = [
  'Generate high-quality leads consistently',
  'Create viral social media content',
  'Automate repetitive marketing tasks',
  'Improve customer lifetime value',
  'Build authentic brand awareness',
  'Optimize marketing ROI and analytics',
  'Scale content creation efficiently',
  'Expand into new market segments'
];

const challengeOptions = [
  'Time constraints for marketing activities',
  'Limited budget for marketing initiatives',
  'Difficulty tracking and measuring ROI',
  'Inconsistent content creation and quality',
  'Managing multiple social media platforms',
  'Understanding complex analytics data',
  'Poor lead qualification and conversion',
  'Staying ahead of competitor strategies'
];

export default function OnboardingPage() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<OnboardingData>({
    businessName: '',
    industry: '',
    businessType: '',
    goals: [],
    currentChallenges: [],
    monthlyBudget: '',
    teamSize: '',
    brandVoice: '',
    targetAudience: '',
    contentPreferences: [],
    communicationStyle: ''
  });

  const handleGoalToggle = (goal: string) => {
    setFormData(prev => ({
      ...prev,
      goals: prev.goals.includes(goal)
        ? prev.goals.filter(g => g !== goal)
        : [...prev.goals, goal]
    }));
  };

  const handleChallengeToggle = (challenge: string) => {
    setFormData(prev => ({
      ...prev,
      currentChallenges: prev.currentChallenges.includes(challenge)
        ? prev.currentChallenges.filter(c => c !== challenge)
        : [...prev.currentChallenges, challenge]
    }));
  };

  const handleContentPreferenceToggle = (preference: string) => {
    setFormData(prev => ({
      ...prev,
      contentPreferences: prev.contentPreferences.includes(preference)
        ? prev.contentPreferences.filter(p => p !== preference)
        : [...prev.contentPreferences, preference]
    }));
  };

  const handleNext = () => {
    if (currentStep < 6) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handleComplete = async () => {
    try {
      // Create ViVi AI profile based on onboarding data
      const viviProfile = {
        businessName: formData.businessName,
        industry: formData.industry,
        businessType: formData.businessType,
        goals: formData.goals,
        challenges: formData.currentChallenges,
        budget: formData.monthlyBudget,
        teamSize: formData.teamSize,
        brandVoice: formData.brandVoice,
        targetAudience: formData.targetAudience,
        contentPreferences: formData.contentPreferences,
        communicationStyle: formData.communicationStyle,
        createdAt: new Date().toISOString()
      };

      // Save to localStorage for ViVi AI to use throughout the platform
      localStorage.setItem('onboardingData', JSON.stringify(formData));
      localStorage.setItem('viviProfile', JSON.stringify(viviProfile));
      localStorage.setItem('onboardingCompleted', 'true');
      
      // Mark onboarding as completed in database
      const token = localStorage.getItem('authToken');
      if (token) {
        try {
          const response = await fetch('/api/auth/complete-onboarding', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
          });
          
          if (response.ok) {
            const result = await response.json();
            console.log('✅ Onboarding marked complete in database:', result);
            // Update user data in localStorage
            localStorage.setItem('user', JSON.stringify(result.user));
          } else {
            console.error('❌ Failed to mark onboarding complete in database');
          }
        } catch (apiError) {
          console.error('❌ API error completing onboarding:', apiError);
        }
      }
      
      toast({
        title: "🎉 ViVi AI is Ready!",
        description: "Your personalized AI marketing assistant has learned your business voice and is ready to help you dominate!",
      });
      
      // Redirect to beta dashboard (/) not demo dashboard (/dashboard)
      window.location.href = '/';
    } catch (error) {
      console.error('Error completing onboarding:', error);
      toast({
        title: "Almost there!",
        description: "Finalizing your ViVi setup...",
      });
      // Redirect to beta dashboard (/) not demo dashboard (/dashboard)
      window.location.href = '/';
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return formData.businessName && formData.industry && formData.businessType;
      case 2:
        return formData.goals.length > 0;
      case 3:
        return formData.currentChallenges.length > 0;
      case 4:
        return formData.monthlyBudget && formData.teamSize;
      case 5:
        return formData.brandVoice && formData.targetAudience;
      case 6:
        return formData.contentPreferences.length > 0 && formData.communicationStyle;
      default:
        return false;
    }
  };

  const steps = [
    { number: 1, title: 'Business Info', icon: Users },
    { number: 2, title: 'Goals', icon: Target },
    { number: 3, title: 'Challenges', icon: TrendingUp },
    { number: 4, title: 'Resources', icon: Sparkles },
    { number: 5, title: 'Brand Voice', icon: Sparkles },
    { number: 6, title: 'Content Style', icon: Target }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-purple-800">
      {/* Header */}
      <div className="bg-black/20 backdrop-blur-md border-b border-white/10">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl font-bold text-white">Mavro Pro</span>
            </div>
            <div className="text-sm text-gray-300">
              Beta Testing Platform
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Progress Steps */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-8">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isCompleted = currentStep > step.number;
              const isCurrent = currentStep === step.number;
              
              return (
                <div key={step.number} className="flex items-center">
                  <div className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all ${
                    isCompleted 
                      ? 'bg-green-500 border-green-500 text-white' 
                      : isCurrent 
                        ? 'bg-purple-500 border-purple-500 text-white' 
                        : 'bg-gray-700 border-gray-600 text-gray-400'
                  }`}>
                    {isCompleted ? (
                      <CheckCircle className="w-6 h-6" />
                    ) : (
                      <Icon className="w-6 h-6" />
                    )}
                  </div>
                  <div className="ml-3">
                    <div className={`text-sm font-medium ${
                      isCompleted || isCurrent ? 'text-white' : 'text-gray-400'
                    }`}>
                      Step {step.number}
                    </div>
                    <div className={`text-xs ${
                      isCompleted || isCurrent ? 'text-gray-200' : 'text-gray-500'
                    }`}>
                      {step.title}
                    </div>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`w-16 h-px mx-4 ${
                      isCompleted ? 'bg-green-500' : 'bg-gray-600'
                    }`} />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Step Content */}
        <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl mb-2">
              {currentStep === 1 && "Tell us about your business"}
              {currentStep === 2 && "What are your marketing goals?"}
              {currentStep === 3 && "What challenges are you facing?"}
              {currentStep === 4 && "Let's set up your resources"}
              {currentStep === 5 && "Define your brand voice"}
              {currentStep === 6 && "Configure ViVi's content style"}
            </CardTitle>
            <CardDescription className="text-gray-300">
              {currentStep === 1 && "Help us customize Mavro Pro for your specific needs"}
              {currentStep === 2 && "Select your top priorities (choose multiple)"}
              {currentStep === 3 && "Identify your main pain points (choose multiple)"}
              {currentStep === 4 && "Configure your workspace settings"}
              {currentStep === 5 && "Help ViVi understand your brand personality and audience"}
              {currentStep === 6 && "Teach ViVi how to create content that matches your style"}
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Step 1: Business Info */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div>
                  <Label htmlFor="businessName" className="text-white">Business Name</Label>
                  <Input
                    id="businessName"
                    placeholder="Enter your business name"
                    value={formData.businessName}
                    onChange={(e) => setFormData(prev => ({ ...prev, businessName: e.target.value }))}
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                  />
                </div>
                
                <div>
                  <Label htmlFor="industry" className="text-white">Industry</Label>
                  <Select value={formData.industry} onValueChange={(value) => setFormData(prev => ({ ...prev, industry: value }))}>
                    <SelectTrigger className="bg-white/10 border-white/20 text-white">
                      <SelectValue placeholder="Select your industry" />
                    </SelectTrigger>
                    <SelectContent>
                      {industries.map(industry => (
                        <SelectItem key={industry} value={industry}>{industry}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="businessType" className="text-white">Business Type</Label>
                  <Select value={formData.businessType} onValueChange={(value) => setFormData(prev => ({ ...prev, businessType: value }))}>
                    <SelectTrigger className="bg-white/10 border-white/20 text-white">
                      <SelectValue placeholder="Select your business type" />
                    </SelectTrigger>
                    <SelectContent>
                      {businessTypes.map(type => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            {/* Step 2: Goals */}
            {currentStep === 2 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {goalOptions.map(goal => (
                  <Badge
                    key={goal}
                    variant={formData.goals.includes(goal) ? "default" : "outline"}
                    className={`p-3 cursor-pointer transition-all text-center ${
                      formData.goals.includes(goal)
                        ? 'bg-purple-500 text-white border-purple-500'
                        : 'bg-white/10 text-gray-300 border-white/20 hover:bg-white/20'
                    }`}
                    onClick={() => handleGoalToggle(goal)}
                  >
                    {goal}
                  </Badge>
                ))}
              </div>
            )}

            {/* Step 3: Challenges */}
            {currentStep === 3 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {challengeOptions.map(challenge => (
                  <Badge
                    key={challenge}
                    variant={formData.currentChallenges.includes(challenge) ? "default" : "outline"}
                    className={`p-3 cursor-pointer transition-all text-center ${
                      formData.currentChallenges.includes(challenge)
                        ? 'bg-purple-500 text-white border-purple-500'
                        : 'bg-white/10 text-gray-300 border-white/20 hover:bg-white/20'
                    }`}
                    onClick={() => handleChallengeToggle(challenge)}
                  >
                    {challenge}
                  </Badge>
                ))}
              </div>
            )}

            {/* Step 4: Resources */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div>
                  <Label htmlFor="monthlyBudget" className="text-white">Monthly Marketing Budget</Label>
                  <Select value={formData.monthlyBudget} onValueChange={(value) => setFormData(prev => ({ ...prev, monthlyBudget: value }))}>
                    <SelectTrigger className="bg-white/10 border-white/20 text-white">
                      <SelectValue placeholder="Select your monthly budget" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="under-1k">Under $1,000</SelectItem>
                      <SelectItem value="1k-5k">$1,000 - $5,000</SelectItem>
                      <SelectItem value="5k-10k">$5,000 - $10,000</SelectItem>
                      <SelectItem value="10k-25k">$10,000 - $25,000</SelectItem>
                      <SelectItem value="25k+">$25,000+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="teamSize" className="text-white">Team Size</Label>
                  <Select value={formData.teamSize} onValueChange={(value) => setFormData(prev => ({ ...prev, teamSize: value }))}>
                    <SelectTrigger className="bg-white/10 border-white/20 text-white">
                      <SelectValue placeholder="Select your team size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="solo">Just me</SelectItem>
                      <SelectItem value="2-5">2-5 people</SelectItem>
                      <SelectItem value="6-15">6-15 people</SelectItem>
                      <SelectItem value="16-50">16-50 people</SelectItem>
                      <SelectItem value="50+">50+ people</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            {/* Step 5: Brand Voice */}
            {currentStep === 5 && (
              <div className="space-y-6">
                <div>
                  <Label htmlFor="brandVoice" className="text-white">Brand Voice & Personality</Label>
                  <Select value={formData.brandVoice} onValueChange={(value) => setFormData(prev => ({ ...prev, brandVoice: value }))}>
                    <SelectTrigger className="bg-white/10 border-white/20 text-white">
                      <SelectValue placeholder="How should ViVi represent your brand?" />
                    </SelectTrigger>
                    <SelectContent>
                      {brandVoiceOptions.map(voice => (
                        <SelectItem key={voice} value={voice}>{voice}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="targetAudience" className="text-white">Target Audience</Label>
                  <Input
                    id="targetAudience"
                    placeholder="Describe your ideal customer (e.g., 'Small business owners aged 25-45 who value efficiency')"
                    value={formData.targetAudience}
                    onChange={(e) => setFormData(prev => ({ ...prev, targetAudience: e.target.value }))}
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                  />
                </div>
              </div>
            )}

            {/* Step 6: Content Preferences */}
            {currentStep === 6 && (
              <div className="space-y-6">
                <div>
                  <Label className="text-white mb-4 block">Content Preferences (select all that apply)</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {contentPreferenceOptions.map(preference => (
                      <Badge
                        key={preference}
                        variant={formData.contentPreferences.includes(preference) ? "default" : "outline"}
                        className={`p-3 cursor-pointer transition-all text-center ${
                          formData.contentPreferences.includes(preference)
                            ? 'bg-purple-500 text-white border-purple-500'
                            : 'bg-white/10 text-gray-300 border-white/20 hover:bg-white/20'
                        }`}
                        onClick={() => handleContentPreferenceToggle(preference)}
                      >
                        {preference}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <Label htmlFor="communicationStyle" className="text-white">Communication Style</Label>
                  <Select value={formData.communicationStyle} onValueChange={(value) => setFormData(prev => ({ ...prev, communicationStyle: value }))}>
                    <SelectTrigger className="bg-white/10 border-white/20 text-white">
                      <SelectValue placeholder="How should ViVi communicate with your audience?" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="direct-actionable">Direct and actionable</SelectItem>
                      <SelectItem value="conversational-engaging">Conversational and engaging</SelectItem>
                      <SelectItem value="educational-informative">Educational and informative</SelectItem>
                      <SelectItem value="inspirational-motivating">Inspirational and motivating</SelectItem>
                      <SelectItem value="humorous-lighthearted">Humorous and lighthearted</SelectItem>
                      <SelectItem value="professional-polished">Professional and polished</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex justify-between pt-6">
              <Button
                variant="outline"
                onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                disabled={currentStep === 1}
                className="bg-white/10 border-white/20 text-white hover:bg-white/20"
              >
                Previous
              </Button>
              
              <Button
                onClick={handleNext}
                disabled={!canProceed()}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0"
              >
                {currentStep === 6 ? 'Complete Setup & Launch ViVi' : 'Next'}
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}