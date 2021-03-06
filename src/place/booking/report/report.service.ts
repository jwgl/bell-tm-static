import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {ApiUrl, EditService, Rest} from 'core/rest';

@Injectable()
export class BookingReportService extends EditService {
    constructor(rest: Rest, api: ApiUrl) {
        super(rest, api);
    }

    unreportedForms(): Observable<any> {
        return this.rest.get(`${this.api.list()}/unreportedForms`);
    }
}
