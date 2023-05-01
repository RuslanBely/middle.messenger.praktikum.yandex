import { Route } from './route';
import { Block } from './Block';

export class Router {
  private _routes: Array<Route>;

  private _history: History;

  private _currentRoute: Route|null;

  private _rootQuery: string;

  private static __instance: Router;

  constructor(rootQuery:string) {
    if (Router.__instance) {
      return Router.__instance;
    }

    this._routes = [];
    this._history = window.history;
    this._currentRoute = null;
    this._rootQuery = rootQuery;

    Router.__instance = this;
  }

  use(pathname:string, block: typeof Block<any>, props = {}) {
    const route = new Route(pathname, block, { ...props, rootQuery: this._rootQuery });
    this._routes.push(route);
    return this;
  }

  start() {
    window.onpopstate = (event: PopStateEvent) => {
      const target = event.currentTarget as Window;
      this._onRoute(target.location.pathname);
    };

    this._onRoute(window.location.pathname);
  }

  _onRoute(pathname:string) {
    const route = this.getRoute(pathname);
    if (!route) {
      return;
    }

    if (this._currentRoute) {
      this._currentRoute.leave();
    }

    this._currentRoute = route;
    route.render();
  }

  go(pathname:string) {
    this._history.pushState({}, '', pathname);
    this._onRoute(pathname);
  }

  back() {
    window.history.back();
  }

  forward() {
    window.history.forward();
  }

  getRoute(pathname:string) {
    return this._routes.find((route) => route.match(pathname));
  }
}
export default new Router('#root');
