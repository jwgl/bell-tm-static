import {Inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {ApiUrl, Rest} from 'core/rest';

import {CourseClassAttendanceService} from './course-class.service';

@Injectable()
export class DepartmentCourseClassService extends CourseClassAttendanceService {
    constructor(
        rest: Rest,
        api: ApiUrl,
        @Inject('COURSE_CLASS_API_URL') courseClassApi: string,
        @Inject('TEACHER_COURSE_CLASS_API_URL') private teacherCourseClassApi: string,
    ) {
        super(rest, api, courseClassApi);
    }

    loadCourseClassTeachers(): Observable<any[]> {
        return this.rest.get(this.api.list());
    }

    loadCourseClasses(): Observable<any[]> {
        return this.rest.get(this.getTeacherCourseApiUrl());
    }

    loadCourseClass(courseClassId: string): Observable<any> {
        return this.rest.get(`${this.getTeacherCourseApiUrl()}/${courseClassId}`);
    }

    getTeacherCourseApiUrl(): string {
        return `${this.teacherCourseClassApi.replace('${teacherId}', this.teacherId)}`;
    }

    getWebUrl(): string {
        return this.getTeacherCourseApiUrl().replace('/api/here', '/web/here');
    }
}
