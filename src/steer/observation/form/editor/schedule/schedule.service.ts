import { Inject, Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { ApiUrl, EditService, Rest } from 'core/rest';

@Injectable()
export class ScheduleService extends EditService {
    list: any[];
    constructor(
        rest: Rest,
        api: ApiUrl,
        @Inject('TEACHER_TIMESLOT_API_URL') private teacherTimeslotApiUrl: string,
        @Inject('PLACE_TIMESLOT_API_URL') private placeTimeslotApiUrl: string,
        @Inject('SCHEDULE_API_URL') private schedulesApiUrl: string) {
        super(rest, api);
    }

    loadDataForCreate(): Observable<any> {
        return this.rest.get(`${this.schedulesApiUrl}/create`);
    }

    loadList(options: {[key: string]: any} = {}): Observable<any> {
        return this.rest.get(`${this.schedulesApiUrl}?${this.buildQueryString(options)}`);
    }

    findTeacherSchedule(teacherId: string): Observable<any[]> {
        return this.rest.get(
            `${this.teacherTimeslotApiUrl}/${teacherId}/timeslots`)
            .map(data => data.schedules);
    }

    findPlaceSchedule(place: string): Observable<any[]> {
        return this.rest.get(`${this.placeTimeslotApiUrl}/${place}`);
    }

    getTerm(): Observable<any> {
        return this.rest.get(`${this.api.list()}/term`);
    }

    teacherActiveList(): Observable<any> {
        return this.rest.get(`${this.api.list()}/observationPriority`);
    }

    findTimeslot(teacherId: string, week: number, timeslotId: number): Observable<any[]> {
        return this.rest.get(
            `${this.teacherTimeslotApiUrl}/${teacherId}/timeslots/${timeslotId}?week=${week}`);
    }

    buildQueryString(options: {[key: string]: string}): string {
        const search: string[] = [];
        for (const key in options) {
            if (options.hasOwnProperty(key)) {
                search.push(`${key}=${encodeURIComponent(options[key])}`);
            }
        }

        return search.join('&');
    }
}
