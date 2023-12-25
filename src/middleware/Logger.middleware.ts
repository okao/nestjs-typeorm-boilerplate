//basic middleware template
import { Injectable, Logger } from '@nestjs/common';
import { NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  // private readonly logger = new Logger(LoggerMiddleware.name);

  use(req: Request, res: Response, next: NextFunction) {
    const logger = new Logger(LoggerMiddleware.name);
    const { method, url, body } = req;
    // logger.log(`${req.method} ${req.url}`);
    // console.log(req);
    // console.log(`${req.method} ${req.url} ${JSON.stringify(req.body)}`);

    logger.log(`${method} ${url} ${JSON.stringify(body)}`);
    //log request url params
    console.log(req.params);

    next();
  }
}
