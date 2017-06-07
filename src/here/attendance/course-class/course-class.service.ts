import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {ApiUrl, Rest, ShowService} from 'core/rest';

@Injectable()
export abstract class CourseClassAttendanceService {
    teacherId: string;

    constructor(
        public rest: Rest,
        public api: ApiUrl,
        private courseClassApi: string,
    ) {}

    abstract loadCourseClasses(): Observable<any>;

    abstract loadCourseClass(courseClassId: string): Observable<any>;

    getStudentAttendances(courseClassId: string, studentId: string): Observable<any> {
        return this.rest.get(`${this.courseClassApi}/${courseClassId}/students/${studentId}/attendances`);
    }

    disqualify(courseClassId: string, studentId: string, disqualified: boolean): Observable<any> {
        const operation = disqualified ? 'QUALIFY' : 'DISQUALIFY';
        return this.rest.patch(`${this.courseClassApi}/${courseClassId}/students/${studentId}?op=${operation}`, {});
    }

    abstract getWebUrl(): string;
}
