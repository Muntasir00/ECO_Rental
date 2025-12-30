import { Request, Response, NextFunction } from 'express';

export const authorizeRoles = (...roles: ('admin' | 'user')[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.userRole) {
      return res.status(403).json({ message: 'Access denied' });
    }

    if (!roles.includes(req.userRole)) {
      return res.status(403).json({
        success: false,
        message: 'Insufficient role permissions',
      });
    }

    next();
  };
};
