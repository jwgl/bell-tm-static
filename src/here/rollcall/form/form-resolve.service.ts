import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';

import 'rxjs/add/operator/do';

import {Schedule, ScheduleDto, Term, Timetable} from 'core/models';

import {RollcallFormService} from './form.service';

@Injectable()
export class RollcallFormResolve implements Resolve<true> {
    constructor(private service: RollcallFormService, private router: Router) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<true> | true {
        if (this.service.timetable) {
            return true;
        } else {
            return this.service.loadList().do(result => {
                const term: Term = result.term;
                const schedules: Schedule[] = result.schedules.map((dto: ScheduleDto) => new Schedule(dto));
                this.service.timetable = new Timetable(schedules, term, true);
                this.service.settings = result.config;
                this.service.viewType = result.view;
            }).map(() => true);
        }
    }
}
