import {Inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {ApiUrl, EditService, Rest} from 'core/rest';

@Injectable()
export class PaperMentorService extends EditService {
    constructor(rest: Rest, api: ApiUrl) {
        super(rest, api);
    }

    finish(id: any): Observable<any> {
        return this.rest.patch(`${this.api.item(id)}?op=FINISH`, {});
    }

    setMentor(value: any): Observable<any> {
        return this.rest.post(this.api.list(), value);
    }
}
