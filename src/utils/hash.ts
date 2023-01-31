import bcrypt from "bcrypt";
import CONFIG from "../../config";

export class Hash {
  static crateHash(password: string): string {
    return bcrypt.hashSync(password, CONFIG.HASH_SALT);
  }
  static compare(password: string, hash: string): boolean {
    return bcrypt.compareSync(password, hash);
  }
}
