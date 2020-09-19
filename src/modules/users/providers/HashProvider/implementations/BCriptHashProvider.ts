import { hash, compare } from 'bcryptjs';
import IHashProvider from '../models/IHasheProvider';

export default class BCriptHashProvider implements IHashProvider {
  public async generateHash(payload: string): Promise<string> {
    return hash(payload, 8);
  }
  public async compareHash(payload: string, hashed: string): Promise<boolean> {
    return compare(payload, hashed);
  }
}
