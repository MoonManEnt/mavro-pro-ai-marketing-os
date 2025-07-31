// A/B Testing Engine - Manages campaign A/B tests and performance analysis
import { v4 as uuidv4 } from 'uuid';

class ABTestingEngine {
  constructor() {
    this.abTests = new Map();
    this.testResults = new Map();
    this.initializeSampleTests();
  }

  // Initialize sample A/B tests for demo/testing
  initializeSampleTests() {
    const sampleTests = [
      {
        testId: 'ab_test_001',
        campaignId: 'cmp_sample_001',
        testName: 'Summer Wellness Headline Test',
        status: 'active',
        startDate: '2025-01-20T10:00:00Z',
        endDate: '2025-01-27T10:00:00Z',
        testDuration: 7,
        confidenceLevel: 95,
        trafficSplit: 50,
        variantA: {
          variantId: 'variant_a_001',
          name: 'Original Headline',
          content: {
            headline: 'Transform Your Skin This Summer',
            description: 'Professional wellness treatments for radiant skin',
            cta: 'Book Your Treatment',
            image: 'wellness-original.jpg'
          },
          metrics: {
            impressions: 2500,
            clicks: 180,
            conversions: 32,
            ctr: 7.2,
            conversionRate: 17.8,
            cost: 125.50
          }
        },
        variantB: {
          variantId: 'variant_b_001',
          name: 'Emotional Headline',
          content: {
            headline: 'Unlock Your Most Confident Self',
            description: 'Discover the transformation you deserve',
            cta: 'Start Your Journey',
            image: 'wellness-emotional.jpg'
          },
          metrics: {
            impressions: 2500,
            clicks: 215,
            conversions: 41,
            ctr: 8.6,
            conversionRate: 19.1,
            cost: 118.75
          }
        },
        hypothesis: 'Emotional headlines will drive higher engagement than feature-focused headlines',
        testType: 'content',
        platforms: ['instagram', 'facebook'],
        winner: null,
        significance: null,
        createdAt: '2025-01-20T09:00:00Z',
        userId: 'demo-user'
      },
      {
        testId: 'ab_test_002',
        campaignId: 'cmp_sample_002',
        testName: 'CTA Button Color Test',
        status: 'completed',
        startDate: '2025-01-15T10:00:00Z',
        endDate: '2025-01-22T10:00:00Z',
        testDuration: 7,
        confidenceLevel: 95,
        trafficSplit: 50,
        variantA: {
          variantId: 'variant_a_002',
          name: 'Purple CTA',
          content: {
            headline: 'New Year, New You',
            description: 'Start your transformation journey today',
            cta: 'Get Started',
            ctaColor: '#8B5CF6',
            image: 'transformation-purple.jpg'
          },
          metrics: {
            impressions: 1800,
            clicks: 126,
            conversions: 18,
            ctr: 7.0,
            conversionRate: 14.3,
            cost: 89.25
          }
        },
        variantB: {
          variantId: 'variant_b_002',
          name: 'Green CTA',
          content: {
            headline: 'New Year, New You',
            description: 'Start your transformation journey today',
            cta: 'Get Started',
            ctaColor: '#10B981',
            image: 'transformation-green.jpg'
          },
          metrics: {
            impressions: 1800,
            clicks: 152,
            conversions: 28,
            ctr: 8.4,
            conversionRate: 18.4,
            cost: 82.50
          }
        },
        hypothesis: 'Green CTA buttons will perform better than purple due to positive psychological associations',
        testType: 'design',
        platforms: ['instagram'],
        winner: 'variant_b',
        significance: 96.2,
        createdAt: '2025-01-15T09:00:00Z',
        userId: 'demo-user'
      }
    ];

    // Initialize sample data
    sampleTests.forEach(test => {
      this.abTests.set(test.testId, test);
    });
  }

