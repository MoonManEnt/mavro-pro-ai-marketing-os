import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Bug, Lightbulb, Star, MessageSquare, Camera, Send, Heart, ThumbsUp, TrendingUp } from "lucide-react";

interface FeedbackData {
  type: 'bug' | 'feature' | 'improvement' | 'general';
  title: string;
  description: string;
  severity?: 'low' | 'medium' | 'high' | 'critical';
  category?: 'ui' | 'performance' | 'functionality' | 'data' | 'integration' | 'other';
  steps?: string;
  expectedBehavior?: string;
  actualBehavior?: string;
}

export default function BetaFeedbackPage() {
  const [feedbackType, setFeedbackType] = useState<'bug' | 'feature' | 'improvement' | 'general'>('general');
  const [formData, setFormData] = useState<Partial<FeedbackData>>({});
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const { toast } = useToast();

  const submitFeedback = useMutation({
    mutationFn: async (data: FeedbackData) => {
      return await apiRequest('/api/feedback', {
        method: 'POST',
        body: JSON.stringify({
          ...data,
          browserInfo: {
            userAgent: navigator.userAgent,
            viewport: `${window.innerWidth}x${window.innerHeight}`,
            url: window.location.href,
          }
        }),
      });
    },
    onSuccess: () => {
      toast({
        title: "Feedback Submitted!",
        description: "Thank you for helping us improve Mavro Pro. We'll review your feedback soon.",
        variant: "default",
      });
      setFormData({});
    },
    onError: () => {
      toast({
        title: "Submission Failed",
        description: "We couldn't submit your feedback right now. Please try again.",
        variant: "destructive",
      });
    },
  });

  const submitRating = useMutation({
    mutationFn: async (data: { rating: number; comment?: string }) => {
      return await apiRequest('/api/feedback/rating', {
        method: 'POST',
        body: JSON.stringify(data),
      });
    },
    onSuccess: () => {
      toast({
        title: "Thank You!",
        description: "Your rating helps us improve Mavro Pro for everyone.",
        variant: "default",
      });
      setRating(0);
      setComment('');
    },
    onError: () => {
      toast({
        title: "Rating Failed",
        description: "We couldn't submit your rating right now. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleFeedbackSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.description) {
      toast({
        title: "Missing Information",
        description: "Please provide both a title and description for your feedback.",
        variant: "destructive",
      });
      return;
    }

    const feedbackData: FeedbackData = {
      type: feedbackType,
      title: formData.title!,
      description: formData.description!,
      severity: formData.severity,
      category: formData.category,
      steps: formData.steps,
      expectedBehavior: formData.expectedBehavior,
      actualBehavior: formData.actualBehavior,
    };

    submitFeedback.mutate(feedbackData);
  };

  const handleRatingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) {
      toast({
        title: "Please Rate",
        description: "Please select a rating before submitting.",
        variant: "destructive",
      });
      return;
    }
    submitRating.mutate({ rating, comment: comment || undefined });
  };

  const feedbackTypes = [
    { value: 'bug' as const, label: 'Bug Report', icon: Bug, color: 'text-red-500', bg: 'bg-red-50', border: 'border-red-200' },
    { value: 'feature' as const, label: 'Feature Request', icon: Lightbulb, color: 'text-yellow-500', bg: 'bg-yellow-50', border: 'border-yellow-200' },
    { value: 'improvement' as const, label: 'Improvement', icon: TrendingUp, color: 'text-blue-500', bg: 'bg-blue-50', border: 'border-blue-200' },
    { value: 'general' as const, label: 'General Feedback', icon: MessageSquare, color: 'text-gray-500', bg: 'bg-gray-50', border: 'border-gray-200' },
  ];

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Beta Feedback Center</h1>
          <p className="text-gray-600 text-lg">
            Help us make Mavro Pro the best marketing platform possible
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Rating Section */}
          <Card className="border-purple-200 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50">
              <CardTitle className="flex items-center space-x-2 text-purple-900">
                <Heart className="w-6 h-6" />
                <span>Rate Your Experience</span>
              </CardTitle>
              <CardDescription>
                How are you enjoying Mavro Pro beta?
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <form onSubmit={handleRatingSubmit} className="space-y-6">
                {/* Star Rating */}
                <div className="text-center">
                  <Label className="text-gray-700 font-medium mb-4 block">Overall Rating</Label>
                  <div className="flex justify-center space-x-2 mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        className="transition-colors hover:scale-110 transform"
                      >
                        <Star
                          className={`w-10 h-10 ${
                            star <= rating 
                              ? 'text-yellow-400 fill-yellow-400' 
                              : 'text-gray-300 hover:text-yellow-300'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                  {rating > 0 && (
                    <p className="text-sm text-gray-600">
                      {rating === 5 ? "Amazing! 🎉" : 
                       rating === 4 ? "Great! 👍" :
                       rating === 3 ? "Good 👌" :
                       rating === 2 ? "Could be better 🤔" :
                       "Needs improvement 💪"}
                    </p>
                  )}
                </div>

                {/* Comment */}
                <div className="space-y-2">
                  <Label htmlFor="rating-comment" className="text-gray-700 font-medium">
                    Tell us more (optional)
                  </Label>
                  <Textarea
                    id="rating-comment"
                    placeholder="What do you love? What could be better?"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="border-gray-200 focus:border-purple-400 focus:ring-purple-400"
                    rows={4}
                  />
                </div>

                <Button
                  type="submit"
                  disabled={submitRating.isPending || rating === 0}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                >
                  {submitRating.isPending ? (
                    "Submitting..."
                  ) : (
                    <>
                      <ThumbsUp className="w-4 h-4 mr-2" />
                      Submit Rating
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Detailed Feedback Section */}
          <Card className="border-blue-200 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
              <CardTitle className="flex items-center space-x-2 text-blue-900">
                <MessageSquare className="w-6 h-6" />
                <span>Detailed Feedback</span>
              </CardTitle>
              <CardDescription>
                Share bugs, feature requests, or suggestions
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <form onSubmit={handleFeedbackSubmit} className="space-y-6">
                {/* Feedback Type Selection */}
                <div className="space-y-3">
                  <Label className="text-gray-700 font-medium">Feedback Type</Label>
                  <div className="grid grid-cols-2 gap-3">
                    {feedbackTypes.map((type) => (
                      <Button
                        key={type.value}
                        type="button"
                        variant={feedbackType === type.value ? "default" : "outline"}
                        className={`p-4 h-auto justify-start space-x-2 ${
                          feedbackType === type.value 
                            ? 'bg-purple-600 hover:bg-purple-700 text-white' 
                            : `${type.bg} hover:${type.bg} ${type.border} hover:border-purple-300 text-gray-700`
                        }`}
                        onClick={() => setFeedbackType(type.value)}
                      >
                        <type.icon className={`w-5 h-5 ${feedbackType === type.value ? 'text-white' : type.color}`} />
                        <span className="text-sm">{type.label}</span>
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Title */}
                <div className="space-y-2">
                  <Label htmlFor="feedback-title" className="text-gray-700 font-medium">
                    Title *
                  </Label>
                  <Input
                    id="feedback-title"
                    placeholder="Brief summary of your feedback"
                    value={formData.title || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    className="border-gray-200 focus:border-purple-400 focus:ring-purple-400"
                    required
                  />
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Label htmlFor="feedback-description" className="text-gray-700 font-medium">
                    Description *
                  </Label>
                  <Textarea
                    id="feedback-description"
                    placeholder="Provide detailed information about your feedback"
                    value={formData.description || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    className="border-gray-200 focus:border-purple-400 focus:ring-purple-400"
                    rows={4}
                    required
                  />
                </div>

                {/* Bug-specific fields */}
                {feedbackType === 'bug' && (
                  <div className="space-y-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <h4 className="font-medium text-red-800">Bug Report Details</h4>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-gray-700 font-medium">Severity</Label>
                        <Select value={formData.severity || ''} onValueChange={(value) => setFormData(prev => ({ ...prev, severity: value as any }))}>
                          <SelectTrigger className="border-gray-200 focus:border-red-400">
                            <SelectValue placeholder="Select severity" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="low">Low</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="high">High</SelectItem>
                            <SelectItem value="critical">Critical</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label className="text-gray-700 font-medium">Category</Label>
                        <Select value={formData.category || ''} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value as any }))}>
                          <SelectTrigger className="border-gray-200 focus:border-red-400">
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="ui">User Interface</SelectItem>
                            <SelectItem value="performance">Performance</SelectItem>
                            <SelectItem value="functionality">Functionality</SelectItem>
                            <SelectItem value="data">Data Issues</SelectItem>
                            <SelectItem value="integration">Integration</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="steps" className="text-gray-700 font-medium">
                        Steps to Reproduce
                      </Label>
                      <Textarea
                        id="steps"
                        placeholder="1. Go to... 2. Click on... 3. Notice that..."
                        value={formData.steps || ''}
                        onChange={(e) => setFormData(prev => ({ ...prev, steps: e.target.value }))}
                        className="border-gray-200 focus:border-red-400"
                        rows={3}
                      />
                    </div>
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={submitFeedback.isPending}
                  className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white"
                >
                  {submitFeedback.isPending ? (
                    "Submitting..."
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Submit Feedback
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Thank You Section */}
        <Card className="border-green-200 shadow-lg">
          <CardContent className="p-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Thank You for Being a Beta Tester!</h3>
              <p className="text-gray-600 mb-4">
                Your feedback is invaluable in shaping the future of Mavro Pro. Every bug report, feature request, 
                and suggestion helps us create a better marketing platform for businesses like yours.
              </p>
              <div className="flex justify-center space-x-8 text-sm text-gray-500">
                <div className="text-center">
                  <div className="font-semibold text-purple-600">Fast Response</div>
                  <div>Within 24 hours</div>
                </div>
                <div className="text-center">
                  <div className="font-semibold text-purple-600">Regular Updates</div>
                  <div>Weekly improvements</div>
                </div>
                <div className="text-center">
                  <div className="font-semibold text-purple-600">Your Impact</div>
                  <div>Direct feature influence</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}