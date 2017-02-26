import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';

import {StatusCounts} from 'core/models';

import {Workflow} from './workflow.service';

@Injectable()
export class WorkflowItemResolve implements Resolve<any> {
    constructor(private workflow: Workflow, private router: Router) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
        const id = route.params['id'];
        const wi = route.params['wi'];
        return this.workflow.loadItem(id, wi).map((result: {form: any, counts?: StatusCounts, workitemId?: string}) => {
            if (result.counts && this.workflow.listGroup) {
                this.workflow.listGroup.update(result.counts);
            }

            return result;
        });
    }
}
