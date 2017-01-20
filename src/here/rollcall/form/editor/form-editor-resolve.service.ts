import {Injectable} from '@angular/core';
import {Router, Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs/Observable';

import {RollcallFormService} from '../form.service';
import {RollcallForm} from '../form.model';

@Injectable()
export class RollcallFormEditorResolve implements Resolve<RollcallForm> {
    constructor(private service: RollcallFormService, private router: Router) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<RollcallForm> {
        return this.service.loadDataForCreate(route.params).map(dto => {
            let form = new RollcallForm(dto, this.service.config);
            if (form.locked && !/lock$/.test(state.url)) {
                this.router.navigateByUrl(state.url.replace(/\w*$/, 'lock'));
            }
            return form;
        });
    }
}
