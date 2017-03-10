import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';

import {ListCounts, ReviewList} from 'core/models';

import {Workflow} from './workflow.service';

@Injectable()
export class WorkflowListResolve implements Resolve<ReviewList> {
    constructor(private workflow: Workflow) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ReviewList> {
        const options: {[key: string]: any} = {};
        options.type = route.params['type'];
        options.offset = route.params['offset'] || 0;
        options.max = route.params['offset'] || 10;
        if (route.params['query']) {
            options.query = route.params['query'];
        }
        return this.workflow.loadList(options).map((result: {forms: any[], counts: ListCounts}) => {
            return new ReviewList({
                type: options.type,
                query: options.query,
                offset: options.offset,
                total: result.counts[options.type],
                items: result.forms,
            });
        });
    }
}
