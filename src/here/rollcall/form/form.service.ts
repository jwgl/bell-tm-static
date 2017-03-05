import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';

import {ApiUrl, EditService, Rest} from 'core/rest';

import {Schedule, ScheduleDto, Term} from '../../shared/schedule/schedule.model';
import {RollcallSettings} from './form.model';

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

    loadDataForCreate(options: {[key: string]: any} = {}): Observable<any> {
        return this.rest.get(this.api.dataForCreate(options));
    }

    create(value: any): Observable<{id: string, attendances: number[]}> {
        return this.rest.post(this.api.list(), value);
    }

    update(id: any, value: any): Observable<{id: string, attendances: number[]}> {
        return this.rest.put(this.api.item(id), value);
    }

    delete(id: any): Observable<{id: string, attendances: number[]}> {
        return this.rest.delete(this.api.item(id));
    }

    updateSettings(settings: RollcallSettings): Observable<void> {
        return this.rest.put(`${this.api.list()}/settings?type=settings`, settings).do(() => {
            this.settings.hideFree = settings.hideFree;
            this.settings.hideLeave = settings.hideLeave;
            this.settings.hideCancel = settings.hideCancel;
            this.settings.random = settings.random;
        });
    }

    updateViewType(viewType: string): Observable<void> {
        return this.rest.put(`${this.api.list()}/settings?type=view`, {view: viewType}).do(() => {
            this.viewType = viewType;
        });
    }
}
