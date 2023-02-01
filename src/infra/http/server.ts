import express from "express";
import routes from "./routes";

export class Server {
  private app = express();
  constructor(private port: number = port) {
    this.middleware();
    this.routes();
  }

  async open() {
    this.app.listen(this.port, () => {
      console.log(
        `[HTTP] your server is listen in http://localhost:${this.port}`
      );
    });
  }
  middleware() {
    this.app.use(express.json());
  }
  routes() {
    this.app.use("/api/v1", routes);
  }
}
