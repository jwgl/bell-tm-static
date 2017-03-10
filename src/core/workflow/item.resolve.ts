import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';

import {ListCounts} from 'core/models';

import {Workflow} from './workflow.service';

@Injectable()
export class WorkflowItemResolve implements Resolve<any> {
    constructor(private workflow: Workflow, private router: Router) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
        const type = route.params['type'];
        const id = route.params['id'];
        const wi = route.params['wi'];
        const query = route.params['query'];

        return this.workflow.loadItem(type, id, wi, query);
    }
}
