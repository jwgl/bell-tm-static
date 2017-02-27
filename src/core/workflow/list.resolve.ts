import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';

import {ListCounts, ReviewList} from 'core/models';

import {Workflow} from './workflow.service';

@Injectable()
export class WorkflowListResolve implements Resolve<ReviewList> {
    constructor(private workflow: Workflow) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ReviewList> {
        const type = route.params['type'];
        const offset = route.params['offset'] || 0;
        return this.workflow.loadList({type, offset, max: 10}).map((result: {forms: any[], counts: ListCounts}) => {
            return new ReviewList({
                type,
                offset,
                total: result.counts[type],
                items: result.forms,
            });
        });
    }
}
