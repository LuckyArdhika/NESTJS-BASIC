import * as bcrypt from 'bcrypt';

const saltOrRounds = 10;

export function hash(password){
  return bcrypt.hashSync(password, saltOrRounds);
}

export async function compare(string: string, hash){
  return await bcrypt.compareSync(string, hash);
}