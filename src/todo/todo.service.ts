import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {ApiUrl, Rest} from 'core/rest';

@Injectable()
export class TodoService {
    constructor(private rest: Rest, private api: ApiUrl) {}

    loadList(options: {[key: string]: string}): Observable<any> {
        return this.rest.get(`${this.api.list()}?${this.api.buildQueryString(options)}`);
    }

    loadCounts(): Observable<any> {
        return this.rest.get(`${this.api.list()}/counts`);
    }
}
