// Performance monitoring utilities

interface PerformanceMetric {
  name: string;
  value: number;
  unit: string;
  timestamp: number;
  metadata?: Record<string, any>;
}

class PerformanceMonitor {
  private metrics: PerformanceMetric[] = [];
  private observers: Set<(metric: PerformanceMetric) => void> = new Set();

  // Measure function execution time
  async measureAsync<T>(
    name: string,
    fn: () => Promise<T>,
    metadata?: Record<string, any>
  ): Promise<T> {
    const start = performance.now();
    try {
      const result = await fn();
      const duration = performance.now() - start;
      this.recordMetric(name, duration, 'ms', metadata);
      return result;
    } catch (error) {
      const duration = performance.now() - start;
      this.recordMetric(`${name}_error`, duration, 'ms', { ...metadata, error: true });
      throw error;
    }
  }

  // Measure synchronous function execution time
  measureSync<T>(
    name: string,
    fn: () => T,
    metadata?: Record<string, any>
  ): T {
    const start = performance.now();
    try {
      const result = fn();
      const duration = performance.now() - start;
      this.recordMetric(name, duration, 'ms', metadata);
      return result;
    } catch (error) {
      const duration = performance.now() - start;
      this.recordMetric(`${name}_error`, duration, 'ms', { ...metadata, error: true });
      throw error;
    }
  }

  // Record a custom metric
  recordMetric(
    name: string,
    value: number,
    unit: string,
    metadata?: Record<string, any>
  ) {
    const metric: PerformanceMetric = {
      name,
      value,
      unit,
      timestamp: Date.now(),
      metadata,
    };

    this.metrics.push(metric);
    this.notifyObservers(metric);

    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.log(`📊 Performance: ${name} = ${value}${unit}`, metadata);
    }

    // Send to analytics in production
    if (process.env.NODE_ENV === 'production') {
      this.sendToAnalytics(metric);
    }
  }

  // Get metrics by name
  getMetrics(name?: string): PerformanceMetric[] {
    if (name) {
      return this.metrics.filter(m => m.name === name);
    }
    return [...this.metrics];
  }

  // Get average metric value
  getAverageMetric(name: string): number {
    const metrics = this.getMetrics(name);
    if (metrics.length === 0) return 0;
    
    const sum = metrics.reduce((acc, m) => acc + m.value, 0);
    return sum / metrics.length;
  }

  // Subscribe to metric updates
  subscribe(callback: (metric: PerformanceMetric) => void) {
    this.observers.add(callback);
    return () => this.observers.delete(callback);
  }

  private notifyObservers(metric: PerformanceMetric) {
    this.observers.forEach(callback => {
      try {
        callback(metric);
      } catch (error) {
        console.error('Performance observer error:', error);
      }
    });
  }

  private sendToAnalytics(metric: PerformanceMetric) {
    // Send to your analytics service
    // Example: Google Analytics, Mixpanel, etc.
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'performance', {
        event_category: 'performance',
        event_label: metric.name,
        value: Math.round(metric.value),
        custom_parameters: metric.metadata,
      });
    }
  }

  // Clear all metrics
  clear() {
    this.metrics = [];
  }
}

// Global performance monitor instance
export const performanceMonitor = new PerformanceMonitor();

// React hook for measuring component render time
export const usePerformanceMonitor = () => {
  const measureRender = (componentName: string) => {
    return performanceMonitor.measureSync(`${componentName}_render`, () => {
      // This will be called during render
    });
  };

  const measureAsync = (name: string, fn: () => Promise<any>) => {
    return performanceMonitor.measureAsync(name, fn);
  };

  const recordMetric = (name: string, value: number, unit: string, metadata?: Record<string, any>) => {
    performanceMonitor.recordMetric(name, value, unit, metadata);
  };

  return {
    measureRender,
    measureAsync,
    recordMetric,
    getMetrics: performanceMonitor.getMetrics.bind(performanceMonitor),
    getAverageMetric: performanceMonitor.getAverageMetric.bind(performanceMonitor),
  };
};

// Utility to measure page load time
export const measurePageLoad = () => {
  if (typeof window !== 'undefined') {
    window.addEventListener('load', () => {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      if (navigation) {
        performanceMonitor.recordMetric('page_load_time', navigation.loadEventEnd - navigation.loadEventStart, 'ms');
        performanceMonitor.recordMetric('dom_content_loaded', navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart, 'ms');
        performanceMonitor.recordMetric('first_paint', performance.getEntriesByName('first-paint')[0]?.startTime || 0, 'ms');
        performanceMonitor.recordMetric('first_contentful_paint', performance.getEntriesByName('first-contentful-paint')[0]?.startTime || 0, 'ms');
      }
    });
  }
};

// Utility to measure API call performance
export const measureApiCall = async <T>(
  name: string,
  apiCall: () => Promise<T>
): Promise<T> => {
  return performanceMonitor.measureAsync(`api_${name}`, apiCall);
};
