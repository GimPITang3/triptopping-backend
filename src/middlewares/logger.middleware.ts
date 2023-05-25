import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger(LoggerMiddleware.name);

  use(req: Request, res: Response, next: NextFunction) {
    this.logger.verbose(
      `${req.method} ${req.baseUrl} ${JSON.stringify(
        req.query,
      )} ${JSON.stringify(req.body)}`,
    );
    next();
  }
}