  // A/B Test CRUD Operations
  async createABTest(testData) {
    const testId = `ab_test_${uuidv4().slice(0, 8)}`;
    
    const abTest = {
      testId,
      campaignId: testData.campaignId,
      testName: testData.testName || 'Untitled A/B Test',
      status: 'draft',
      startDate: testData.startDate,
      endDate: testData.endDate,
      testDuration: testData.testDuration || 7,
      confidenceLevel: testData.confidenceLevel || 95,
      trafficSplit: testData.trafficSplit || 50,
      variantA: {
        variantId: `variant_a_${uuidv4().slice(0, 8)}`,
        name: testData.variantA.name || 'Variant A',
        content: testData.variantA.content,
        metrics: {
          impressions: 0,
          clicks: 0,
          conversions: 0,
          ctr: 0,
          conversionRate: 0,
          cost: 0
        }
      },
      variantB: {
        variantId: `variant_b_${uuidv4().slice(0, 8)}`,
        name: testData.variantB.name || 'Variant B',
        content: testData.variantB.content,
        metrics: {
          impressions: 0,
          clicks: 0,
          conversions: 0,
          ctr: 0,
          conversionRate: 0,
          cost: 0
        }
      },
      hypothesis: testData.hypothesis || '',
      testType: testData.testType || 'content',
      platforms: testData.platforms || ['instagram'],
      winner: null,
      significance: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      userId: testData.userId || 'demo-user'
    };

    this.abTests.set(testId, abTest);
    return abTest;
  }

  async getAllABTests() {
    return Array.from(this.abTests.values());
  }

  async getABTestById(testId) {
    return this.abTests.get(testId) || null;
  }

  async getABTestsByCampaign(campaignId) {
    return Array.from(this.abTests.values())
      .filter(test => test.campaignId === campaignId);
  }

  async getABTestsByUserId(userId) {
    return Array.from(this.abTests.values())
      .filter(test => test.userId === userId);
  }

  async updateABTest(testId, updates) {
    const test = this.abTests.get(testId);
    if (!test) {
      throw new Error('A/B test not found');
    }

    const updatedTest = {
      ...test,
      ...updates,
      updatedAt: new Date().toISOString()
    };

    this.abTests.set(testId, updatedTest);
    return updatedTest;
  }

  async deleteABTest(testId) {
    const test = this.abTests.get(testId);
    if (!test) {
      throw new Error('A/B test not found');
    }

    this.abTests.delete(testId);
    return {
      success: true,
      deletedTest: test
    };
  }

  // Test Lifecycle Management
  async startABTest(testId) {
    const test = this.abTests.get(testId);
    if (!test) {
      throw new Error('A/B test not found');
    }

    if (test.status !== 'draft') {
      throw new Error('Can only start tests in draft status');
    }

    test.status = 'active';
    test.startDate = new Date().toISOString();
    test.updatedAt = new Date().toISOString();

    this.abTests.set(testId, test);
    return test;
  }

  async pauseABTest(testId) {
    const test = this.abTests.get(testId);
    if (!test) {
      throw new Error('A/B test not found');
    }

    test.status = 'paused';
    test.updatedAt = new Date().toISOString();

    this.abTests.set(testId, test);
    return test;
  }

  async stopABTest(testId, winner = null) {
    const test = this.abTests.get(testId);
    if (!test) {
      throw new Error('A/B test not found');
    }

    test.status = 'completed';
    test.endDate = new Date().toISOString();
    test.updatedAt = new Date().toISOString();

    if (winner) {
      test.winner = winner;
      test.significance = await this.calculateStatisticalSignificance(test);
    }

    this.abTests.set(testId, test);
    return test;
  }

  // Metrics and Analysis
  async updateTestMetrics(testId, variantId, metrics) {
    const test = this.abTests.get(testId);
    if (!test) {
      throw new Error('A/B test not found');
    }

    if (test.variantA.variantId === variantId) {
      test.variantA.metrics = { ...test.variantA.metrics, ...metrics };
      // Calculate derived metrics
      test.variantA.metrics.ctr = (test.variantA.metrics.clicks / test.variantA.metrics.impressions * 100).toFixed(2);
      test.variantA.metrics.conversionRate = (test.variantA.metrics.conversions / test.variantA.metrics.clicks * 100).toFixed(2);
    } else if (test.variantB.variantId === variantId) {
      test.variantB.metrics = { ...test.variantB.metrics, ...metrics };
      // Calculate derived metrics
      test.variantB.metrics.ctr = (test.variantB.metrics.clicks / test.variantB.metrics.impressions * 100).toFixed(2);
      test.variantB.metrics.conversionRate = (test.variantB.metrics.conversions / test.variantB.metrics.clicks * 100).toFixed(2);
    } else {
      throw new Error('Variant not found');
    }

    test.updatedAt = new Date().toISOString();
    this.abTests.set(testId, test);

    // Check if test should auto-conclude
    await this.checkAutoConclusion(testId);

    return test;
  }

