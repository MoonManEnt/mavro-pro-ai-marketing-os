import { useState } from 'react';
import { useLocation } from 'wouter';
import { useMutation } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import { Chrome, Github, Apple } from 'lucide-react';

interface LoginResponse {
  user: {
    id: string;
    email: string;
    firstName?: string;
    lastName?: string;
    username: string;
  };
  tokens: {
    accessToken: string;
    refreshToken: string;
    sessionToken: string;
  };
  workspace?: {
    id: string;
    name: string;
    industry: string;
  };
}

export default function Login() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const authMutation = useMutation({
    mutationFn: async (data: any) => {
      const endpoint = isRegister ? '/api/auth/register' : '/api/auth/login';
      return await apiRequest(endpoint, {
        method: 'POST',
        body: JSON.stringify(data),
      }) as LoginResponse;
    },
    onSuccess: (data) => {
      // Store tokens in localStorage
      localStorage.setItem('accessToken', data.tokens.accessToken);
      localStorage.setItem('refreshToken', data.tokens.refreshToken);
      localStorage.setItem('sessionToken', data.tokens.sessionToken);
      localStorage.setItem('user', JSON.stringify(data.user));
      
      if (data.workspace) {
        localStorage.setItem('currentWorkspace', JSON.stringify(data.workspace));
      }

      toast({
        title: isRegister ? 'Account Created' : 'Welcome Back',
        description: isRegister ? 'Your account has been created successfully!' : 'You have been logged in successfully!',
      });

      // Redirect to dashboard
      setLocation('/');
    },
    onError: (error: any) => {
      toast({
        title: 'Authentication Failed',
        description: error.message || 'Please check your credentials and try again.',
        variant: 'destructive',
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const data: any = { email, password };
    if (isRegister) {
      data.firstName = firstName;
      data.lastName = lastName;
    }
    
    authMutation.mutate(data);
  };

  const handleOAuthLogin = (provider: string) => {
    window.location.href = `/api/auth/oauth/${provider}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white/95 backdrop-blur-sm">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            {isRegister ? 'Create Account' : 'Welcome to Mavro Pro'}
          </CardTitle>
          <CardDescription className="text-center">
            {isRegister 
              ? 'Join the future of AI-powered marketing' 
              : 'Sign in to your account to continue'
            }
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {/* OAuth Buttons */}
          <div className="space-y-2">
            <Button
              variant="outline"
              className="w-full"
              onClick={() => handleOAuthLogin('google')}
            >
              <Chrome className="w-4 h-4 mr-2" />
              Continue with Google
            </Button>
            
            <Button
              variant="outline"
              className="w-full"
              onClick={() => handleOAuthLogin('github')}
            >
              <Github className="w-4 h-4 mr-2" />
              Continue with GitHub
            </Button>
            
            <Button
              variant="outline"
              className="w-full"
              onClick={() => handleOAuthLogin('apple')}
            >
              <Apple className="w-4 h-4 mr-2" />
              Continue with Apple
            </Button>
          </div>

          <Separator className="my-4" />

          {/* Email/Password Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {isRegister && (
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="John"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Doe"
                  />
                </div>
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                minLength={6}
              />
            </div>
            
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              disabled={authMutation.isPending}
            >
              {authMutation.isPending 
                ? 'Please wait...' 
                : isRegister 
                  ? 'Create Account' 
                  : 'Sign In'
              }
            </Button>
          </form>

          <div className="text-center">
            <Button
              variant="link"
              onClick={() => setIsRegister(!isRegister)}
              className="text-sm"
            >
              {isRegister 
                ? 'Already have an account? Sign in' 
                : "Don't have an account? Sign up"
              }
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}