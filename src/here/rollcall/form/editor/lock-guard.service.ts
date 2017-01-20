import {
    CanActivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
} from '@angular/router';

import {RollcallForm} from '../form.model';

export class RollcallLockGuard implements CanActivate {
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const form: RollcallForm = route.parent.data['form'];
        return !(form && form.locked);
    }
}
