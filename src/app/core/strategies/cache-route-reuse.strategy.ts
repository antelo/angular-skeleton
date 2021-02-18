import { RouteReuseStrategy } from '@angular/router/';
import { ActivatedRouteSnapshot, DetachedRouteHandle } from '@angular/router';

export class CacheRouteReuseStrategy implements RouteReuseStrategy {

    private storedHandlers = new Map<string, DetachedRouteHandle>();

    /** means to allow reuse for all routes. If you have a route that you don't want to use, you can add some business logic to judge */
    public shouldDetach(route: ActivatedRouteSnapshot): boolean {
        if (!!route.data && !!route.data.cacheKey) {
            return true;
        }
        return false;
    }

         /** Fires when the route leaves. Store path snapshot & component current instance object by path as key */
    public store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle): void {
        this.storedHandlers.set(route.data.cacheKey, handle);
    }

         /** If path is in the cache, it is considered to allow routing to be restored */
    public shouldAttach(route: ActivatedRouteSnapshot): boolean {
        return !!route.data && !!this.storedHandlers.get(route.data.cacheKey)
    }

         /** Get a snapshot from the cache, or nul */
    public retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle | null {
        if (!route.data) {
            return null;
        }
        const snapshot = this.storedHandlers.get(route.data.cacheKey)
        return snapshot ? snapshot :  null;
    }

         /** Enter route trigger to determine if the same route */
    public shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
        return future.routeConfig === curr.routeConfig;
    }
}
