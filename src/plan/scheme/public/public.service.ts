import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {ApiUrl, Rest} from 'core/rest';

import {Scheme} from '../common/scheme.model';

@Injectable()
export class SchemePublicService {
    constructor(private rest: Rest, private api: ApiUrl) {
    }

    getList(): Observable<any> {
        return this.rest.get(this.api.list());
    }

    getItem(id: string): Observable<Scheme> {
        return this.rest.get(this.api.item(id)).map(dto => new Scheme(dto));
    }
}
