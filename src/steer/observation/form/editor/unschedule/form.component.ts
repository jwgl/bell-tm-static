import { Location } from '@angular/common';
import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import * as _ from 'lodash';
import * as moment from 'moment';
import 'rxjs/add/operator/switchMap';

import {CommonDialog} from 'core/common-dialogs';
import { EditMode } from 'core/constants';
import { Dialog } from 'core/dialogs';
import { NumberStringOption, OddEvenOptions } from 'core/options';
import { typeahead } from 'core/utils/typeahead';

import { ObservationFormService } from '../../form.service';
import { EvaluationItem, EvaluationMap, GRADES, ObservationForm, ScheduleSection, Term } from '../../shared/form.model';
import '../form-editor.model';

import { UnScheduleService } from './unschedule.service';

@Component({
    selector: 'observation-special',
    styleUrls: ['form.component.scss'],
    templateUrl: 'form.component.html',
})
export class ObservationSpecial {
    @ViewChild('evaluationText') input: ElementRef;
    @ViewChild('suggest') suggest: ElementRef;

    editMode: EditMode;
    form: ObservationForm;
    term: Term;
    types: any[];
    grades = GRADES;
    evaluationSystem: EvaluationMap[];
    mydto: any;
    weekOfTerms: number[] = [];
    dayOfWeeks: NumberStringOption[] = [];
    sections: ScheduleSection[] = [];
    section: ScheduleSection;

    valueFn: (item: any) => string;
    labelFn: (item: any) => string;

    constructor(
        private router: Router,
        private unscheduleService: UnScheduleService,
        private service: ObservationFormService,
        private route: ActivatedRoute,
        private location: Location,
        private dialogs: CommonDialog,
        private dialog: Dialog,
    ) {
        this.valueFn = (item: any) => item.value;
        this.labelFn = (item: any) => item.label;
        this.editMode = this.route.snapshot.data['mode'];
        const params = this.route.snapshot.params;
        unscheduleService.loadDtoForCreate(params['taskId'], params['teacherId']).subscribe(dto => {
            this.onLoadData(dto, params['teacherId']);
        });
    }

    goBack(): void {
        this.location.back();
    }

    onLoadData(dto: any, teacherId: string) {
        this.term = dto.term;
        this.sections = dto.sections;
        this.types = dto.types;
        this.evaluationSystem = dto.evaluationSystem;
        this.form = new ObservationForm({timeslot: dto.timeslot, observerType: dto.types[0]});
        // 默认最少听课1节
        this.form.totalSection = 1;
        this.form.observationWeek = this.term.currentWeek;
        this.section = this.sections[0];
        this.form.schedule.dayOfWeek = 1;
        // 指明这是无安排实践课
        this.form.isScheduleTemp = true;
        for (let i = this.term.startWeek; i <= this.term.endWeek; i++) {
            this.weekOfTerms.push(i);
        }
        for (let i = 1; i <= 7; i++) {
            this.dayOfWeeks.push({
                value: i,
                label: moment.weekdays(i),
            });
        }
        setTimeout(() => {
            typeahead(this.input, 2, 10000).subscribe(value =>  this.save());
        }, 1);
        setTimeout(() => {
            typeahead(this.suggest, 2, 10000).subscribe(value => this.save());
        }, 1);
    }

    get startDate(): string {
        if (!this.term) {
            return null;
        }
        const day = moment(this.term.startDate);
        day.add(this.form.observationWeek - this.term.startWeek, 'weeks');
        day.add(this.form.schedule.dayOfWeek - 1, 'days');
        return day.format('YYYY-MM-DD');
    }

    get evaluateList(): any[] {
        return _.chain(this.evaluationSystem).map(data => data.value).flatten().map((item: EvaluationItem) => item.value).value();
    }

    get evaluateLevel(): number {
        const avg = _.round(_.mean(this.evaluateList.filter(s => !this.validate(s))), 1);
        return _.isNaN(avg) ? null : avg;
    }

    validate(option: any): boolean {
        return _.isUndefined(option) || _.isNull(option);
    }

    save() {
        if (this.validate(this.form.schedule.place)) {
            this.dialogs.error(['上课地点不能空！']);
        } else {
            this.form.evaluateLevel = this.evaluateLevel;
            this.form.schedule.startSection = this.section.start;
            if (this.editMode === EditMode.Create) {
                this.create(this.form.toServerDto(this.evaluationSystem, this.term));
            } else if (this.editMode === EditMode.Edit) {
                this.update(this.form.toServerDto(this.evaluationSystem, this.term));
            }
        }
    }

    create(form: any) {
        this.unscheduleService.create(this.scheduleDto).subscribe(id => {
            this.form.schedule.id = id;
        });
        this.service.create(form).subscribe(id => {
            this.form.id = id;
            this.editMode = EditMode.Edit;
            // 如果提交，就导航到list
            if (this.form.status) {
                this.router.navigate(['/']);
            }
        }, error => {
            alert(error.json().message);
        });
    }

    update(form: any) {
        this.unscheduleService.update(this.form.schedule.id, this.scheduleDto).subscribe(id => {
            this.form.schedule.id = id;
        });
        this.service.update(this.form.id, form).subscribe(id => {
            // 如果提交，就导航到list
            if (this.form.status) {
                this.router.navigate(['/']);
            }
        }, error => {
            alert(error.json().message);
        });
    }

    commit() {
        const validate: string[] = [];
        if (_.some(this.evaluateList, this.validate)) {
            validate.push('请对全部评分项目都给出评分后再提交');
        }
        if (validate.length) {
            this.dialogs.error(validate);
        } else {
            this.form.status = 1;
            this.save();
        }
    }

    get scheduleDto(): any {
        return {
            taskId: this.form.schedule.taskId,
            startWeek: this.form.observationWeek,
            endWeek: this.form.observationWeek,
            dayOfWeek: this.form.schedule.dayOfWeek,
            startSection: this.section.start,
            totalSection: this.section.total,
            place: this.form.schedule.place,
            teacherId: this.form.schedule.teacherId,
        };
    }
}
