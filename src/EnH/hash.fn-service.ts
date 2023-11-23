import * as bcrypt from 'bcrypt';

const saltOrRounds = 10;

export function hash(password){
  return bcrypt.hashSync(password, saltOrRounds);
}

export function compare(string: string, hash){
  return bcrypt.compareSync(string, hash);
}