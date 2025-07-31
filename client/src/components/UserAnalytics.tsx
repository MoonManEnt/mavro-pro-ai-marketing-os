import { useEffect } from "react";

interface UserAnalyticsData {
  page: string;
  timestamp: Date;
  userAgent: string;
  sessionId: string;
  userId?: string;
  action: string;
  metadata?: Record<string, any>;
}

class UserAnalytics {
  private static sessionId = Math.random().toString(36).substring(2, 15);
  private static events: UserAnalyticsData[] = [];
  
  static track(action: string, metadata?: Record<string, any>) {
    const event: UserAnalyticsData = {
      page: window.location.pathname,
      timestamp: new Date(),
      userAgent: navigator.userAgent,
      sessionId: this.sessionId,
      action,
      metadata,
    };
    
    this.events.push(event);
    
    // In production, you would send this to your analytics service
    console.log("📊 User Analytics:", event);
    
    // Store in localStorage for demo purposes
    const storedEvents = JSON.parse(localStorage.getItem('userAnalytics') || '[]');
    storedEvents.push(event);
    localStorage.setItem('userAnalytics', JSON.stringify(storedEvents.slice(-100))); // Keep last 100 events
  }
  
  static pageView(page: string) {
    this.track('page_view', { page });
  }
  
  static buttonClick(buttonName: string, location: string) {
    this.track('button_click', { buttonName, location });
  }
  
  static featureUsed(featureName: string, details?: Record<string, any>) {
    this.track('feature_used', { featureName, ...details });
  }
  
  static personaSwitch(fromPersona: string, toPersona: string) {
    this.track('persona_switch', { fromPersona, toPersona });
  }
  
  static contentGenerated(platform: string, contentType: string, success: boolean) {
    this.track('content_generated', { platform, contentType, success });
  }
  
  static viviInteraction(interactionType: string, success: boolean) {
    this.track('vivi_interaction', { interactionType, success });
  }
  
  static errorOccurred(errorType: string, errorMessage: string, location: string) {
    this.track('error_occurred', { errorType, errorMessage, location });
  }
  
  static getAnalytics() {
    return JSON.parse(localStorage.getItem('userAnalytics') || '[]');
  }
  
  static getAnalyticsSummary() {
    const events = this.getAnalytics();
    const summary = {
      totalEvents: events.length,
      uniquePages: [...new Set(events.map((e: any) => e.page))].length,
      sessionDuration: events.length > 0 ? 
        new Date().getTime() - new Date(events[0].timestamp).getTime() : 0,
      topActions: {},
      featuresUsed: [],
      personaSwitches: 0,
      contentGenerated: 0,
      viviInteractions: 0,
      errors: 0,
    };
    
    events.forEach((event: any) => {
      // Count actions
      summary.topActions[event.action] = (summary.topActions[event.action] || 0) + 1;
      
      // Count specific events
      if (event.action === 'feature_used') {
        summary.featuresUsed.push(event.metadata?.featureName);
      } else if (event.action === 'persona_switch') {
        summary.personaSwitches++;
      } else if (event.action === 'content_generated') {
        summary.contentGenerated++;
      } else if (event.action === 'vivi_interaction') {
        summary.viviInteractions++;
      } else if (event.action === 'error_occurred') {
        summary.errors++;
      }
    });
    
    return summary;
  }
}

// React hook for tracking analytics
export function useUserAnalytics() {
  useEffect(() => {
    // Track page view on mount
    UserAnalytics.pageView(window.location.pathname);
  }, []);
  
  return {
    track: UserAnalytics.track,
    pageView: UserAnalytics.pageView,
    buttonClick: UserAnalytics.buttonClick,
    featureUsed: UserAnalytics.featureUsed,
    personaSwitch: UserAnalytics.personaSwitch,
    contentGenerated: UserAnalytics.contentGenerated,
    viviInteraction: UserAnalytics.viviInteraction,
    errorOccurred: UserAnalytics.errorOccurred,
    getAnalytics: UserAnalytics.getAnalytics,
    getSummary: UserAnalytics.getAnalyticsSummary,
  };
}

// Performance monitoring
export class PerformanceMonitor {
  private static metrics: any[] = [];
  
  static startTiming(label: string) {
    performance.mark(`${label}-start`);
  }
  
  static endTiming(label: string) {
    performance.mark(`${label}-end`);
    performance.measure(label, `${label}-start`, `${label}-end`);
    
    const measure = performance.getEntriesByName(label)[0];
    const metric = {
      label,
      duration: measure.duration,
      timestamp: new Date(),
    };
    
    this.metrics.push(metric);
    console.log(`⚡ Performance: ${label} took ${measure.duration.toFixed(2)}ms`);
    
    // Clean up marks
    performance.clearMarks(`${label}-start`);
    performance.clearMarks(`${label}-end`);
    performance.clearMeasures(label);
    
    return metric;
  }
  
  static trackAPICall(endpoint: string, duration: number, success: boolean) {
    const metric = {
      type: 'api_call',
      endpoint,
      duration,
      success,
      timestamp: new Date(),
    };
    
    this.metrics.push(metric);
    UserAnalytics.track('api_call', metric);
  }
  
  static trackRender(componentName: string, duration: number) {
    const metric = {
      type: 'render',
      component: componentName,
      duration,
      timestamp: new Date(),
    };
    
    this.metrics.push(metric);
    console.log(`🎨 Render: ${componentName} rendered in ${duration.toFixed(2)}ms`);
  }
  
  static getMetrics() {
    return this.metrics;
  }
  
  static getPerformanceSummary() {
    const apiCalls = this.metrics.filter(m => m.type === 'api_call');
    const renders = this.metrics.filter(m => m.type === 'render');
    
    return {
      totalAPIRequests: apiCalls.length,
      averageAPITime: apiCalls.length > 0 ? 
        apiCalls.reduce((sum, call) => sum + call.duration, 0) / apiCalls.length : 0,
      apiSuccessRate: apiCalls.length > 0 ?
        (apiCalls.filter(call => call.success).length / apiCalls.length) * 100 : 100,
      totalRenders: renders.length,
      averageRenderTime: renders.length > 0 ?
        renders.reduce((sum, render) => sum + render.duration, 0) / renders.length : 0,
      slowestRenders: renders
        .sort((a, b) => b.duration - a.duration)
        .slice(0, 5)
        .map(r => ({ component: r.component, duration: r.duration })),
    };
  }
}

// React hook for performance monitoring
export function usePerformanceMonitor() {
  return {
    startTiming: PerformanceMonitor.startTiming,
    endTiming: PerformanceMonitor.endTiming,
    trackAPICall: PerformanceMonitor.trackAPICall,
    trackRender: PerformanceMonitor.trackRender,
    getMetrics: PerformanceMonitor.getMetrics,
    getSummary: PerformanceMonitor.getPerformanceSummary,
  };
}

// Auto-track page navigation for SPA
let currentPath = window.location.pathname;
setInterval(() => {
  if (window.location.pathname !== currentPath) {
    currentPath = window.location.pathname;
    UserAnalytics.pageView(currentPath);
  }
}, 1000);

// Track unhandled errors
window.addEventListener('error', (event) => {
  UserAnalytics.errorOccurred(
    'javascript_error',
    event.message,
    event.filename || window.location.pathname
  );
});

window.addEventListener('unhandledrejection', (event) => {
  UserAnalytics.errorOccurred(
    'unhandled_promise_rejection',
    event.reason?.toString() || 'Promise rejection',
    window.location.pathname
  );
});

export { UserAnalytics };