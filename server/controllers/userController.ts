import { Response } from 'express';
import { dbService } from '../services/dbService';
import { AuthenticatedRequest } from '../types/auth';

export class UserController {
  async getUser(req: AuthenticatedRequest, res: Response): Promise<Response> {
    try {
      const userId = req.params.id;
      
      // Users can only access their own data
      if (req.user?.id !== userId) {
        return res.status(403).json({ message: "Access denied" });
      }
      
      const user = await dbService.getUserById(userId);
      
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      
      return res.json(user);
    } catch (error) {
      console.error('Error fetching user:', error);
      return res.status(500).json({ message: "Failed to fetch user" });
    }
  }

  async updateUser(req: AuthenticatedRequest, res: Response): Promise<Response> {
    try {
      const userId = req.params.id;
      
      // Users can only update their own data
      if (req.user?.id !== userId) {
        return res.status(403).json({ message: "Access denied" });
      }
      
      const updatedUser = await dbService.updateUser(userId, req.body);
      
      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }
      
      return res.json(updatedUser);
    } catch (error) {
      console.error('Error updating user:', error);
      return res.status(500).json({ message: "Failed to update user" });
    }
  }
}

export const userController = new UserController();