import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Eye, Instagram, Facebook, Twitter, Linkedin, Mail, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

interface PostPreview {
  id: string;
  title: string;
  platform: string;
  status: 'draft' | 'scheduled' | 'published';
  previewImage?: string;
  content: string;
  scheduledFor?: string;
}

interface PostPreviewPanelProps {
  posts?: PostPreview[];
}

const PostPreviewPanel: React.FC<PostPreviewPanelProps> = ({ posts = [] }) => {
  const [selectedPost, setSelectedPost] = useState<PostPreview | null>(null);

  const defaultPosts: PostPreview[] = [
    {
      id: 'post-1',
      title: 'Holiday Glow Special',
      platform: 'Instagram',
      status: 'scheduled',
      content: '✨ Transform your holiday glow with our exclusive Botox special! Book now and save 20% on your first treatment. Limited time offer! #HolidayGlow #MedSpa #Botox',
      scheduledFor: '2024-12-22T14:00:00Z'
    },
    {
      id: 'post-2',
      title: 'Before & After Showcase',
      platform: 'Facebook',
      status: 'draft',
      content: 'Amazing transformation! See how our client achieved natural-looking results with our expert team. Book your consultation today! 📞 (555) 123-4567',
      scheduledFor: undefined
    },
    {
      id: 'post-3',
      title: 'Weekend Brunch Menu',
      platform: 'Instagram',
      status: 'published',
      content: '🥞 Weekend brunch is here! Fresh ingredients, authentic flavors, and the perfect atmosphere for your weekend getaway. Reserve your table today! #WeekendBrunch #ItalianCuisine',
      scheduledFor: undefined
    }
  ];

  const activePosts = posts.length > 0 ? posts : defaultPosts;

  const platformIcons = {
    Instagram: Instagram,
    Facebook: Facebook,
    Twitter: Twitter,
    LinkedIn: Linkedin,
    Email: Mail
  };

  const statusColors = {
    draft: 'golden-yellow',
    scheduled: 'teal-accent',
    published: 'mint-green'
  };

  const PlatformIcon = platformIcons[selectedPost?.platform as keyof typeof platformIcons] || Eye;

  return (
    <Card className="post-preview-panel glass-card border-white/20 bg-white/10">
      <CardHeader>
        <CardTitle className="text-white font-semibold flex items-center">
          <Eye className="w-5 h-5 text-sky-blue mr-2" />
          Content Preview
        </CardTitle>
      </CardHeader>
      <CardContent>
        {!selectedPost ? (
          <div className="space-y-3">
            {activePosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/10 rounded-lg p-3 hover:bg-white/15 transition-all cursor-pointer"
                onClick={() => setSelectedPost(post)}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    {React.createElement(platformIcons[post.platform as keyof typeof platformIcons] || Eye, {
                      className: "w-4 h-4 text-sky-blue"
                    })}
                    <span className="text-white text-sm font-medium">{post.title}</span>
                  </div>
                  <Badge
                    variant="outline"
                    className={`text-${statusColors[post.status]} border-${statusColors[post.status]}/30 bg-${statusColors[post.status]}/10 text-xs`}
                  >
                    {post.status}
                  </Badge>
                </div>
                <p className="text-white/60 text-xs truncate">{post.content}</p>
                {post.scheduledFor && (
                  <div className="flex items-center text-white/40 text-xs mt-1">
                    <Calendar className="w-3 h-3 mr-1" />
                    {new Date(post.scheduledFor).toLocaleDateString()}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <PlatformIcon className="w-5 h-5 text-sky-blue" />
                <span className="text-white font-medium">{selectedPost.title}</span>
              </div>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setSelectedPost(null)}
                className="text-white/60 hover:text-white hover:bg-white/10"
              >
                Back
              </Button>
            </div>

            <div className="bg-white/10 rounded-lg p-4">
              <div className="mb-3">
                <Badge
                  variant="outline"
                  className={`text-${statusColors[selectedPost.status]} border-${statusColors[selectedPost.status]}/30 bg-${statusColors[selectedPost.status]}/10`}
                >
                  {selectedPost.status}
                </Badge>
              </div>
              <p className="text-white/90 text-sm leading-relaxed">{selectedPost.content}</p>
              {selectedPost.scheduledFor && (
                <div className="flex items-center text-white/60 text-xs mt-3 pt-3 border-t border-white/20">
                  <Calendar className="w-3 h-3 mr-1" />
                  Scheduled for {new Date(selectedPost.scheduledFor).toLocaleString()}
                </div>
              )}
            </div>

            <div className="flex space-x-2">
              <Button
                size="sm"
                className="bg-sky-blue hover:bg-sky-blue/80 text-white"
              >
                Edit Post
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10"
              >
                Preview
              </Button>
            </div>
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
};

export default PostPreviewPanel;
