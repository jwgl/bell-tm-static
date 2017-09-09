import {Inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {ApiUrl, Rest} from 'core/rest';

@Injectable()
export class FreeListenCheckService {
    constructor(private rest: Rest, private api: ApiUrl) {}

    getSettings(): Observable<any> {
        return this.rest.get(`${this.api.list()}/settings`);
    }
}
