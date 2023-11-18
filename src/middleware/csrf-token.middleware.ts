import {Request, Response, NextFunction} from 'express';
import {ForbiddenException} from '@nestjs/common';

const csrf = require('csrf');

export function csrfToken(req: Request, res: Response, next: NextFunction){

  const secretSent = req.cookies['x-csrf-secret']; 
  const tokenSent = req.headers['x-csrf-token'];

  if (!csrf.verify(secretSent, tokenSent)) {
    throw new ForbiddenException("CSRF Protection");
  }

  const secret = csrf.secretSync();
  const token = csrf.create(secret);

  res.cookie("x-csrf-secret", secret);
  res.header("x-csrf-token", token);
  next();
}