import * as jwt from 'jsonwebtoken';

const secret = process.env.JWT_PRIVATE_KEY;

export function sign(payload, day?){
  return jwt.sign(payload, secret, {expiresIn: 60 * 60 * 24 * (day || 30)}); // 1 Month
}

export function verify(token: string){
  return jwt.verify(token, secret);
}