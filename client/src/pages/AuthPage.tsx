import { useState } from 'react';
import { useLocation } from 'wouter';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import LoadingTransition from "@/components/LoadingTransition";
import { Eye, EyeOff, Sparkles, ArrowLeft } from 'lucide-react';

interface AuthFormData {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  username?: string;
}

export default function AuthPage() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('login');
  const [showPassword, setShowPassword] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const [formData, setFormData] = useState<AuthFormData>({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    username: ''
  });

  const loginMutation = useMutation({
    mutationFn: async (data: { email: string; password: string }) => {
      const response = await apiRequest('POST', '/api/auth/login', data);
      return await response.json();
    },
    onSuccess: (data) => {
      console.log('Login success data:', data);
      localStorage.setItem('authToken', data.tokens.accessToken);
      localStorage.setItem('user', JSON.stringify(data.user));
      localStorage.removeItem('demoMode');
      
      // Check if user has completed onboarding
      const user = data.user;
      const needsOnboarding = !user.onboardingCompleted;
      
      if (needsOnboarding) {
        console.log('🚀 New user - redirecting to onboarding');
        toast({
          title: "Welcome to Mavro Pro!",
          description: "Let's set up your account...",
        });
        setTimeout(() => {
          window.location.href = '/onboarding';
        }, 100);
      } else {
        console.log('🚀 Returning user - showing loading transition');
        setShowLoading(true);
      }
    },
    onError: (error: any) => {
      console.error('Login error:', error);
      toast({
        title: "Login Failed", 
        description: error.message || "Invalid email or password. Please try again.",
        variant: "destructive",
      });
    },
  });

  const registerMutation = useMutation({
    mutationFn: async (data: AuthFormData) => {
      const response = await apiRequest('POST', '/api/auth/register', data);
      return await response.json();
    },
    onSuccess: (data) => {
      console.log('Registration success data:', data);
      localStorage.setItem('authToken', data.tokens.accessToken);
      localStorage.setItem('user', JSON.stringify(data.user));
      localStorage.removeItem('demoMode');
      
      console.log('🚀 New user registered - showing loading transition');
      
      toast({
        title: "Account Created!",
        description: "Welcome to Mavro Pro! Setting up your workspace...",
      });
      
      setShowLoading(true);
    },
    onError: (error: any) => {
      console.error('Registration error:', error);
      toast({
        title: "Registration Failed",
        description: error.message || "Unable to create account. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent, isLogin: boolean) => {
    e.preventDefault();
    
    if (isLogin) {
      loginMutation.mutate({
        email: formData.email,
        password: formData.password,
      });
    } else {
      registerMutation.mutate(formData);
    }
  };

  const handleInputChange = (field: keyof AuthFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const continueAsDemo = () => {
    // Set demo mode flag
    localStorage.setItem('demoMode', 'true');
    localStorage.setItem('user', JSON.stringify({
      id: 'demo-user',
      email: 'demo@mavropro.com',
      firstName: 'Demo',
      lastName: 'User',
      accountType: 'demo'
    }));
    
    toast({
      title: "Demo Mode Activated",
      description: "Exploring Mavro Pro with sample data...",
    });
    
    setLocation('/dashboard');
  };

  const handleLoadingComplete = () => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const needsOnboarding = !user.onboardingCompleted;
    
    if (needsOnboarding) {
      console.log('🚀 Loading complete - redirecting to onboarding');
      window.location.href = '/onboarding';
    } else {
      console.log('🚀 Loading complete - redirecting to dashboard');
      window.location.href = '/dashboard';
    }
  };

  // Show loading transition if user just logged in
  if (showLoading) {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return (
      <LoadingTransition 
        onComplete={handleLoadingComplete}
        userFirstName={user.firstName || 'User'}
        duration={6000}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-10 -right-10 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-10 -left-10 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mb-4">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Mavro Pro</h1>
          <p className="text-purple-200">AI-Powered Marketing Operating System</p>
        </div>

        <Card className="bg-white/10 backdrop-blur-lg border-white/20 shadow-2xl">
          <CardHeader className="text-center">
            <CardTitle className="text-white text-xl">Welcome to Beta</CardTitle>
            <CardDescription className="text-purple-200">
              Join thousands of marketers already using Mavro Pro
            </CardDescription>
          </CardHeader>

          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-white/10">
                <TabsTrigger value="login" className="text-white data-[state=active]:bg-white/20">
                  Sign In
                </TabsTrigger>
                <TabsTrigger value="register" className="text-white data-[state=active]:bg-white/20">
                  Sign Up
                </TabsTrigger>
              </TabsList>

              <TabsContent value="login" className="space-y-4 mt-6">
                <form onSubmit={(e) => handleSubmit(e, true)} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-email" className="text-white">Email</Label>
                    <Input
                      id="login-email"
                      type="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="bg-white/10 border-white/20 text-white placeholder:text-purple-200"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="login-password" className="text-white">Password</Label>
                    <div className="relative">
                      <Input
                        id="login-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={(e) => handleInputChange('password', e.target.value)}
                        className="bg-white/10 border-white/20 text-white placeholder:text-purple-200 pr-10"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-purple-200 hover:text-white"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
                    disabled={loginMutation.isPending}
                  >
                    {loginMutation.isPending ? "Signing In..." : "Sign In"}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="register" className="space-y-4 mt-6">
                <form onSubmit={(e) => handleSubmit(e, false)} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName" className="text-white">First Name</Label>
                      <Input
                        id="firstName"
                        placeholder="First name"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                        className="bg-white/10 border-white/20 text-white placeholder:text-purple-200"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName" className="text-white">Last Name</Label>
                      <Input
                        id="lastName"
                        placeholder="Last name"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                        className="bg-white/10 border-white/20 text-white placeholder:text-purple-200"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="username" className="text-white">Username</Label>
                    <Input
                      id="username"
                      placeholder="Choose a username"
                      value={formData.username}
                      onChange={(e) => handleInputChange('username', e.target.value)}
                      className="bg-white/10 border-white/20 text-white placeholder:text-purple-200"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="register-email" className="text-white">Email</Label>
                    <Input
                      id="register-email"
                      type="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="bg-white/10 border-white/20 text-white placeholder:text-purple-200"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="register-password" className="text-white">Password</Label>
                    <div className="relative">
                      <Input
                        id="register-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Create a password"
                        value={formData.password}
                        onChange={(e) => handleInputChange('password', e.target.value)}
                        className="bg-white/10 border-white/20 text-white placeholder:text-purple-200 pr-10"
                        required
                        minLength={6}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-purple-200 hover:text-white"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
                    disabled={registerMutation.isPending}
                  >
                    {registerMutation.isPending ? "Creating Account..." : "Create Account"}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>

          <CardFooter className="flex flex-col space-y-4">
            <Button 
              variant="outline" 
              onClick={continueAsDemo}
              className="w-full border-white/20 text-white hover:bg-white/10"
            >
              Try Demo First
            </Button>
            <p className="text-xs text-purple-200 text-center">
              By continuing, you agree to our Terms of Service and Privacy Policy
            </p>
          </CardFooter>
        </Card>

        {/* Beta Features Highlight */}
        <div className="mt-8 text-center">
          <p className="text-purple-200 text-sm mb-4">✨ Beta Testing Features</p>
          <div className="grid grid-cols-2 gap-4 text-xs">
            <div className="bg-white/10 backdrop-blur-lg rounded-lg p-3">
              <p className="text-white font-medium">ViVi AI Assistant</p>
              <p className="text-purple-200">Full automation suite</p>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-lg p-3">
              <p className="text-white font-medium">Real-time Analytics</p>
              <p className="text-purple-200">Live campaign tracking</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}