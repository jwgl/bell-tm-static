import {Injectable} from 'angular2/core';

import {ApiUrl, Rest, Observable} from '../core/http';

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
