import { HttpException, Injectable, NestMiddleware } from '@nestjs/common'
import { NextFunction, Request, Response } from 'express'

@Injectable()
export class ExampleMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers

    if(!authorization){
      throw new HttpException('No authorization', 403)
    }

    if (authorization !== 'Bearer teste') {
      throw new HttpException('Invalid authorization', 401)
    }

    next()
  }
}