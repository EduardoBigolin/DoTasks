import CONFIG from "../../../config";
import { Server } from "./server";

const PORT_SERVER = CONFIG.SERVER_PORT || 3000;

async function main() {
  new Server(PORT_SERVER).open();
}
main();
