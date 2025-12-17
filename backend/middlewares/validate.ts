import { ZodSchema } from "zod";
import { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/ApiError";

export const validate =
  (schema: ZodSchema) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        params: req.params,
        query: req.query,
      });
      next();
    } catch (error: any) {
      throw new ApiError(
        400,
        error.errors?.[0]?.message || "Validation error"
      );
    }
  };
