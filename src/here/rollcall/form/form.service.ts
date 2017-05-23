import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {ApiUrl, Rest} from 'core/rest';

import {Schedule, ScheduleDto, Term} from '../../shared/schedule/schedule.model';
import {AttendanceDto, Rollcall, RollcallSettings, RollcallType, Student} from './form.model';

@Injectable()
export class RollcallFormService {
    term: Term;
    schedules: Schedule[];
    settings: RollcallSettings;
    viewType: string;

    constructor(private rest: Rest, private api: ApiUrl) {}

    loadList() {
        return this.rest.get(this.api.list());
    }

    loadRollcalls(week: number, day: number, section: number): Observable<any> {
        return this.rest.get(this.getRollcallApi(week, day, section));
    }

    create(week: number, day: number, section: number, data: object): Observable<{id: number, attendances: AttendanceDto}> {
        return this.rest.post(this.getRollcallApi(week, day, section), data);
    }

    update(week: number, day: number, section: number, id: number, data: object): Observable<{attendances: AttendanceDto}> {
        return this.rest.put(`${this.getRollcallApi(week, day, section)}/${id}`, data);
    }

    delete(week: number, day: number, section: number, id: number): Observable<{attendances: AttendanceDto}> {
        return this.rest.delete(`${this.getRollcallApi(week, day, section)}/${id}`);
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

    private getRollcallApi(week: number, day: number, section: number): string {
        return `${this.api.item(day * 100 + section)}/weeks/${week}/rollcalls`;
    }

    private getSettingApi(): string {
        return `${this.api.list().replace('/timeslots', '/settings')}/rollcall`;
    }
}
