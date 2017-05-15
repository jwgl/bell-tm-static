import {Inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {ApiUrl, Rest, ShowService} from 'core/rest';

@Injectable()
export class CourseClassListMainService extends ShowService {
    constructor(rest: Rest, api: ApiUrl) {
        super(rest, api);
    }

    getCourseClassStats(courseClassId: string): Observable<any> {
        return this.rest.get(`${this.api.item(courseClassId)}/attendances`);
    }

    getStudentAttendances(courseClassId: string, studentId: string): Observable<any> {
        return this.rest.get(`${this.api.item(courseClassId)}/attendances/${studentId}`);
    }

    getWebUrl(): string {
        return this.api.list().replace('/api/here', '/web/here');
    }
}
