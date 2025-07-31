import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';

export function validateRequest(schema: ZodSchema) {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      const validated = schema.parse(req.body);
      req.body = validated;
      next();
    } catch (error: any) {
      console.error('Validation error:', error);
      res.status(400).json({
        error: 'Validation failed',
        details: error.errors || error.message
      });
    }
  };
}

export function validateParams(schema: ZodSchema) {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      const validated = schema.parse(req.params);
      req.params = validated;
      next();
    } catch (error: any) {
      console.error('Parameter validation error:', error);
      res.status(400).json({
        error: 'Invalid parameters',
        details: error.errors || error.message
      });
    }
  };
}

export function validateQuery(schema: ZodSchema) {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      const validated = schema.parse(req.query);
      req.query = validated;
      next();
    } catch (error: any) {
      console.error('Query validation error:', error);
      res.status(400).json({
        error: 'Invalid query parameters',
        details: error.errors || error.message
      });
    }
  };
}