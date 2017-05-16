import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {ApiUrl, Rest} from 'core/rest';

import {Schedule, ScheduleDto, Term} from '../../shared/schedule/schedule.model';
import {Rollcall, RollcallSettings, RollcallType, Student} from './form.model';

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

    loadAttendances(week: number, day: number, section: number): Observable<any> {
        return this.rest.get(this.getAttendanceApi(week, day, section));
    }

    loadAttendance(week: number, day: number, section: number, studentId: string): Observable<number[]> {
        return this.rest.get(`${this.getAttendanceApi(week, day, section)}/${studentId}`);
    }

    create(week: number, day: number, section: number, student: Student, type: RollcallType): void {
        student.pending = true;
        this.rest.post(this.getRollcallApi(week, day, section), {
            week,
            taskScheduleId: student.taskScheduleId,
            studentId: student.id,
            type,
        }).switchMap((result: {id: number}) => {
            student.pending = false;
            student.rollcall = new Rollcall({id: result.id, studentId: student.id, type});
            return this.loadAttendance(week, day, section, student.id);
        }).subscribe(result => {
            student.attendances = result;
        }, error => {
            student.pending = false;
        });
    }

    update(week: number, day: number, section: number, student: Student, type: RollcallType): void {
        student.pending = true;
        this.rest.put(`${this.getRollcallApi(week, day, section)}/${student.rollcall.id}`, {
            type,
        }).switchMap(() => {
            student.pending = false;
            student.rollcall.type = type;
            return this.loadAttendance(week, day, section, student.id);
        }).subscribe(result => {
            student.attendances = result;
        }, error => {
            student.pending = false;
        });
    }

    delete(week: number, day: number, section: number, student: Student): void {
        student.pending = true;
        this.rest.delete(`${this.getRollcallApi(week, day, section)}/${student.rollcall.id}`).switchMap(() => {
            student.pending = false;
            student.rollcall = null;
            return this.loadAttendance(week, day, section, student.id);
        }).subscribe(result => {
            student.attendances = result;
        }, error => {
            student.pending = false;
        });
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

    private getAttendanceApi(week: number, day: number, section: number): string {
        return `${this.api.item(day * 100 + section)}/weeks/${week}/attendances`;
    }

    private getSettingApi(): string {
        return `${this.api.list().replace('/timeslots', '/settings')}/rollcall`;
    }
}