  async calculateStatisticalSignificance(test) {
    const { variantA, variantB } = test;
    
    // Simple statistical significance calculation
    const aConversions = variantA.metrics.conversions;
    const aImpressions = variantA.metrics.impressions;
    const bConversions = variantB.metrics.conversions;
    const bImpressions = variantB.metrics.impressions;

    if (aImpressions < 100 || bImpressions < 100) {
      return null; // Not enough data
    }

    // Basic z-score calculation for conversion rate difference
    const pA = aConversions / aImpressions;
    const pB = bConversions / bImpressions;
    const pooledP = (aConversions + bConversions) / (aImpressions + bImpressions);
    
    const standardError = Math.sqrt(pooledP * (1 - pooledP) * ((1 / aImpressions) + (1 / bImpressions)));
    const zScore = Math.abs(pA - pB) / standardError;
    
    // Convert z-score to confidence level (simplified)
    const confidenceLevel = Math.min(99.9, (1 - 2 * (1 - this.normalCDF(Math.abs(zScore)))) * 100);
    
    return Math.round(confidenceLevel * 10) / 10;
  }

  // Helper function for normal cumulative distribution function
  normalCDF(x) {
    return 0.5 * (1 + this.erf(x / Math.sqrt(2)));
  }

  // Error function approximation
  erf(x) {
    const a1 =  0.254829592;
    const a2 = -0.284496736;
    const a3 =  1.421413741;
    const a4 = -1.453152027;
    const a5 =  1.061405429;
    const p  =  0.3275911;

    const sign = x < 0 ? -1 : 1;
    x = Math.abs(x);

    const t = 1.0 / (1.0 + p * x);
    const y = 1.0 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);

