import React, { useEffect, useState } from "react";
import { useViVi } from "@/contexts/ViViContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Calendar, Clock, Send } from "lucide-react";

const PostSchedulerExample: React.FC = () => {
  const { vivi } = useViVi();
  const { toast } = useToast();
  const [postContent, setPostContent] = useState("");
  const [postType, setPostType] = useState("Instagram Post");
  const [scheduledTime, setScheduledTime] = useState("");
  const [postScheduled, setPostScheduled] = useState(false);
  const [generatedContent, setGeneratedContent] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const postTypes = [
    "Instagram Post",
    "Facebook Post", 
    "Twitter Tweet",
    "LinkedIn Post",
    "TikTok Caption",
    "YouTube Description"
  ];

  useEffect(() => {
    if (postScheduled && postContent.trim()) {
      setIsGenerating(true);
      vivi.generateContent(postContent, postType)
        .then(content => {
          setGeneratedContent(content);
          console.log("ViVi's Suggestion:", content);
          toast({
            title: "Content Generated!",
            description: "ViVi has created optimized content for your post.",
          });
        })
        .catch(error => {
          console.error("Content generation failed:", error);
          toast({
            title: "Generation Failed",
            description: "Unable to generate content. Please try again.",
            variant: "destructive",
          });
        })
        .finally(() => {
          setIsGenerating(false);
          setPostScheduled(false);
        });
    }
  }, [postScheduled, postContent, postType, vivi, toast]);

  const handleSchedulePost = () => {
    if (!postContent.trim()) {
      toast({
        title: "Content Required",
        description: "Please enter content for your post.",
        variant: "destructive",
      });
      return;
    }
    
    setPostScheduled(true);
  };

  const getCurrentDateTime = () => {
    const now = new Date();
    now.setMinutes(now.getMinutes() + 30); // Default to 30 minutes from now
    return now.toISOString().slice(0, 16);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="w-5 h-5" />
          Post Scheduler with ViVi AI
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Post Content Input */}
        <div className="space-y-2">
          <Label htmlFor="postContent">Post Content</Label>
          <Input
            id="postContent"
            placeholder="Enter your post idea (e.g., 'Flash Sale on Facials')"
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
            disabled={isGenerating}
          />
        </div>

        {/* Post Type Selection */}
        <div className="space-y-2">
          <Label>Post Type</Label>
          <Select value={postType} onValueChange={setPostType} disabled={isGenerating}>
            <SelectTrigger>
              <SelectValue placeholder="Select post type" />
            </SelectTrigger>
            <SelectContent>
              {postTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Schedule Time */}
        <div className="space-y-2">
          <Label htmlFor="scheduledTime">Schedule Time</Label>
          <Input
            id="scheduledTime"
            type="datetime-local"
            value={scheduledTime}
            onChange={(e) => setScheduledTime(e.target.value)}
            min={getCurrentDateTime()}
            disabled={isGenerating}
          />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button
            onClick={handleSchedulePost}
            disabled={isGenerating || !postContent.trim()}
            className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
          >
            {isGenerating ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Generating...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Send className="w-4 h-4" />
                Generate & Schedule
              </div>
            )}
          </Button>
        </div>

        {/* Generated Content Display */}
        {generatedContent && (
          <div className="space-y-2">
            <Label>ViVi's Optimized Content:</Label>
            <div className="p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border">
              <p className="text-sm whitespace-pre-wrap">{generatedContent}</p>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPostContent(generatedContent)}
              >
                Use This Content
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  navigator.clipboard.writeText(generatedContent);
                  toast({
                    title: "Copied!",
                    description: "Content copied to clipboard.",
                  });
                }}
              >
                Copy to Clipboard
              </Button>
            </div>
          </div>
        )}

        {/* Scheduling Information */}
        {scheduledTime && (
          <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-center gap-2 text-blue-700">
              <Clock className="w-4 h-4" />
              <span className="text-sm font-medium">
                Scheduled for: {new Date(scheduledTime).toLocaleString()}
              </span>
            </div>
          </div>
        )}

        {/* Tips */}
        <div className="text-xs text-gray-500 space-y-1">
          <p>💡 Tip: ViVi AI will optimize your content for maximum engagement on the selected platform.</p>
          <p>⏰ Best posting times are automatically suggested based on your audience insights.</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default PostSchedulerExample;