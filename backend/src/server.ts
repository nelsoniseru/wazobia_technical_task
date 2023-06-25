/* eslint-disable no-console */
import express from 'express';
import http from 'http'
import Routes from './routes';
import ExpressConfig from "./config/express-config"
class Server {
  private app: any;
  private http: any;

  constructor() {
    this.app = express();
    this.http = new http.Server(this.app);
    new ExpressConfig(this.app)
  }

  /* Including app Routes starts */
  includeRoutes() {
    new Routes(this.app).routesConfig();
  }
  includeSetup() {
    new ExpressConfig(this.app).setConfig()
  }
  /* Including app Routes ends */

  startTheServer() {
    this.includeSetup()
    this.includeRoutes()
    const port = process.env.NODE_SERVER_POST || 8000;
    const host = process.env.NODE_SERVER_HOST || 'localhost';

    this.http.listen(port, host, () => {
      console.log(`Listening on http://${host}:${port}`);
    });
  }
}


export default Server;
