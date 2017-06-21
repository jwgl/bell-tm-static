import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {Term, Timetable} from 'core/models';
import {ApiUrl, Rest} from 'core/rest';

import {AttendanceDto, Rollcall, RollcallSettings, RollcallType, Student} from './form.model';

@Injectable()
export class RollcallFormService {
    term: Term;
    timetable: Timetable;
    settings: RollcallSettings;
    viewType: string;

    constructor(private rest: Rest, private api: ApiUrl) {}

    loadList() {
        return this.rest.get(this.api.list());
    }

    loadRollcalls(timeslotId: number, week: number): Observable<any> {
        return this.rest.get(this.getRollcallApi(timeslotId, week));
    }

    create(timeslotId: number, week: number, data: object): Observable<{id: number, attendances: AttendanceDto}> {
        return this.rest.post(this.getRollcallApi(timeslotId, week), data);
    }

    update(timeslotId: number, week: number, id: number, data: object): Observable<{attendances: AttendanceDto}> {
        return this.rest.put(`${this.getRollcallApi(timeslotId, week)}/${id}`, data);
    }

    delete(timeslotId: number, week: number, id: number): Observable<{attendances: AttendanceDto}> {
        return this.rest.delete(`${this.getRollcallApi(timeslotId, week)}/${id}`);
    }

    updateSettings(settings: RollcallSettings): Observable<void> {
        return this.rest.put(`${this.getSettingApi()}?type=settings`, settings).do(() => {
            this.settings.hideFree = settings.hideFree;
            this.settings.hideLeave = settings.hideLeave;
            this.settings.hideCancel = settings.hideCancel;
            this.settings.random = settings.random;
        });
    }

    updateViewType(viewType: string): Observable<void> {
        return this.rest.put(`${this.getSettingApi()}?type=view`, {view: viewType}).do(() => {
            this.viewType = viewType;
        });
    }

    private getRollcallApi(timeslotId: number, week: number): string {
        return `${this.api.item(timeslotId)}/weeks/${week}/rollcalls`;
    }

    private getSettingApi(): string {
        return `${this.api.list().replace('/timeslots', '/settings')}/rollcall`;
    }
}
