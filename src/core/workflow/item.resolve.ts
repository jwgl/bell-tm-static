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
        const query = route.params['query'];

        // Fix next and prev button error when approval. Redirection should be used, but
        // Angualr does not support passing segment param to query string param.
        // See https://github.com/angular/angular/issues/20297
        // redirect "/:type/:id/workitems/:wi" to "/:type/:id?wi=:wi"
        if (route.params['wi']) {
            this.router.navigate([type, id], {queryParams: {wi: route.params['wi']}});
        } else {
            const wi = route.queryParams['wi'];
            return this.workflow.loadItem(type, id, wi, query);
        }
    }
}
