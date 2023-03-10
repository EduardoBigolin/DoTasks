import "dotenv/config";

const CONFIG = {
  SERVER_PORT: parseInt(process.env.SERVER_PORT as string),
  HASH_SALT: parseInt(process.env.HASH_SALT as string),
  JWT_KEY: process.env.JWT_KEY as string,
};
export default CONFIG;
