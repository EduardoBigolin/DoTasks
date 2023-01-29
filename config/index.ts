import "dotenv/config";

const CONFIG = {
  SERVER_PORT: parseInt(process.env.SERVER_PORT as string),
};
export default CONFIG;
