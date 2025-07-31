import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Calendar, Clock, Plus } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { motion } from 'framer-motion';

interface ScheduledItem {
  id: string;
  title: string;
  time: string;
  type: string;
  status: 'today' | 'tomorrow' | 'upcoming';
}

interface SchedulerWidgetProps {
  scheduledItems?: ScheduledItem[];
}

const SchedulerWidget: React.FC<SchedulerWidgetProps> = ({ scheduledItems = [] }) => {
  const defaultItems: ScheduledItem[] = [
    {
      id: 'sched-1',
      title: 'Holiday Campaign Launch',
      time: '2:00 PM - Instagram & Facebook',
      type: 'Campaign',
      status: 'today'
    },
    {
      id: 'sched-2',
      title: 'Newsletter Send',
      time: '9:00 AM - Email Campaign',
      type: 'Email',
      status: 'tomorrow'
    },
    {
      id: 'sched-3',
      title: 'A/B Test Review',
      time: 'Analysis & Optimization',
      type: 'Analysis',
      status: 'upcoming'
    }
  ];

  const items = scheduledItems.length > 0 ? scheduledItems : defaultItems;

  const statusColors = {
    today: 'sunset-orange',
    tomorrow: 'golden-yellow',
    upcoming: 'sky-blue'
  };

  const statusLabels = {
    today: 'Today',
    tomorrow: 'Tomorrow',
    upcoming: 'Dec 28'
  };

  return (
    <Card className="scheduler-widget glass-card border-white/20 bg-white/10">
      <CardHeader>
        <CardTitle className="text-white font-semibold flex items-center justify-between">
          <div className="flex items-center">
            <Calendar className="w-5 h-5 text-teal-accent mr-2" />
            Upcoming Schedule
          </div>
          <Button size="sm" variant="ghost" className="text-white/60 hover:text-white hover:bg-white/10">
            <Plus className="w-4 h-4" />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {items.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white/10 rounded-lg p-3 hover:bg-white/15 transition-all cursor-pointer"
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-white text-sm font-medium">{item.title}</span>
              <Badge
                variant="outline"
                className={`text-${statusColors[item.status]} border-${statusColors[item.status]}/30 bg-${statusColors[item.status]}/10 text-xs`}
              >
                {statusLabels[item.status]}
              </Badge>
            </div>
            <div className="flex items-center text-white/60 text-xs">
              <Clock className="w-3 h-3 mr-1" />
              {item.time}
            </div>
          </motion.div>
        ))}
      </CardContent>
    </Card>
  );
};

export default SchedulerWidget;
