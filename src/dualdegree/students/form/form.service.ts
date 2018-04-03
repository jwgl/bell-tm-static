import {Injectable} from '@angular/core';

import {Observable} from 'rxjs/Observable';

import {ApiUrl, EditService, Rest} from 'core/rest';

@Injectable()
export class StudentAdminFormService extends EditService {
    list: any[];

    constructor(rest: Rest, api: ApiUrl) {
        super(rest, api);
    }

    batchSave(id: number, form: any): Observable<any> {
        if (id) {
            return this.update(id, form);
        } else {
            return this.rest.post(this.api.list(), form);
        }
    }
}
