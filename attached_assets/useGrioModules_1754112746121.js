
import { useState } from 'react';

export const useGrioModules = () => {
  const [persona] = useState('MedSpa Owner');  // dynamically pulled via ViVi context
  const [xp, setXP] = useState(1200);
  const [userRank, setUserRank] = useState('Bronze');

  const [modules, setModules] = useState([
    {
      id: '1',
      title: 'How to Create Better Reels',
      description: 'Learn quick strategies to shoot, edit, and publish Reels that convert.',
      level: 'Beginner',
      category: 'Video Marketing',
      completed: false
    },
    {
      id: '2',
      title: 'Lighting 101 for Home Studios',
      description: 'Master basic lighting setups using affordable tools.',
      level: 'Intermediate',
      category: 'Content Creation',
      completed: false
    },
    {
      id: '3',
      title: 'Creating Lead-Gen AI Agents',
      description: 'Build a simple AI assistant to capture and nurture leads.',
      level: 'Advanced',
      category: 'AI Tools',
      completed: false
    }
  ]);

  const completeModule = (id) => {
    setModules(prev =>
      prev.map(m => m.id === id ? { ...m, completed: true } : m)
    );
    setXP(prev => prev + 100);
    const newXP = xp + 100;
    if (newXP > 1500) setUserRank('Silver');
    if (newXP > 2500) setUserRank('Gold');
  };

  return { modules, completeModule, persona, xp, userRank };
};
