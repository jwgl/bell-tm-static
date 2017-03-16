import {Inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {ApiUrl, EditService, Rest} from 'core/rest';

@Injectable()
export class BookingAuthService extends EditService {
    constructor(
        rest: Rest,
        api: ApiUrl,
        @Inject('DEPARTMENT_TEACHERS_API_URL')
        private teachersUrl: string) {
        super(rest, api);
    }

    loadTeachers(departmentId: string): Observable<any> {
        return this.rest.get(this.teachersUrl.replace('${departmentId}', departmentId));
    }
}
