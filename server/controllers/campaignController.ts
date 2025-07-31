import { Response } from 'express';
import { dbService } from '../services/dbService';
import { insertCampaignSchema } from '@shared/schema';
import { AuthenticatedRequest } from '../types/auth';

export class CampaignController {
  async getCampaignsByUserId(req: AuthenticatedRequest, res: Response): Promise<Response> {
    try {
      const userId = req.params.userId;
      
      // Users can only access their own campaigns
      if (req.user?.id !== userId) {
        return res.status(403).json({ message: "Access denied" });
      }
      
      const campaigns = await dbService.getCampaignsByUserId(userId);
      return res.json(campaigns);
    } catch (error) {
      console.error('Error fetching campaigns:', error);
      return res.status(500).json({ message: "Failed to fetch campaigns" });
    }
  }

  async createCampaign(req: AuthenticatedRequest, res: Response): Promise<Response> {
    try {
      const campaignData = insertCampaignSchema.parse(req.body);
      const campaign = await dbService.createCampaign(campaignData);
      return res.json(campaign);
    } catch (error) {
      console.error('Error creating campaign:', error);
      return res.status(400).json({ message: "Invalid campaign data" });
    }
  }

  async updateCampaign(req: AuthenticatedRequest, res: Response): Promise<Response> {
    try {
      const campaignId = req.params.id;
      const updates = req.body;
      
      const updatedCampaign = await dbService.updateCampaign(campaignId, updates);
      
      if (!updatedCampaign) {
        return res.status(404).json({ message: "Campaign not found" });
      }
      
      return res.json(updatedCampaign);
    } catch (error) {
      console.error('Error updating campaign:', error);
      return res.status(500).json({ message: "Failed to update campaign" });
    }
  }

  async deleteCampaign(req: AuthenticatedRequest, res: Response): Promise<Response> {
    try {
      const campaignId = req.params.id;
      
      const success = await dbService.deleteCampaign(campaignId);
      
      if (!success) {
        return res.status(404).json({ message: "Campaign not found" });
      }
      
      return res.json({ message: "Campaign deleted successfully" });
    } catch (error) {
      console.error('Error deleting campaign:', error);
      return res.status(500).json({ message: "Failed to delete campaign" });
    }
  }
}

export const campaignController = new CampaignController();