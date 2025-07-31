import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Play, Sparkles, Brain, TrendingUp, Users, Globe, ChevronRight, Star, Zap, Target, BarChart3, Megaphone, Lightbulb, Shield, Rocket, Calculator, DollarSign, Clock, Infinity, Wand2, Store, MapPin } from 'lucide-react';
import { useLocation } from 'wouter';

const LandingPage = () => {
  const [, setLocation] = useLocation();
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [isROICalculatorOpen, setIsROICalculatorOpen] = useState(false);
  const [currentAdSpend, setCurrentAdSpend] = useState([5000]);
  const [currentConversionRate, setCurrentConversionRate] = useState([2.5]);
  const [averageOrderValue, setAverageOrderValue] = useState([150]);
  const [businessType, setBusinessType] = useState('general');
  const [roiResults, setROIResults] = useState({
    currentROI: 0,
    withMavroROI: 0,
    additionalRevenue: 0,
    timeToROI: 0,
    yearlyProjection: 0,
    costSavings: 0,
    campaignEfficiency: 0
  });

  const businessTypes = {
    general: { name: 'General Business', multiplier: 3.4, baseline: 2.5 },
    ecommerce: { name: 'E-commerce', multiplier: 4.2, baseline: 3.1 },
    saas: { name: 'SaaS/Software', multiplier: 5.8, baseline: 4.2 },
    consulting: { name: 'Consulting/Professional Services', multiplier: 6.2, baseline: 1.8 },
    fitness: { name: 'Fitness/Health', multiplier: 4.8, baseline: 2.9 },
    realestate: { name: 'Real Estate', multiplier: 7.1, baseline: 1.5 },
    restaurant: { name: 'Restaurant/Food Service', multiplier: 3.9, baseline: 2.8 },
    automotive: { name: 'Automotive/Dealership', multiplier: 5.5, baseline: 1.9 }
  };

  const calculateROI = () => {
    const monthlySpend = currentAdSpend[0];
    const currentConvRate = currentConversionRate[0] / 100;
    const avgOrderVal = averageOrderValue[0];
    const businessMultiplier = businessTypes[businessType].multiplier;
    const industryBaseline = businessTypes[businessType].baseline;
    
    // More realistic visitor calculation based on industry averages
    const costPerClick = monthlySpend <= 5000 ? 2.5 : monthlySpend <= 15000 ? 3.2 : 4.1;
    const monthlyVisitors = Math.round(monthlySpend / costPerClick);
    const currentConversions = monthlyVisitors * currentConvRate;
    const currentRevenue = currentConversions * avgOrderVal;
    const currentROIPercent = ((currentRevenue - monthlySpend) / monthlySpend) * 100;
    
    // With Mavro OS - industry-specific improvements
    const improvedConvRate = Math.min(currentConvRate * businessMultiplier, 0.25); // Cap at 25% max conversion
    const improvedConversions = monthlyVisitors * improvedConvRate;
    const improvedRevenue = improvedConversions * avgOrderVal;
    
    // Mavro OS cost with volume discounts
    const mavroMonthlyCost = monthlySpend > 20000 ? 599 : monthlySpend > 10000 ? 399 : 299;
    const mavroROIPercent = ((improvedRevenue - monthlySpend - mavroMonthlyCost) / (monthlySpend + mavroMonthlyCost)) * 100;
    
    const additionalMonthlyRevenue = improvedRevenue - currentRevenue;
    const monthsToROI = mavroMonthlyCost / additionalMonthlyRevenue;
    const yearlyProjection = additionalMonthlyRevenue * 12;
    
    // Calculate cost savings from campaign efficiency
    const campaignEfficiencyGain = 45; // 45% efficiency improvement
    const costSavings = (monthlySpend * (campaignEfficiencyGain / 100)) * 12;
    
    setROIResults({
      currentROI: Math.round(currentROIPercent),
      withMavroROI: Math.round(mavroROIPercent),
      additionalRevenue: Math.round(additionalMonthlyRevenue),
      timeToROI: Math.max(0.1, monthsToROI),
      yearlyProjection: Math.round(yearlyProjection),
      costSavings: Math.round(costSavings),
      campaignEfficiency: campaignEfficiencyGain
    });
  };

  const features = [
    {
      icon: <Brain className="w-8 h-8 text-purple-400" />,
      title: "AI-Powered Marketing Intelligence",
      description: "ViVi doesn't just assist—she dominates. Watch her turn your marketing chaos into conversion gold.",
      tagline: "CMO-level thinking, without the ego"
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-blue-400" />,
      title: "Real-Time Analytics & Insights",
      description: "Stop guessing what works. Get instant insights that turn every dollar spent into data-driven dominance.",
      tagline: "Your crystal ball for marketing success"
    },
    {
      icon: <Users className="w-8 h-8 text-green-400" />,
      title: "Persona-Driven Strategies",
      description: "One-size-fits-all marketing is dead. Create laser-targeted campaigns that hit different like a sniper.",
      tagline: "Precision targeting, maximum impact"
    },
    {
      icon: <Globe className="w-8 h-8 text-orange-400" />,
      title: "Multi-Platform Integration",
      description: "Why juggle 10 platforms when you can orchestrate them? One dashboard to rule them all.",
      tagline: "The command center of champions"
    },
    {
      icon: <Zap className="w-8 h-8 text-yellow-400" />,
      title: "Automated Content Creation",
      description: "Writer's block is for amateurs. Generate viral-worthy content faster than you can say 'engagement rate'.",
      tagline: "Content that converts, not just captivates"
    },
    {
      icon: <Target className="w-8 h-8 text-red-400" />,
      title: "Campaign Optimization",
      description: "Set it, forget it, profit from it. Our AI never sleeps, never stops, never settles for mediocre results.",
      tagline: "Optimization that never quits"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Digital Marketing Director",
      company: "TechFlow Solutions",
      rating: 5,
      text: "Mavro OS doesn't just optimize campaigns—it obliterates the competition. Our ROI went from 'meh' to 'holy sh*t' in 90 days.",
      impact: "340% ROI increase"
    },
    {
      name: "Michael Chen",
      role: "CEO",
      company: "GrowthHub Agency",
      rating: 5,
      text: "While our competitors are still figuring out targeting, ViVi has us hitting bullseyes blindfolded. This is marketing warfare.",
      impact: "67% more qualified leads"
    },
    {
      name: "Amanda Rodriguez",
      role: "Marketing Manager",
      company: "Wellness Brands Co.",
      rating: 5,
      text: "ViVi is the CMO I always wanted but could never afford. She works weekends, never takes vacations, and delivers results.",
      impact: "89% time savings"
    }
  ];

  const stats = [
    { number: "500+", label: "Active Businesses" },
    { number: "2.3M+", label: "Content Pieces Created" },
    { number: "340%", label: "Average ROI Increase" },
    { number: "15+", label: "Platform Integrations" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="relative border-b border-purple-800/30 bg-black/20 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Mavro OS</h1>
                <p className="text-sm text-purple-300">Powered by ViVi AI</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="text-purple-300 border-purple-500">
                <Star className="w-3 h-3 mr-1" />
                Beta Now Live
              </Badge>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 px-6">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-3xl"></div>
        <div className="container mx-auto text-center relative z-10">
          <Badge className="mb-6 bg-purple-600/30 text-purple-200 border-purple-400">
            <Rocket className="w-3 h-3 mr-1" />
            Revolutionary AI Marketing Platform
          </Badge>
          
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Plan. Track. Grow.
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              {" "}Learn.
            </span>
          </h1>
          
          <p className="text-xl text-slate-300 mb-4 max-w-3xl mx-auto leading-relaxed">
            Mavro OS automates AI-optimized content posting—so your brand sparks viral engagement and revenue, 24/7.
          </p>
          
          <div className="text-lg text-purple-200 mb-4 max-w-3xl mx-auto leading-relaxed">
            From mapping your GTM strategy to mastering what works next, ViVi AI handles ideation, scheduling, and optimization—freeing you to focus on big-picture growth.
          </div>
          
          <div className="text-lg text-yellow-200 mb-8 max-w-2xl mx-auto font-bold">
            "Why hire a $200K CMO when you can have ViVi AI think, strategize, and execute like one 24/7?"
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-12">
            <div className="space-y-4">
              <Button 
                size="lg" 
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-6 text-lg font-semibold shadow-2xl"
                onClick={() => setLocation('/auth')}
              >
                <Rocket className="w-5 h-5 mr-2" />
                Sign Up for Beta Testing
              </Button>
              
              <Button 
                size="lg" 
                variant="outline" 
                className="w-full border-purple-400 text-purple-300 hover:bg-purple-800/30 px-8 py-6 text-lg font-semibold"
                onClick={() => setLocation('/auth')}
              >
                <Users className="w-5 h-5 mr-2" />
                Beta Testers Login Here
              </Button>
              
              <Button 
                size="lg" 
                variant="ghost" 
                className="w-full text-purple-300 hover:text-white hover:bg-purple-800/30 px-8 py-6 text-lg font-semibold"
                onClick={() => {
                  // Set demo mode and go directly to dashboard
                  localStorage.setItem('demoMode', 'true');
                  localStorage.setItem('user', JSON.stringify({
                    id: 'demo-user',
                    email: 'demo@mavropro.com',
                    firstName: 'Demo',
                    lastName: 'User',
                    accountType: 'demo'
                  }));
                  setLocation('/dashboard');
                }}
              >
                <Play className="w-5 h-5 mr-2" />
                Explore Demo First
              </Button>
            </div>
            
            <div className="space-y-4">
              <Dialog open={isROICalculatorOpen} onOpenChange={setIsROICalculatorOpen}>
                <DialogTrigger asChild>
                  <Button 
                    size="lg" 
                    className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-8 py-6 text-lg font-semibold shadow-2xl"
                  >
                    <Calculator className="w-5 h-5 mr-2" />
                    Calculate Your ROI
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl bg-slate-900 border-purple-800">
                  <DialogHeader>
                    <DialogTitle className="text-white flex items-center text-xl">
                      <Calculator className="w-6 h-6 mr-2 text-green-400" />
                      Advanced ROI Calculator - See Your Potential
                    </DialogTitle>
                  </DialogHeader>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {/* Input Section */}
                      <div className="space-y-4">
                        <div>
                          <Label className="text-white text-sm font-medium">Business Type</Label>
                          <select 
                            value={businessType} 
                            onChange={(e) => setBusinessType(e.target.value)}
                            className="w-full mt-2 bg-slate-800 border border-slate-600 rounded-lg p-3 text-white focus:border-purple-400 focus:outline-none"
                          >
                            {Object.entries(businessTypes).map(([key, value]) => (
                              <option key={key} value={key}>{value.name}</option>
                            ))}
                          </select>
                        </div>
                        
                        <div>
                          <Label className="text-white text-sm font-medium">Monthly Ad Spend: ${currentAdSpend[0].toLocaleString()}</Label>
                          <Slider
                            value={currentAdSpend}
                            onValueChange={setCurrentAdSpend}
                            max={50000}
                            min={1000}
                            step={500}
                            className="mt-2"
                          />
                          <div className="flex justify-between text-xs text-slate-400 mt-1">
                            <span>$1,000</span>
                            <span>$50,000</span>
                          </div>
                        </div>
                        
                        <div>
                          <Label className="text-white text-sm font-medium">Current Conversion Rate: {currentConversionRate[0]}%</Label>
                          <Slider
                            value={currentConversionRate}
                            onValueChange={setCurrentConversionRate}
                            max={10}
                            min={0.5}
                            step={0.1}
                            className="mt-2"
                          />
                          <div className="flex justify-between text-xs text-slate-400 mt-1">
                            <span>0.5%</span>
                            <span>Industry: {businessTypes[businessType].baseline}%</span>
                            <span>10%</span>
                          </div>
                        </div>
                        
                        <div>
                          <Label className="text-white text-sm font-medium">Average Order Value: ${averageOrderValue[0]}</Label>
                          <Slider
                            value={averageOrderValue}
                            onValueChange={setAverageOrderValue}
                            max={1000}
                            min={50}
                            step={10}
                            className="mt-2"
                          />
                          <div className="flex justify-between text-xs text-slate-400 mt-1">
                            <span>$50</span>
                            <span>$1,000</span>
                          </div>
                        </div>
                        
                        <Button 
                          onClick={calculateROI}
                          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3"
                        >
                          <Calculator className="w-4 h-4 mr-2" />
                          Calculate ROI Impact
                        </Button>
                      </div>
                      
                      {/* Results Section */}
                      <div className="space-y-4">
                        {roiResults.currentROI > 0 && (
                          <div className="bg-gradient-to-br from-slate-800/50 to-purple-900/30 rounded-lg p-6 space-y-4 border border-purple-500/30">
                            <h3 className="text-white font-semibold text-lg flex items-center">
                              <TrendingUp className="w-5 h-5 mr-2 text-green-400" />
                              Your ROI Transformation
                            </h3>
                            
                            <div className="grid grid-cols-2 gap-4">
                              <div className="text-center bg-red-900/30 rounded-lg p-4 border border-red-500/30">
                                <div className="text-2xl font-bold text-red-400">{roiResults.currentROI}%</div>
                                <div className="text-sm text-red-200">Current ROI</div>
                              </div>
                              <div className="text-center bg-green-900/30 rounded-lg p-4 border border-green-500/30">
                                <div className="text-2xl font-bold text-green-400">{roiResults.withMavroROI}%</div>
                                <div className="text-sm text-green-200">With Mavro OS</div>
                              </div>
                            </div>
                            
                            <div className="text-center bg-gradient-to-r from-green-900/30 to-emerald-900/30 rounded-lg p-4 border border-green-500/30">
                              <div className="text-3xl font-bold text-green-400">
                                +${roiResults.additionalRevenue.toLocaleString()}
                              </div>
                              <div className="text-sm text-green-200">Additional Monthly Revenue</div>
                            </div>
                            
                            <div className="grid grid-cols-1 gap-3">
                              <div className="flex justify-between items-center bg-slate-700/30 rounded-lg p-3">
                                <span className="text-slate-300">Yearly Projection:</span>
                                <span className="text-blue-400 font-bold">${roiResults.yearlyProjection.toLocaleString()}</span>
                              </div>
                              <div className="flex justify-between items-center bg-slate-700/30 rounded-lg p-3">
                                <span className="text-slate-300">Cost Savings:</span>
                                <span className="text-yellow-400 font-bold">${roiResults.costSavings.toLocaleString()}</span>
                              </div>
                              <div className="flex justify-between items-center bg-slate-700/30 rounded-lg p-3">
                                <span className="text-slate-300">Campaign Efficiency:</span>
                                <span className="text-purple-400 font-bold">+{roiResults.campaignEfficiency}%</span>
                              </div>
                            </div>
                            
                            <div className="text-center bg-purple-900/30 rounded-lg p-4 border border-purple-500/30">
                              <div className="text-lg font-semibold text-purple-300">
                                ROI Payback: {roiResults.timeToROI < 1 ? `${Math.round(roiResults.timeToROI * 30)} days` : `${roiResults.timeToROI.toFixed(1)} months`}
                              </div>
                              <div className="text-sm text-purple-200 mt-1">
                                {businessTypes[businessType].name} Average
                              </div>
                            </div>
                          </div>
                        )}
                        
                        {roiResults.currentROI === 0 && (
                          <div className="bg-slate-800/50 rounded-lg p-8 text-center border border-slate-600/30">
                            <div className="text-slate-400 mb-4">
                              <Calculator className="w-12 h-12 mx-auto mb-2 opacity-50" />
                              <h3 className="text-lg font-medium">Ready to Calculate?</h3>
                              <p className="text-sm mt-2">
                                Adjust your business parameters and click "Calculate ROI Impact" to see your potential growth with Mavro OS.
                              </p>
                            </div>
                            <div className="text-xs text-slate-500">
                              Industry-specific calculations • Real-world projections • Instant results
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {roiResults.currentROI > 0 && (
                      <div className="bg-gradient-to-r from-purple-600/10 to-pink-600/10 rounded-lg p-6 border border-purple-500/30">
                        <div className="text-center">
                          <h4 className="text-white font-semibold mb-2">Ready to Transform Your Marketing?</h4>
                          <p className="text-slate-300 text-sm mb-4">
                            These projections are based on real client results and industry benchmarks for {businessTypes[businessType].name} businesses.
                          </p>
                          <div className="flex flex-col sm:flex-row gap-3 justify-center">
                            <Button 
                              onClick={() => {
                                setIsROICalculatorOpen(false);
                                setLocation('/demo');
                              }}
                              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                            >
                              <Play className="w-4 h-4 mr-2" />
                              See Demo
                            </Button>
                            <Button 
                              onClick={() => {
                                setIsROICalculatorOpen(false);
                                setLocation('/dashboard');
                              }}
                              variant="outline"
                              className="border-purple-400 text-purple-300 hover:bg-purple-800/30"
                            >
                              <Zap className="w-4 h-4 mr-2" />
                              Start Free Trial
                            </Button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </DialogContent>
              </Dialog>
              
              <Dialog open={isVideoOpen} onOpenChange={setIsVideoOpen}>
                <DialogTrigger asChild>
                  <Button 
                    size="lg" 
                    variant="ghost" 
                    className="w-full text-purple-300 hover:bg-purple-800/30 px-8 py-6 text-lg font-semibold"
                  >
                    <Play className="w-5 h-5 mr-2" />
                    Watch Promo Video
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl bg-slate-900 border-purple-800">
                  <DialogHeader>
                    <DialogTitle className="text-white">Mavro OS & ViVi AI Demo</DialogTitle>
                  </DialogHeader>
                  <div className="aspect-video bg-slate-800 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <Play className="w-16 h-16 text-purple-400 mx-auto mb-4" />
                      <p className="text-slate-300">Video demo coming soon...</p>
                      <p className="text-sm text-slate-400 mt-2">Experience the future of AI-powered marketing</p>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">{stat.number}</div>
                <div className="text-sm text-slate-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-black/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-purple-600/30 text-purple-200 border-purple-400">
              <Lightbulb className="w-3 h-3 mr-1" />
              Powerful Features
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Everything You Need to
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                {" "}Dominate Marketing
              </span>
            </h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Mavro OS combines cutting-edge AI with proven marketing strategies to deliver results that matter.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="bg-slate-800/50 border-purple-800/30 hover:bg-slate-800/70 transition-all duration-300 hover:scale-105">
                <CardHeader>
                  <div className="mb-4">{feature.icon}</div>
                  <CardTitle className="text-white text-xl">{feature.title}</CardTitle>
                  <div className="text-sm text-purple-300 italic mt-2">"{feature.tagline}"</div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-slate-300 text-base leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Trademarked Features Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-gradient-to-r from-purple-600/30 to-pink-600/30 text-purple-200 border-purple-400">
              <Shield className="w-3 h-3 mr-1" />
              Proprietary Technology
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Unique Platform
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                {" "}Capabilities
              </span>
            </h2>
            <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto">
              Mavro OS features exclusive, trademarked technology that sets it apart from every other marketing platform. 
              These proprietary systems work together to create marketing excellence that can't be replicated.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* FourSIGHT Analytics */}
            <Card className="group bg-gradient-to-br from-slate-800/50 to-purple-900/30 border-purple-800/30 hover:from-slate-800/70 hover:to-purple-900/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <CardHeader className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className="relative">
                    <BarChart3 className="w-8 h-8 text-purple-400 group-hover:animate-pulse transition-all duration-300" />
                    <div className="absolute -inset-1 bg-purple-500/20 rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <Badge className="bg-purple-600/30 text-purple-200 border-purple-400 text-xs animate-pulse">
                    ™
                  </Badge>
                </div>
                <CardTitle className="text-white text-xl group-hover:text-purple-200 transition-colors duration-300">FourSIGHT™ Analytics</CardTitle>
                <div className="text-sm text-purple-300 italic mt-2 group-hover:text-purple-100 transition-colors duration-300">"Vision that sees beyond the numbers"</div>
              </CardHeader>
              <CardContent className="relative z-10">
                <CardDescription className="text-slate-300 text-base leading-relaxed group-hover:text-slate-200 transition-colors duration-300">
                  Comprehensive analytics dashboard with KPI tracking, performance metrics, and predictive insights that turn data into actionable marketing strategies.
                </CardDescription>
              </CardContent>
            </Card>

            {/* Mavro Magic Composer */}
            <Card className="group bg-gradient-to-br from-slate-800/50 to-pink-900/30 border-purple-800/30 hover:from-slate-800/70 hover:to-pink-900/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-pink-500/25 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-pink-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <CardHeader className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className="relative">
                    <Wand2 className="w-8 h-8 text-pink-400 group-hover:animate-spin transition-all duration-700" />
                    <div className="absolute -inset-1 bg-pink-500/20 rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <Badge className="bg-pink-600/30 text-pink-200 border-pink-400 text-xs animate-pulse">
                    ™
                  </Badge>
                </div>
                <CardTitle className="text-white text-xl group-hover:text-pink-200 transition-colors duration-300">Mavro Magic Composer™</CardTitle>
                <div className="text-sm text-pink-300 italic mt-2 group-hover:text-pink-100 transition-colors duration-300">"Content creation that feels like magic"</div>
              </CardHeader>
              <CardContent className="relative z-10">
                <CardDescription className="text-slate-300 text-base leading-relaxed group-hover:text-slate-200 transition-colors duration-300">
                  AI-powered content generation for multiple platforms that creates platform-perfect posts, stories, and campaigns with zero creative block.
                </CardDescription>
              </CardContent>
            </Card>

            {/* ViVi Agent Store */}
            <Card className="group bg-gradient-to-br from-slate-800/50 to-orange-900/30 border-purple-800/30 hover:from-slate-800/70 hover:to-orange-900/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/25 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <CardHeader className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className="relative">
                    <Store className="w-8 h-8 text-orange-400 group-hover:animate-bounce transition-all duration-300" />
                    <div className="absolute -inset-1 bg-orange-500/20 rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <Badge className="bg-orange-600/30 text-orange-200 border-orange-400 text-xs animate-pulse">
                    ™
                  </Badge>
                </div>
                <CardTitle className="text-white text-xl group-hover:text-orange-200 transition-colors duration-300">ViVi Agent Store™</CardTitle>
                <div className="text-sm text-orange-300 italic mt-2 group-hover:text-orange-100 transition-colors duration-300">"Marketplace for marketing intelligence"</div>
              </CardHeader>
              <CardContent className="relative z-10">
                <CardDescription className="text-slate-300 text-base leading-relaxed group-hover:text-slate-200 transition-colors duration-300">
                  Marketplace for AI-powered marketing tools and specialized agents that enhance every aspect of your marketing operations.
                </CardDescription>
              </CardContent>
            </Card>

            {/* TrendTicker */}
            <Card className="group bg-gradient-to-br from-slate-800/50 to-green-900/30 border-purple-800/30 hover:from-slate-800/70 hover:to-green-900/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-green-500/25 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-green-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <CardHeader className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className="relative">
                    <TrendingUp className="w-8 h-8 text-green-400 group-hover:animate-pulse transition-all duration-300" />
                    <div className="absolute -inset-1 bg-green-500/20 rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <Badge className="bg-green-600/30 text-green-200 border-green-400 text-xs animate-pulse">
                    ™
                  </Badge>
                </div>
                <CardTitle className="text-white text-xl group-hover:text-green-200 transition-colors duration-300">TrendTicker™</CardTitle>
                <div className="text-sm text-green-300 italic mt-2 group-hover:text-green-100 transition-colors duration-300">"Real-time pulse of your industry"</div>
              </CardHeader>
              <CardContent className="relative z-10">
                <CardDescription className="text-slate-300 text-base leading-relaxed group-hover:text-slate-200 transition-colors duration-300">
                  Real-time industry trend monitoring that keeps you ahead of the curve with instant notifications about market shifts and opportunities.
                </CardDescription>
              </CardContent>
            </Card>

            {/* Boost Summary Panel */}
            <Card className="group bg-gradient-to-br from-slate-800/50 to-blue-900/30 border-purple-800/30 hover:from-slate-800/70 hover:to-blue-900/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <CardHeader className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className="relative">
                    <Zap className="w-8 h-8 text-blue-400 group-hover:animate-ping transition-all duration-300" />
                    <div className="absolute -inset-1 bg-blue-500/20 rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <Badge className="bg-blue-600/30 text-blue-200 border-blue-400 text-xs animate-pulse">
                    ™
                  </Badge>
                </div>
                <CardTitle className="text-white text-xl group-hover:text-blue-200 transition-colors duration-300">BoostSummary Panel™</CardTitle>
                <div className="text-sm text-blue-300 italic mt-2 group-hover:text-blue-100 transition-colors duration-300">"Campaign acceleration at your fingertips"</div>
              </CardHeader>
              <CardContent className="relative z-10">
                <CardDescription className="text-slate-300 text-base leading-relaxed group-hover:text-slate-200 transition-colors duration-300">
                  Campaign boost levels (1x, 2x, 3x) with ROI tracking that lets you scale successful campaigns with precision and confidence.
                </CardDescription>
              </CardContent>
            </Card>

            {/* GeoSmart */}
            <Card className="group bg-gradient-to-br from-slate-800/50 to-teal-900/30 border-purple-800/30 hover:from-slate-800/70 hover:to-teal-900/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-teal-500/25 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-teal-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <CardHeader className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className="relative">
                    <MapPin className="w-8 h-8 text-teal-400 group-hover:animate-pulse transition-all duration-300" />
                    <div className="absolute -inset-1 bg-teal-500/20 rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <Badge className="bg-teal-600/30 text-teal-200 border-teal-400 text-xs animate-pulse">
                    ™
                  </Badge>
                </div>
                <CardTitle className="text-white text-xl group-hover:text-teal-200 transition-colors duration-300">GeoSmart™</CardTitle>
                <div className="text-sm text-teal-300 italic mt-2 group-hover:text-teal-100 transition-colors duration-300">"Location intelligence that converts"</div>
              </CardHeader>
              <CardContent className="relative z-10">
                <CardDescription className="text-slate-300 text-base leading-relaxed group-hover:text-slate-200 transition-colors duration-300">
                  Geographic analytics and location-based marketing optimization that delivers hyper-targeted campaigns with local market precision.
                </CardDescription>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12 relative">
            {/* Floating background elements */}
            <div className="absolute -top-8 -left-8 w-16 h-16 bg-purple-500/10 rounded-full blur-xl animate-pulse"></div>
            <div className="absolute -bottom-8 -right-8 w-20 h-20 bg-pink-500/10 rounded-full blur-xl animate-pulse delay-300"></div>
            <div className="absolute top-1/2 left-1/4 w-12 h-12 bg-blue-500/10 rounded-full blur-xl animate-pulse delay-700"></div>
            
            <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-2xl p-8 backdrop-blur-sm border border-purple-800/30 max-w-4xl mx-auto relative overflow-hidden group hover:from-purple-600/30 hover:to-pink-600/30 transition-all duration-500 hover:scale-105">
              {/* Animated gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse"></div>
              
              <div className="relative z-10">
                <div className="flex items-center justify-center mb-4">
                  <Sparkles className="w-8 h-8 text-purple-400 mr-3 animate-pulse" />
                  <h3 className="text-2xl font-bold text-white group-hover:text-purple-100 transition-colors duration-300">
                    Exclusive Proprietary Technology
                  </h3>
                  <Sparkles className="w-8 h-8 text-pink-400 ml-3 animate-pulse delay-300" />
                </div>
                
                <div className="relative">
                  <p className="text-slate-300 mb-6 text-lg group-hover:text-slate-200 transition-colors duration-300">
                    Every trademarked feature represents years of development and testing, creating a marketing ecosystem that's impossible to replicate. 
                    When you choose Mavro OS, you're getting technology that your competitors simply cannot access.
                  </p>
                  
                  {/* Animated quote with enhanced styling */}
                  <div className="relative">
                    <div className="absolute -left-4 top-0 text-4xl text-purple-400/30 font-serif">"</div>
                    <div className="absolute -right-4 bottom-0 text-4xl text-pink-400/30 font-serif">"</div>
                    <div className="text-lg text-purple-200 italic font-semibold group-hover:text-purple-100 transition-colors duration-300 bg-gradient-to-r from-purple-600/10 to-pink-600/10 rounded-lg p-4 mx-4">
                      Why settle for generic tools when you can have trademarked excellence?
                    </div>
                  </div>
                </div>
                
                {/* Fun floating icons */}
                <div className="flex justify-center items-center space-x-4 mt-6">
                  <div className="animate-bounce delay-100">
                    <Shield className="w-5 h-5 text-purple-400" />
                  </div>
                  <div className="animate-bounce delay-200">
                    <Zap className="w-5 h-5 text-yellow-400" />
                  </div>
                  <div className="animate-bounce delay-300">
                    <Target className="w-5 h-5 text-green-400" />
                  </div>
                  <div className="animate-bounce delay-400">
                    <Sparkles className="w-5 h-5 text-pink-400" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Meet ViVi Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-purple-600/30 text-purple-200 border-purple-400">
                <Brain className="w-3 h-3 mr-1" />
                Meet ViVi AI
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Meet ViVi: Your AI Marketing
                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  {" "}Co-Pilot
                </span>
              </h2>
              <p className="text-xl text-slate-300 mb-6 leading-relaxed">
                Not just another chatbot. ViVi is a CMO in code—she learns your brand, deciphers your audience, 
                and continuously optimizes every campaign, 24/7.
              </p>
              
              <div className="text-center mb-8">
                <div className="flex items-center justify-center space-x-6 max-w-4xl mx-auto">
                  {/* Plan */}
                  <div className="group relative">
                    <div className="bg-gradient-to-br from-purple-600 to-purple-400 px-8 py-4 rounded-full text-white font-bold shadow-lg hover:scale-105 transition-all duration-300">
                      <span className="text-lg">Plan</span>
                    </div>
                    <div className="absolute -inset-1 bg-gradient-to-br from-purple-600 to-purple-400 rounded-full blur opacity-40 group-hover:opacity-60 transition-opacity"></div>
                  </div>
                  
                  {/* Arrow 1 */}
                  <div className="flex items-center">
                    <ChevronRight className="w-6 h-6 text-purple-400 animate-pulse" />
                  </div>
                  
                  {/* Track */}
                  <div className="group relative">
                    <div className="bg-gradient-to-br from-green-600 to-green-400 px-8 py-4 rounded-full text-white font-bold shadow-lg hover:scale-105 transition-all duration-300">
                      <span className="text-lg">Track</span>
                    </div>
                    <div className="absolute -inset-1 bg-gradient-to-br from-green-600 to-green-400 rounded-full blur opacity-40 group-hover:opacity-60 transition-opacity"></div>
                  </div>
                  
                  {/* Arrow 2 */}
                  <div className="flex items-center">
                    <ChevronRight className="w-6 h-6 text-green-400 animate-pulse animation-delay-300" />
                  </div>
                  
                  {/* Grow */}
                  <div className="group relative">
                    <div className="bg-gradient-to-br from-blue-600 to-blue-400 px-8 py-4 rounded-full text-white font-bold shadow-lg hover:scale-105 transition-all duration-300">
                      <span className="text-lg">Grow</span>
                    </div>
                    <div className="absolute -inset-1 bg-gradient-to-br from-blue-600 to-blue-400 rounded-full blur opacity-40 group-hover:opacity-60 transition-opacity"></div>
                  </div>
                  
                  {/* Arrow 3 */}
                  <div className="flex items-center">
                    <ChevronRight className="w-6 h-6 text-blue-400 animate-pulse animation-delay-600" />
                  </div>
                  
                  {/* Learn */}
                  <div className="group relative">
                    <div className="bg-gradient-to-br from-yellow-600 to-yellow-400 px-8 py-4 rounded-full text-white font-bold shadow-lg hover:scale-105 transition-all duration-300">
                      <span className="text-lg">Learn</span>
                    </div>
                    <div className="absolute -inset-1 bg-gradient-to-br from-yellow-600 to-yellow-400 rounded-full blur opacity-40 group-hover:opacity-60 transition-opacity"></div>
                  </div>
                </div>
                
                {/* Cycle back arrow */}
                <div className="flex items-center justify-center mt-6">
                  <div className="flex items-center space-x-2 text-yellow-400">
                    <div className="w-0.5 h-6 bg-gradient-to-b from-yellow-400 to-purple-400 animate-pulse"></div>
                    <span className="text-sm opacity-80">Continuous cycle</span>
                    <div className="w-0.5 h-6 bg-gradient-to-b from-yellow-400 to-purple-400 animate-pulse"></div>
                  </div>
                </div>
              </div>
              
              <p className="text-lg text-slate-300 mb-8 text-center">
                ViVi guides you through every stage of your marketing journey:
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-600/30 to-pink-600/30 rounded-full flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="w-5 h-5 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">Predictive Insights & Analytics</h3>
                    <p className="text-slate-300">Anticipate trends and spot high-impact opportunities before they hit.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-600/30 to-pink-600/30 rounded-full flex items-center justify-center flex-shrink-0">
                    <Megaphone className="w-5 h-5 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">Automated Multi-Channel Content</h3>
                    <p className="text-slate-300">Generate, schedule, and post platform-perfect creative—across social, email, and more.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-600/30 to-pink-600/30 rounded-full flex items-center justify-center flex-shrink-0">
                    <Target className="w-5 h-5 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">Dynamic Segmentation & Targeting</h3>
                    <p className="text-slate-300">Tailor messages to the right audience at the right time, down to the individual level.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-2xl p-8 backdrop-blur-sm border border-purple-800/30">
                <div className="flex items-center space-x-4 mb-6">
                  {/* Animated ViVi Icon */}
                  <div className="relative">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center relative overflow-hidden">
                      <Brain className="w-6 h-6 text-white animate-pulse" />
                      {/* Animated glow ring */}
                      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 opacity-30 animate-ping"></div>
                      {/* Orbiting dots */}
                      <div className="absolute inset-0 animate-spin">
                        <div className="absolute w-1 h-1 bg-purple-300 rounded-full top-1 left-1/2 transform -translate-x-1/2"></div>
                        <div className="absolute w-1 h-1 bg-pink-300 rounded-full bottom-1 left-1/2 transform -translate-x-1/2"></div>
                      </div>
                    </div>
                    {/* Floating sparkles */}
                    <div className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-400 rounded-full animate-bounce"></div>
                    <div className="absolute -bottom-1 -left-1 w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce delay-300"></div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white">ViVi AI Assistant</h3>
                    <p className="text-purple-300">Online • Ready to drive results</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="bg-purple-800/30 rounded-lg p-4">
                    <p className="text-slate-300 text-sm">
                      "I've reviewed your last 30 days of engagement and found 5 content formats underperforming—shall I adjust our strategy to boost conversions by 35%?"
                    </p>
                  </div>
                  <div className="bg-slate-800/50 rounded-lg p-4">
                    <p className="text-slate-300 text-sm">
                      "Your TikTok reels just outpaced benchmarks by 65%. I've queued up a week's worth of follow-up scripts to capitalize on this momentum."
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-6 bg-black/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-purple-600/30 text-purple-200 border-purple-400">
              <Users className="w-3 h-3 mr-1" />
              Success Stories
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Businesses Love
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                {" "}Mavro OS
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-slate-800/50 border-purple-800/30 hover:bg-slate-800/70 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <Badge className="bg-green-600/30 text-green-300 border-green-500">
                      {testimonial.impact}
                    </Badge>
                  </div>
                  <p className="text-slate-300 mb-4 italic">"{testimonial.text}"</p>
                  <div>
                    <p className="text-white font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-slate-400">{testimonial.role} at {testimonial.company}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto text-center">
          <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-2xl p-12 backdrop-blur-sm border border-purple-800/30">
            <Badge className="mb-6 bg-purple-600/30 text-purple-200 border-purple-400">
              <Shield className="w-3 h-3 mr-1" />
              Limited Beta Access
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Stop Bleeding Money on
              <span className="bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
                {" "}Bad Marketing
              </span>
            </h2>
            <p className="text-xl text-slate-300 mb-4 max-w-2xl mx-auto">
              While you're reading this, your competitors are already 3 steps ahead. Every second you wait is revenue walking out the door.
            </p>
            <div className="text-lg text-yellow-200 mb-8 max-w-2xl mx-auto italic font-semibold">
              "The best time to start was yesterday. The second best time is right now."
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-6 text-lg font-semibold shadow-2xl"
                onClick={() => setLocation('/dashboard')}
              >
                <Zap className="w-5 h-5 mr-2" />
                Start Your Free Beta Trial
                <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-purple-400 text-purple-300 hover:bg-purple-800/30 px-8 py-6 text-lg font-semibold"
                onClick={() => setLocation('/demo')}
              >
                <Play className="w-5 h-5 mr-2" />
                Try the Demo First
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-purple-800/30 bg-black/20 py-12 px-6">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <span className="text-xl font-bold text-white">Mavro OS</span>
              </div>
              <p className="text-slate-400">
                The future of AI-powered marketing is here. Transform your business with intelligent automation and real-time insights.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" className="hover:text-purple-400">Features</a></li>
                <li><a href="#" className="hover:text-purple-400">Pricing</a></li>
                <li><a href="#" className="hover:text-purple-400">Demo</a></li>
                <li><a href="#" className="hover:text-purple-400">Beta Access</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" className="hover:text-purple-400">About</a></li>
                <li><a href="#" className="hover:text-purple-400">Blog</a></li>
                <li><a href="#" className="hover:text-purple-400">Careers</a></li>
                <li><a href="#" className="hover:text-purple-400">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" className="hover:text-purple-400">Documentation</a></li>
                <li><a href="#" className="hover:text-purple-400">Help Center</a></li>
                <li><a href="#" className="hover:text-purple-400">Community</a></li>
                <li><a href="#" className="hover:text-purple-400">Status</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-purple-800/30 mt-8 pt-8 text-center text-slate-400">
            <p>&copy; 2025 Mavro OS. All rights reserved. Powered by ViVi AI.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;