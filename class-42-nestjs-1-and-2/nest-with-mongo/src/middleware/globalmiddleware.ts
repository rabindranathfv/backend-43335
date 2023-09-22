import { NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

export default class GlobalMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log(`RUNNING MDW: ${req.method} at ${req.url} received`);
    next();
  }
}
