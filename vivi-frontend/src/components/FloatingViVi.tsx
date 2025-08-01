import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send } from 'lucide-react';
import { useViVi } from '../contexts/ViViContext';

export const FloatingViVi: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const { state, runAnalysis } = useViVi();

  const handleSendMessage = async () => {
    if (!message.trim()) return;
    
    try {
      await runAnalysis({
        persona: { id: 'user', name: 'User', industry: 'General' },
        geo: { country: 'US', region: 'North America' },
        metrics: { engagement: 75 }
      });
      setMessage('');
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  return (
    <>
      <motion.button
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-gradient-primary rounded-full shadow-xl flex items-center justify-center text-white"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        animate={state.isActive ? { 
          boxShadow: [
            '0 0 0 0 rgba(139, 92, 246, 0.7)',
            '0 0 0 10px rgba(139, 92, 246, 0)',
            '0 0 0 0 rgba(139, 92, 246, 0)'
          ]
        } : {}}
        transition={{ duration: 2, repeat: state.isActive ? Infinity : 0 }}
      >
        {isOpen ? <X size={20} /> : <MessageCircle size={20} />}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-24 right-6 z-40 w-80 bg-white rounded-3xl shadow-xl border border-slate-200/50 overflow-hidden"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <div className="bg-gradient-primary p-4 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                    <span className="text-sm font-bold">Vi</span>
                  </div>
                  <div>
                    <h3 className="font-semibold">ViVi Assistant</h3>
                    <p className="text-xs opacity-80">
                      {state.isAnalyzing ? 'Analyzing...' : 'Ready to help'}
                    </p>
                  </div>
                </div>
                {state.isAnalyzing && (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                )}
              </div>
            </div>

            <div className="p-4 max-h-64 overflow-y-auto">
              {state.lastAnalysis ? (
                <div className="space-y-3">
                  <div className="bg-slate-50 rounded-2xl p-3">
                    <p className="text-sm text-slate-600 mb-2">Latest Analysis:</p>
                    <p className="text-sm font-medium">{state.lastAnalysis.decision}</p>
                    {state.lastAnalysis.recommendations && (
                      <div className="mt-2">
                        <p className="text-xs text-slate-500 mb-1">Recommendations:</p>
                        <ul className="text-xs space-y-1">
                          {state.lastAnalysis.recommendations.slice(0, 3).map((rec: string, idx: number) => (
                            <li key={idx} className="text-slate-600">• {rec}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-white font-bold">Vi</span>
                  </div>
                  <p className="text-sm text-slate-600">
                    Hi! I'm ViVi, your AI marketing assistant. How can I help you today?
                  </p>
                </div>
              )}
            </div>

            <div className="p-4 border-t border-slate-100">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Ask ViVi anything..."
                  className="flex-1 px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-mavro-purple/20"
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  disabled={state.isAnalyzing}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!message.trim() || state.isAnalyzing}
                  className="px-3 py-2 bg-gradient-primary text-white rounded-xl hover:shadow-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