    return sign * y;
  }

  async checkAutoConclusion(testId) {
    const test = this.abTests.get(testId);
    if (!test || test.status !== 'active') {
      return;
    }

    const significance = await this.calculateStatisticalSignificance(test);
    
    if (significance && significance >= test.confidenceLevel) {
      // Determine winner based on conversion rate
      const aConversionRate = test.variantA.metrics.conversionRate;
      const bConversionRate = test.variantB.metrics.conversionRate;
      
      const winner = aConversionRate > bConversionRate ? 'variant_a' : 'variant_b';
      
      await this.stopABTest(testId, winner);
    }
  }

  // Test Analysis and Insights
  async generateTestInsights(testId) {
    const test = this.abTests.get(testId);
    if (!test) {
      throw new Error('A/B test not found');
    }

    const insights = [];
    const { variantA, variantB } = test;

    // Performance comparison
    const aCtr = parseFloat(variantA.metrics.ctr);
    const bCtr = parseFloat(variantB.metrics.ctr);
    const aConversionRate = parseFloat(variantA.metrics.conversionRate);
    const bConversionRate = parseFloat(variantB.metrics.conversionRate);

    // CTR insights
    if (Math.abs(aCtr - bCtr) > 1.0) {
      const betterVariant = aCtr > bCtr ? 'A' : 'B';
      const improvement = Math.abs(aCtr - bCtr).toFixed(1);
      insights.push({
        type: 'performance',
        title: `Variant ${betterVariant} has ${improvement}% better CTR`,
        description: `This suggests the ${betterVariant === 'A' ? variantA.name : variantB.name} resonates better with your audience`,
        impact: 'medium',
        confidence: 85
      });
    }

    // Conversion rate insights
    if (Math.abs(aConversionRate - bConversionRate) > 2.0) {
      const betterVariant = aConversionRate > bConversionRate ? 'A' : 'B';
      const improvement = Math.abs(aConversionRate - bConversionRate).toFixed(1);
      insights.push({
        type: 'conversion',
        title: `Variant ${betterVariant} converts ${improvement}% better`,
        description: `Higher conversion rates indicate better alignment with user intent`,
        impact: 'high',
        confidence: 92
      });
    }

    // Cost efficiency insights
    const aCostPerConversion = variantA.metrics.cost / (variantA.metrics.conversions || 1);
    const bCostPerConversion = variantB.metrics.cost / (variantB.metrics.conversions || 1);
    
    if (Math.abs(aCostPerConversion - bCostPerConversion) > 5) {
      const betterVariant = aCostPerConversion < bCostPerConversion ? 'A' : 'B';
      const savings = Math.abs(aCostPerConversion - bCostPerConversion).toFixed(2);
      insights.push({
        type: 'cost',
        title: `Variant ${betterVariant} is $${savings} cheaper per conversion`,
        description: `Better cost efficiency allows for more budget allocation to successful variants`,
        impact: 'high',
        confidence: 88
      });
    }

    // Statistical significance insights
    const significance = await this.calculateStatisticalSignificance(test);
    if (significance) {
      if (significance >= 95) {
        insights.push({
          type: 'statistical',
          title: `Results are statistically significant (${significance}%)`,
          description: 'You can confidently implement the winning variant',
          impact: 'high',
          confidence: 99
        });
      } else if (significance >= 80) {
        insights.push({
          type: 'statistical',
          title: `Results show strong trend (${significance}%)`,
          description: 'Consider running the test longer for conclusive results',
          impact: 'medium',
          confidence: 75
        });
      }
    }

    return {
      testId,
      insights,
      recommendations: await this.generateRecommendations(test, insights),
      generatedAt: new Date().toISOString()
    };
  }

  async generateRecommendations(test, insights) {
    const recommendations = [];

    // Winner implementation
    if (test.winner) {
      const winningVariant = test.winner === 'variant_a' ? test.variantA : test.variantB;
      recommendations.push({
        action: 'implement_winner',
        title: `Implement ${winningVariant.name} across all campaigns`,
        description: 'Apply the winning variant\'s elements to similar campaigns',
        priority: 'high',
        expectedImpact: 'Increase overall campaign performance by 15-25%'
      });
    }

    // Future test suggestions
    if (test.testType === 'content') {
      recommendations.push({
        action: 'test_design',
        title: 'Test visual design elements next',
        description: 'Now that content is optimized, test button colors, images, or layout',
        priority: 'medium',
        expectedImpact: 'Additional 10-15% improvement possible'
      });
    }

    // Platform-specific insights
    if (test.platforms.length > 1) {
      recommendations.push({
        action: 'platform_analysis',
        title: 'Analyze platform-specific performance',
        description: 'Different platforms may respond differently to variants',
        priority: 'medium',
        expectedImpact: 'Platform-optimized content for better ROI'
      });
    }

    return recommendations;
  }

  // Test Templates and Suggestions
  async getTestTemplates(industry = null) {
    const templates = [
      {
        templateId: 'headline_test',
        name: 'Headline A/B Test',
        description: 'Test different headline approaches',
        testType: 'content',
        industry: 'general',
        elements: ['headline', 'subheadline'],
        duration: 7,
        minTraffic: 1000
      },
      {
        templateId: 'cta_test',
        name: 'Call-to-Action Test',
        description: 'Test different CTA text and colors',
        testType: 'design',
        industry: 'general',
        elements: ['cta_text', 'cta_color', 'cta_size'],
        duration: 5,
        minTraffic: 500
      },
      {
        templateId: 'image_test',
        name: 'Visual Content Test',
        description: 'Test different images or video content',
        testType: 'creative',
        industry: 'general',
        elements: ['main_image', 'background', 'video'],
        duration: 10,
        minTraffic: 2000
      },
      {
        templateId: 'wellness_service_test',
        name: 'Wellness Service Positioning',
        description: 'Test different service presentation approaches',
        testType: 'content',
        industry: 'wellness',
        elements: ['benefits', 'social_proof', 'pricing'],
        duration: 14,
        minTraffic: 1500
      }
    ];

    if (industry) {
      return templates.filter(t => t.industry === industry || t.industry === 'general');
    }

    return templates;
  }

  async suggestNextTest(campaignId, previousTests = []) {
    const suggestions = [];

    // Analyze what has been tested before
    const testedElements = new Set();
    previousTests.forEach(test => {
      testedElements.add(test.testType);
    });

    // Suggest complementary tests
    if (!testedElements.has('content')) {
      suggestions.push({
        type: 'content',
        title: 'Test Headline Variations',
        description: 'Test emotional vs. rational headline approaches',
        expectedLift: '15-30%',
        priority: 'high'
      });
    }

    if (!testedElements.has('design')) {
      suggestions.push({
        type: 'design',
        title: 'Test CTA Button Design',
        description: 'Test different colors, sizes, and positioning',
        expectedLift: '10-20%',
        priority: 'medium'
      });
    }

    if (!testedElements.has('creative')) {
      suggestions.push({
        type: 'creative',
        title: 'Test Visual Content',
        description: 'Test images vs. videos vs. carousels',
        expectedLift: '20-40%',
        priority: 'high'
      });
    }

    return {
      campaignId,
      suggestions,
      generatedAt: new Date().toISOString()
    };
  }
}

// Export singleton instance
const abTestingEngine = new ABTestingEngine();
export default abTestingEngine;