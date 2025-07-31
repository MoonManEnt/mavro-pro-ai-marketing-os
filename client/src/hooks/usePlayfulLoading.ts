import { useState, useCallback } from 'react';

interface UsePlayfulLoadingOptions {
  defaultDuration?: number;
  mascotType?: 'vivi' | 'mavro' | 'assistant';
  size?: 'small' | 'medium' | 'large';
}

export const usePlayfulLoading = (options: UsePlayfulLoadingOptions = {}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingText, setLoadingText] = useState('');

  const startLoading = useCallback((
    text: string = 'Working on something amazing...',
    duration?: number
  ) => {
    setLoadingText(text);
    setIsLoading(true);
    
    if (duration) {
      setTimeout(() => {
        setIsLoading(false);
      }, duration);
    }
  }, []);

  const stopLoading = useCallback(() => {
    setIsLoading(false);
  }, []);

  return {
    isLoading,
    loadingText,
    startLoading,
    stopLoading,
    mascotType: options.mascotType || 'vivi',
    size: options.size || 'medium',
    defaultDuration: options.defaultDuration || 3000
  };
};

export default usePlayfulLoading;