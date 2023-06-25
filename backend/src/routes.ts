import routeHandler from './handler/route-handler'

class Routes {
  private app: any;
  private routeHandler: any;
  constructor(app: any) {
    this.app = app;
    this.routeHandler = new routeHandler()

  }

  /* creating app Routes starts */
  appRoutes() {
    this.app.get('/', this.routeHandler.getIndexRouteHandler);

    this.app.post('/upload', this.routeHandler.getUploadfileRouteHandler);
    this.app.get('*', this.routeHandler.routeNotFoundHandler);

  }

  routesConfig() {
    this.appRoutes();
  }
}
export default Routes;
