import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';

import 'rxjs/add/operator/do';

import {Schedule, ScheduleDto, Term} from '../../shared/schedule/schedule.model';
import {RollcallFormService} from './form.service';

@Injectable()
export class RollcallFormResolve implements Resolve<true> {
    constructor(private service: RollcallFormService, private router: Router) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<true> | true {
        if (this.service.schedules) {
            return true;
        } else {
            return this.service.loadList().do(result => {
                this.service.term = result.term;
                this.service.schedules = result.schedules.map((dto: ScheduleDto) => new Schedule(dto));
                this.service.config = result.config;
            }).map(() => true);
        }
    }
}
