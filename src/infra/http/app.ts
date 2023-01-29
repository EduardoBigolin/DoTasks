import CONFIG from "../../../config";
import { Server } from "./server";

const PORT_SERVER = CONFIG.SERVER_PORT || 3000;

new Server(PORT_SERVER);
