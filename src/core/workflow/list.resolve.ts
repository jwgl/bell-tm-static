import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';

import {ReviewList, StatusCounts} from 'core/models';

import {Workflow} from './workflow.service';

@Injectable()
export class WorkflowListResolve implements Resolve<ReviewList> {
    constructor(private workflow: Workflow) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ReviewList> {
        const status = route.params['status'];
        const offset = route.params['offset'] || 0;
        return this.workflow.loadList({status, offset, max: 10}).map((result: {forms: any[], counts: StatusCounts}) => {
            return new ReviewList({
                status,
                offset,
                total: result.counts[status],
                items: result.forms,
            });
        });
    }
}
