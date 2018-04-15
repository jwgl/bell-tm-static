import { Inject, Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { ApiUrl, EditService, Rest } from 'core/rest';

@Injectable()
export class UnScheduleService extends EditService {
    list: any[];
    constructor(
        rest: Rest,
        api: ApiUrl,
        @Inject('UNSCHEDULE_API_URL') private unschedulesApiUrl: string) {
        super(rest, api);
    }

    loadDtoForCreate(taskId: string, teacherId: string): Observable<any> {
        return this.rest.get(`${this.unschedulesApiUrl}/create?taskId=${taskId}&teacherId=${teacherId}`);
    }

    findTask(teacher: string): Observable<any> {
        return this.rest.get(`${this.unschedulesApiUrl}/findtask?teacherId=${teacher}`);
    }

    create(value: any): Observable<string> {
        return this.rest.post(this.unschedulesApiUrl, value).map(data => data.id);
    }

    update(id: any, value: any): Observable<string> {
        return this.rest.put(`${this.unschedulesApiUrl}/${id}`, value).map(res => id);
    }
}
