import { Request, Response, NextFunction } from 'express';
import { ZodObject, ZodError } from 'zod/v4';

export const validate = (schema: ZodObject<any>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });

      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          status: "fail",
          errors: error.issues.map(err => ({
            path: err.path.join("."),
            message: err.message
          })),
        });
      }

      return res.status(500).json({ message: "Internal Server Error" });
    }
  };
