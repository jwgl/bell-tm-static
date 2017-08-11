import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';

import 'rxjs/add/operator/do';

import {Schedule, ScheduleDto, Term, Timetable} from 'core/models';

import {RollcallFormService} from './form.service';

@Injectable()
export class RollcallFormResolve implements Resolve<boolean> {
    constructor(private service: RollcallFormService, private router: Router) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
        if (this.service.timetable) {
            return true;
        } else {
            return this.service.loadList().do(result => {
                this.service.term = result.term;
                this.service.timetable = new Timetable(result.schedules.map((dto: ScheduleDto) => new Schedule(dto)), true);
                this.service.settings = result.config;
                this.service.viewType = result.view;
            }).map(() => true);
        }
    }
}
