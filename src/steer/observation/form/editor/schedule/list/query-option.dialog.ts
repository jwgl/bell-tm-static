import { Component } from '@angular/core';

import * as moment from 'moment';
import { Observable } from 'rxjs/Observable';

import { BaseDialog } from 'core/dialogs';
import { NumberStringOption, OddEvenOptions } from 'core/options';

import { ScheduleSection, scheduleSectionMap, Term } from '../../../shared/form.model';
import { ScheduleService } from '../schedule.service';

@Component({
    selector: 'query-option',
    templateUrl: 'query-option.dialog.html',
})
export class QueryOptionDialog extends BaseDialog {
    term: Term;
    vm: {
        weekOfTerms?: number[];
        dayOfWeeks?: NumberStringOption[];
        sections?: ScheduleSection[];
        buildings?: string[];
        palceNames?: string[];
        departments?: any[];
        today?: any;
    };

    queryOptions: any = {};
    schedules: any[] = [];
    valueFn: (item: any) => string;
    labelFn: (item: any) => string;

    constructor(private service: ScheduleService) {
        super();
        this.vm = {
            weekOfTerms: [],
            dayOfWeeks: [],
        };
        this.valueFn = (item: any) => item.value;
        this.labelFn = (item: any) => item.label;
    }

    ngAfterViewInit() {
        this.service.loadDataForCreate().subscribe(dto => this.onLoadData(dto));
        for (let i = 1; i <= 7; i++) {
            this.vm.dayOfWeeks.push({
                value: i,
                label: moment.weekdays(i),
            });
        }
    }

    onTeacherSelected(teacher: any): void {
        this.queryOptions.teacher = teacher;
    }

    onPlaceSelected(place: any): void {
        this.queryOptions.place = place;
    }

    onLoadData(dto: any) {
        this.term = dto.term;
        dto.sections.forEach((section: ScheduleSection) => scheduleSectionMap[section.id] = section);
        this.vm.departments = dto.departments;
        this.vm.buildings = dto.buildings;
        this.vm.sections = dto.sections;
        this.vm.today = dto.today;

        for (let i = this.term.startWeek; i <= this.term.endWeek; i++) {
            this.vm.weekOfTerms.push(i);
        }
        this.queryOptions = {
            weekOfTerm: this.term.currentWeek,
            section: this.vm.sections[0],
            place: { building: null, name: null },
            teacher: { id: null },
            dayOfWeek: 0,
            departmentId: null,
        };
    }

    protected onOpening(): Observable<any> {
        return null;
    }

    protected onConfirmed(): any {
        return this.queryOptions;
    }
}
