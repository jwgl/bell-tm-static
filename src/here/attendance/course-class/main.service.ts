import {Inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {ApiUrl, Rest, ShowService} from 'core/rest';

@Injectable()
export class CourseClassListMainService extends ShowService {
    constructor(rest: Rest, api: ApiUrl) {
        super(rest, api);
    }

    getStudentAttendances(courseClassId: string, studentId: string): Observable<any> {
        return this.rest.get(`${this.api.item(courseClassId)}/students/${studentId}`);
    }

    disqualify(courseClassId: string, studentId: string, disqualified: boolean): Observable<any> {
        const operation = disqualified ? 'QUALIFY' : 'DISQUALIFY';
        return this.rest.patch(`${this.api.item(courseClassId)}/students/${studentId}?op=${operation}`, {});
    }

    getWebUrl(): string {
        return this.api.list().replace('/api/here', '/web/here');
    }
}
