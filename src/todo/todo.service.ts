import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {ApiUrl, Rest, ShowService} from 'core/rest';

@Injectable()
export class TodoService extends ShowService {
    constructor(rest: Rest, api: ApiUrl) {
        super(rest, api);
    }

    public loadCounts(): Observable<any> {
        return this.rest.get(`${this.api.list()}/counts`);
    }
}
