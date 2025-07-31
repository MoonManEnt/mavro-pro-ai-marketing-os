import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Bug, Lightbulb, Star, MessageSquare, Camera, Send } from "lucide-react";

interface FeedbackData {
  type: 'bug' | 'feature' | 'improvement' | 'general';
  title: string;
  description: string;
  severity?: 'low' | 'medium' | 'high' | 'critical';
  category?: 'ui' | 'performance' | 'functionality' | 'data' | 'integration' | 'other';
  steps?: string;
  expectedBehavior?: string;
  actualBehavior?: string;
  browserInfo?: {
    userAgent: string;
    viewport: string;
    url: string;
  };
  screenshot?: string;
}

export function BetaFeedbackSystem() {
  const [isOpen, setIsOpen] = useState(false);
  const [feedbackType, setFeedbackType] = useState<'bug' | 'feature' | 'improvement' | 'general'>('general');
  const [formData, setFormData] = useState<Partial<FeedbackData>>({});
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
      setIsOpen(false);
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

  const handleSubmit = async (e: React.FormEvent) => {
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

  const captureScreenshot = async () => {
    try {
      // Note: This would require additional setup for actual screenshot capture
      // For now, we'll simulate the feature
      toast({
        title: "Screenshot Feature",
        description: "Screenshot capture will be available in the next update!",
        variant: "default",
      });
    } catch (error) {
      toast({
        title: "Screenshot Failed",
        description: "Couldn't capture screenshot. Please describe the issue instead.",
        variant: "destructive",
      });
    }
  };

  const feedbackTypes = [
    { value: 'bug' as const, label: 'Bug Report', icon: Bug, color: 'text-red-500' },
    { value: 'feature' as const, label: 'Feature Request', icon: Lightbulb, color: 'text-yellow-500' },
    { value: 'improvement' as const, label: 'Improvement', icon: Star, color: 'text-blue-500' },
    { value: 'general' as const, label: 'General Feedback', icon: MessageSquare, color: 'text-gray-500' },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="fixed bottom-6 right-6 z-50 bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/20 transition-all duration-200 shadow-lg"
        >
          <MessageSquare className="w-4 h-4 mr-2" />
          Beta Feedback
        </Button>
      </DialogTrigger>
      
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-purple-900/95 to-blue-900/95 backdrop-blur-xl border-white/20">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-white">
            Help Us Improve Mavro Pro
          </DialogTitle>
          <p className="text-gray-300">
            Your feedback is crucial for making Mavro Pro the best marketing platform possible.
          </p>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Feedback Type Selection */}
          <div className="space-y-3">
            <Label className="text-white font-medium">What type of feedback is this?</Label>
            <div className="grid grid-cols-2 gap-3">
              {feedbackTypes.map((type) => (
                <Button
                  key={type.value}
                  type="button"
                  variant={feedbackType === type.value ? "default" : "outline"}
                  className={`p-4 h-auto justify-start space-x-2 ${
                    feedbackType === type.value 
                      ? 'bg-purple-600 hover:bg-purple-700' 
                      : 'bg-white/10 hover:bg-white/20 border-white/20'
                  }`}
                  onClick={() => setFeedbackType(type.value)}
                >
                  <type.icon className={`w-5 h-5 ${type.color}`} />
                  <span className="text-white">{type.label}</span>
                </Button>
              ))}
            </div>
          </div>

          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title" className="text-white font-medium">
              Title *
            </Label>
            <Input
              id="title"
              placeholder="Brief summary of your feedback"
              value={formData.title || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              className="bg-white/10 border-white/20 text-white placeholder-gray-400"
              required
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description" className="text-white font-medium">
              Description *
            </Label>
            <Textarea
              id="description"
              placeholder="Provide detailed information about your feedback"
              value={formData.description || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className="bg-white/10 border-white/20 text-white placeholder-gray-400 min-h-[120px]"
              required
            />
          </div>

          {/* Bug-specific fields */}
          {feedbackType === 'bug' && (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-white font-medium">Severity</Label>
                  <Select value={formData.severity || ''} onValueChange={(value) => setFormData(prev => ({ ...prev, severity: value as any }))}>
                    <SelectTrigger className="bg-white/10 border-white/20 text-white">
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
                  <Label className="text-white font-medium">Category</Label>
                  <Select value={formData.category || ''} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value as any }))}>
                    <SelectTrigger className="bg-white/10 border-white/20 text-white">
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
                <Label htmlFor="steps" className="text-white font-medium">
                  Steps to Reproduce
                </Label>
                <Textarea
                  id="steps"
                  placeholder="1. Go to... 2. Click on... 3. Notice that..."
                  value={formData.steps || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, steps: e.target.value }))}
                  className="bg-white/10 border-white/20 text-white placeholder-gray-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="expected" className="text-white font-medium">
                    Expected Behavior
                  </Label>
                  <Textarea
                    id="expected"
                    placeholder="What should happen?"
                    value={formData.expectedBehavior || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, expectedBehavior: e.target.value }))}
                    className="bg-white/10 border-white/20 text-white placeholder-gray-400"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="actual" className="text-white font-medium">
                    Actual Behavior
                  </Label>
                  <Textarea
                    id="actual"
                    placeholder="What actually happens?"
                    value={formData.actualBehavior || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, actualBehavior: e.target.value }))}
                    className="bg-white/10 border-white/20 text-white placeholder-gray-400"
                  />
                </div>
              </div>

              <Button
                type="button"
                variant="outline"
                onClick={captureScreenshot}
                className="bg-white/10 hover:bg-white/20 border-white/20 text-white"
              >
                <Camera className="w-4 h-4 mr-2" />
                Capture Screenshot
              </Button>
            </>
          )}

          {/* Submit Button */}
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
              className="flex-1 bg-white/10 hover:bg-white/20 border-white/20 text-white"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={submitFeedback.isPending}
              className="flex-1 bg-purple-600 hover:bg-purple-700 text-white"
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
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export function UserRatingFeedback() {
  const [isOpen, setIsOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const { toast } = useToast();

  const submitRating = useMutation({
    mutationFn: async (data: { rating: number; comment?: string }) => {
      return await apiRequest('/api/feedback/user', {
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
      setIsOpen(false);
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

  const handleSubmit = (e: React.FormEvent) => {
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

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="fixed top-6 left-6 z-40 bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/20 transition-all duration-200 shadow-lg"
        >
          <Star className="w-4 h-4 mr-2" />
          Rate Beta
        </Button>
      </DialogTrigger>
      
      <DialogContent className="max-w-md bg-gradient-to-br from-purple-900/95 to-blue-900/95 backdrop-blur-xl border-white/20">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-white text-center">
            Rate Your Experience
          </DialogTitle>
          <p className="text-gray-300 text-center">
            How are you enjoying Mavro Pro beta?
          </p>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Star Rating */}
          <div className="flex justify-center space-x-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                className="transition-colors"
              >
                <Star
                  className={`w-8 h-8 ${
                    star <= rating 
                      ? 'text-yellow-400 fill-yellow-400' 
                      : 'text-gray-400 hover:text-yellow-300'
                  }`}
                />
              </button>
            ))}
          </div>

          {/* Comment */}
          <div className="space-y-2">
            <Label htmlFor="comment" className="text-white font-medium">
              Tell us more (optional)
            </Label>
            <Textarea
              id="comment"
              placeholder="What do you love? What could be better?"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="bg-white/10 border-white/20 text-white placeholder-gray-400"
            />
          </div>

          {/* Submit Button */}
          <div className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
              className="flex-1 bg-white/10 hover:bg-white/20 border-white/20 text-white"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={submitRating.isPending}
              className="flex-1 bg-purple-600 hover:bg-purple-700 text-white"
            >
              {submitRating.isPending ? "Submitting..." : "Submit Rating"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}