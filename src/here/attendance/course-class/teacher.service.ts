import {Inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {ApiUrl, Rest} from 'core/rest';

import {CourseClassAttendanceService} from './course-class.service';

@Injectable()
export class TeacherCourseClassService extends CourseClassAttendanceService {
    constructor(
        rest: Rest,
        api: ApiUrl,
        @Inject('COURSE_CLASS_API_URL') courseClassApi: string,
    ) {
        super(rest, api, courseClassApi);
    }

    loadTerms(): Observable<any> {
        return this.rest.get(`${this.api.list()}/terms`);
    }

    loadCourseClasses(termId: number): Observable<any> {
        return this.rest.get(`${this.api.list()}?termId=${termId}`);
    }

    loadCourseClass(courseClassId: string): Observable<any> {
        return this.rest.get(this.api.item(courseClassId));
    }

    getWebUrl(): string {
        return this.api.list().replace('/api/here', '/web/here');
    }
}
