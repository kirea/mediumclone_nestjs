import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Response } from 'express';
import { ExpressRequestInterface } from '@app/types/expressRequest.interface';
import { JwtPayload, verify } from 'jsonwebtoken';
import { JWT_SECRET } from '@app/config';
import { UserService } from '@app/user/user.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly userService: UserService) {
  }

  async use(req: ExpressRequestInterface, res: Response, next: NextFunction) {
    if (!req.headers.authorization) {
      req.user = null;
      next();
      return;
    }

    const [, token] = req.headers.authorization.split(' ');
    try {
      const decode = verify(token, JWT_SECRET);
      req.user = await this.userService.findById((decode as JwtPayload).id);
      next();
    } catch {
      req.user = null;
      next();
    }
  }
}
