import {ActivatedRouteSnapshot, DetachedRouteHandle, RouteReuseStrategy} from '@angular/router';

export class CustomReuseStrategy implements RouteReuseStrategy {

    handlers: {[key: string]: DetachedRouteHandle} = {};

    shouldDetach(route: ActivatedRouteSnapshot): boolean {
        return true;
    }

    store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle): void {
        if (this.isList(route)) {
            this.handlers[route.routeConfig.path] = handle;
        }
    }

    shouldAttach(route: ActivatedRouteSnapshot): boolean {
        if (this.isList(route)) {
            return !!this.handlers[route.routeConfig.path];
        } else {
            return false;
        }
    }

    retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle {
        if (this.isList(route)) {
            return this.handlers[route.routeConfig.path];
        } else {
            return null;
        }
    }

    shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
        return future.routeConfig === curr.routeConfig;
    }

    private isList(route: ActivatedRouteSnapshot): boolean {
        return route.routeConfig.path === '';
    }
}
