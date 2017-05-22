import {Inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';

import {ApiUrl, Rest, ShowService} from 'core/rest';

import {RollcallDetail, Student, StudentLeaveDetail} from '../shared/attendance.model';

@Injectable()
export class AdminClassListMainService extends ShowService {
    termId: number;

    constructor(
        rest: Rest,
        api: ApiUrl,
        @Inject('ADMIN_CLASS_ATTENDANCE_API')
        private adminClassAttendanceApi: string,
    ) {
        super(rest, api);
    }

    loadAdminClasses(): Observable<{termId: number, adminClasses: any[]}> {
        return this.rest.get(`${this.api.list()}/adminClasses`);
    }

    loadListByAdminClass(id: number): Observable<any> {
        return this.rest.get(this.adminClassAttendanceApi.replace('${id}', id.toString()));
    }
}
