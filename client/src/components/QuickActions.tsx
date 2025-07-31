import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Zap, PlusCircle, Upload, CalendarPlus, Target, Users, BarChart3 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useApp } from '../contexts/AppContext';

const QuickActions: React.FC = () => {
  const { currentPersona } = useApp();

  const quickActions = [
    {
      id: 'create-campaign',
      label: 'Create New Campaign',
      icon: PlusCircle,
      color: 'mint-green',
      action: () => console.log('Create campaign'),
    },
    {
      id: 'import-leads',
      label: 'Import Lead Data',
      icon: Upload,
      color: 'sky-blue',
      action: () => console.log('Import leads'),
    },
    {
      id: 'schedule-content',
      label: 'Schedule Content',
      icon: CalendarPlus,
      color: 'cream-accent',
      action: () => console.log('Schedule content'),
    },
    {
      id: 'analyze-performance',
      label: 'Analyze Performance',
      icon: BarChart3,
      color: 'golden-yellow',
      action: () => console.log('Analyze performance'),
    },
    {
      id: 'target-audience',
      label: 'Build Audience',
      icon: Target,
      color: 'sunset-orange',
      action: () => console.log('Build audience'),
    },
    {
      id: 'manage-leads',
      label: 'Manage Leads',
      icon: Users,
      color: 'teal-accent',
      action: () => console.log('Manage leads'),
    },
  ];

  return (
    <Card className="glass-card border-white/20 bg-white/10 draggable-card">
      <CardHeader>
        <CardTitle className="text-white font-semibold flex items-center">
          <Zap className="w-5 h-5 text-golden-yellow mr-2" />
          Quick Actions
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {quickActions.map((action, index) => (
          <motion.div
            key={action.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Button
              onClick={action.action}
              className="w-full bg-white/10 hover:bg-white/20 text-white text-sm py-3 px-4 rounded-lg text-left transition-all flex items-center justify-start border border-white/20"
              variant="ghost"
            >
              <action.icon className={`w-4 h-4 text-${action.color} mr-3`} />
              {action.label}
            </Button>
          </motion.div>
        ))}
      </CardContent>
    </Card>
  );
};

export default QuickActions;
