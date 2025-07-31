// ViVi AI Models - Database Schema for Production AI System
import { Sequelize, DataTypes } from 'sequelize';

// Use existing DATABASE_URL from Mavro Pro
export const sequelize = new Sequelize(process.env.DATABASE_URL);

// User Social Media Connectors
export const UserConnector = sequelize.define('UserConnector', {
  userId: { type: DataTypes.STRING, allowNull: false },
  platform: { type: DataTypes.STRING, allowNull: false },
  accessToken: { type: DataTypes.TEXT, allowNull: false },
  refreshToken: { type: DataTypes.TEXT, allowNull: false },
  expiresAt: { type: DataTypes.DATE, allowNull: false }
});

// Scheduled Posts
export const ScheduledPost = sequelize.define('ScheduledPost', {
  postId: { type: DataTypes.INTEGER, allowNull: false },
  userId: { type: DataTypes.STRING, allowNull: false },
  publishAt: { type: DataTypes.DATE, allowNull: false },
  content: { type: DataTypes.TEXT, allowNull: false },
  platforms: { type: DataTypes.JSON, allowNull: false },
  status: { type: DataTypes.STRING, defaultValue: 'scheduled' }
});

// Feature Settings
export const FeatureSetting = sequelize.define('FeatureSetting', {
  key: { type: DataTypes.STRING, primaryKey: true },
  value: { type: DataTypes.BOOLEAN, allowNull: false }
});

// Academy Comments
export const AcademyComment = sequelize.define('AcademyComment', {
  moduleId: { type: DataTypes.STRING, allowNull: false },
  author: { type: DataTypes.STRING, allowNull: false },
  text: { type: DataTypes.TEXT, allowNull: false }
});

// Inbox Messages
export const InboxMessage = sequelize.define('InboxMessage', {
  platform: { type: DataTypes.STRING, allowNull: false },
  text: { type: DataTypes.TEXT, allowNull: false },
  userId: { type: DataTypes.STRING, allowNull: false },
  read: { type: DataTypes.BOOLEAN, defaultValue: false }
});

// Social Listening & Mentions
export const Mention = sequelize.define('Mention', {
  userId: { type: DataTypes.STRING, allowNull: false },
  platform: { type: DataTypes.STRING, allowNull: false },
  content: { type: DataTypes.TEXT, allowNull: false },
  sentiment: { type: DataTypes.FLOAT, allowNull: false },
  fetchedAt: { type: DataTypes.DATE, allowNull: false }
});

// Competitor Data
export const CompetitorData = sequelize.define('CompetitorData', {
  userId: { type: DataTypes.STRING, allowNull: false },
  competitorName: { type: DataTypes.STRING, allowNull: false },
  metricName: { type: DataTypes.STRING, allowNull: false },
  metricValue: { type: DataTypes.STRING, allowNull: false },
  fetchedAt: { type: DataTypes.DATE, allowNull: false }
});

// Reports
export const Report = sequelize.define('Report', {
  userId: { type: DataTypes.STRING, allowNull: false },
  config: { type: DataTypes.JSON, allowNull: false },
  fileUrl: { type: DataTypes.STRING, allowNull: false },
  createdAt: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW }
});

// Activity Logs
export const ActivityLog = sequelize.define('ActivityLog', {
  userId: { type: DataTypes.STRING, allowNull: false },
  eventType: { type: DataTypes.STRING, allowNull: false },
  payload: { type: DataTypes.JSON, allowNull: false },
  read: { type: DataTypes.BOOLEAN, defaultValue: false }
});

// Push Subscriptions
export const PushSubscription = sequelize.define('PushSubscription', {
  userId: { type: DataTypes.STRING, allowNull: false },
  endpoint: { type: DataTypes.TEXT, allowNull: false },
  keys: { type: DataTypes.JSON, allowNull: false }
});

// ViVi Chat History
export const ChatHistory = sequelize.define('ChatHistory', {
  userId: { type: DataTypes.STRING, allowNull: false },
  message: { type: DataTypes.TEXT, allowNull: false },
  response: { type: DataTypes.TEXT, allowNull: false },
  sessionId: { type: DataTypes.STRING, allowNull: false },
  timestamp: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
});

// Content Generation History
export const ContentGeneration = sequelize.define('ContentGeneration', {
  userId: { type: DataTypes.STRING, allowNull: false },
  prompt: { type: DataTypes.TEXT, allowNull: false },
  generatedContent: { type: DataTypes.TEXT, allowNull: false },
  platform: { type: DataTypes.STRING, allowNull: false },
  contentType: { type: DataTypes.STRING, allowNull: false },
  timestamp: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
});

// Initialize all ViVi models
export async function initViViModels() {
  try {
    await sequelize.authenticate();
    console.log('ViVi database connection established successfully.');
    
    // Sync all models
    await UserConnector.sync();
    await ScheduledPost.sync();
    await FeatureSetting.sync();
    await AcademyComment.sync();
    await InboxMessage.sync();
    await Mention.sync();
    await CompetitorData.sync();
    await Report.sync();
    await ActivityLog.sync();
    await PushSubscription.sync();
    await ChatHistory.sync();
    await ContentGeneration.sync();
    
    console.log('All ViVi models synchronized successfully.');
  } catch (error) {
    console.error('Unable to connect to the ViVi database:', error);
  }
}