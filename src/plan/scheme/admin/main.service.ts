import {Inject, Injectable} from '@angular/core';

import {Observable} from 'rxjs/Observable';

import {ApiUrl, Rest, ShowService} from 'core/rest';

@Injectable()
export class SchemeAdminService extends ShowService {
    constructor(
        rest: Rest,
        api: ApiUrl,
        @Inject('DEPARTMENT_API_URL') private departemtApi: string,
    ) {
        super(rest, api);
    }

    loadDepartments(): Observable<any []> {
        return this.rest.get(this.departemtApi);
    }

    loadGrades(departmentId: string): Observable<number[]> {
        return this.rest.get(`${this.departemtApi}/${departmentId}/grades`);
    }
}
