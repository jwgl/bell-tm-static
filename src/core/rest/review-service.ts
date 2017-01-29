import {Observable} from 'rxjs/Observable';

import {ApiUrl} from './api-url';
import {Rest} from './rest';

export abstract class ReviewService {
    constructor(protected rest: Rest, protected api: ApiUrl) {}

    loadList(options: {[key: string]: any} = {}): Observable<any> {
        return this.rest.get(this.api.list(options));
    }

    loadItem(id: any, wi: string): Observable<any> {
        return this.rest.get(this.api.workitem(id, wi));
    }
}
