import * as jwt from 'jsonwebtoken';

export function sign(payload, day?){
  return jwt.sign(payload, process.env.JWT_PRIVATE_KEY, {expiresIn: 60 * 60 * 24 * (day || 30)}); // 1 Month
}

export function verify(token: string){
  return jwt.verify(token, process.env.JWT_PRIVATE_KEY);
}