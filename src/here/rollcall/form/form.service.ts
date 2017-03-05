import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';

import {ApiUrl, EditService, Rest} from 'core/rest';

import {Schedule, ScheduleDto, Term} from '../../shared/schedule/schedule.model';
import {RollcallConfig} from './form.model';

@Injectable()
export class RollcallFormService {
    term: Term;
    schedules: Schedule[];
    config: RollcallConfig;

    constructor(private rest: Rest, private api: ApiUrl) {}

    loadList() {
        return this.rest.get(this.api.list());
    }

    loadDataForCreate(options: {[key: string]: any} = {}): Observable<any> {
        return this.rest.get(this.api.dataForCreate(options));
    }

    get viewType(): string {
        return this.config.view ? this.config.view : 'detail';
    }

    set viewType(value: string) {
        this.config.view = value;
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
}
