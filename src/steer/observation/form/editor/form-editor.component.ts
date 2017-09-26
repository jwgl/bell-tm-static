import { Location } from '@angular/common';
import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import * as _ from 'lodash';
import * as moment from 'moment';
import 'rxjs/add/operator/switchMap';

import {CommonDialog} from 'core/common-dialogs';
import { EditMode } from 'core/constants';
import { typeahead } from 'core/utils/typeahead';

import { ObservationFormService } from '../form.service';
import { EvaluationItem, EvaluationMap, GRADES, ObservationForm, Observers, Term } from '../shared/form.model';
import './form-editor.model';

import { ScheduleService } from './schedule/schedule.service';

@Component({
    selector: 'observation-form-editor',
    styleUrls: ['form-editor.component.scss'],
    templateUrl: 'form-editor.component.html',
})
export class ObservationFormEditorComponent {
    @ViewChild('evaluationText') input: ElementRef;
    @ViewChild('suggest') suggest: ElementRef;

    editMode: EditMode;
    form: ObservationForm;
    term: Term;
    weekOfTerms: any[];
    types: any[];
    grades = GRADES;
    evaluationSystem: EvaluationMap[];
    observers: Observers[];
    isAdmin: boolean;
    mydto: any;

    constructor(
        private router: Router,
        private scheduleService: ScheduleService,
        private service: ObservationFormService,
        private route: ActivatedRoute,
        private location: Location,
        private dialogs: CommonDialog,
    ) {
        this.editMode = this.route.snapshot.data['mode'];
        const params = this.route.snapshot.params;
        switch (this.editMode) {
            case EditMode.Create:
                this.scheduleService.findTimeslot(
                    params['teacherId'],
                    params['week'],
                    params['timeslotId'],
                ).subscribe(dto => this.onLoadData(dto, params['week']));
                break;
            case EditMode.Edit:
                this.service.loadItemForEdit(params['id']).subscribe(dto => this.onLoadData(dto, null));
                break;
        }
    }

    goBack(): void {
        this.location.back();
    }

    onLoadData(dto: any, week: string) {
        if (!dto.form && dto.timeslot) {
            this.form = new ObservationForm({timeslot: dto.timeslot, observerType: dto.types[0]});
            this.form.observationWeek = _.toNumber(week);
            // 默认最少听课1节
            this.form.totalSection = 1;
            if (this.form.schedule && this.form.schedule.hasError) {
                // 如果课表出现错误，应提示督导及时反馈
                alert(this.form.schedule.hasError);
            }
        } else {
            this.form = new ObservationForm(dto.form);
        }
        this.term = dto.term;
        this.types = dto.types;
        this.weekOfTerms = _.range(this.term.startWeek, this.term.endWeek + 1, 1);
        this.evaluationSystem = dto.evaluationSystem;
        this.isAdmin = dto.isAdmin;
        this.observers = dto.observers;
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
        this.form.evaluateLevel = this.evaluateLevel;
        if (this.editMode === EditMode.Create) {
            this.create(this.form.toServerDto(this.evaluationSystem, this.term));
        } else if (this.editMode === EditMode.Edit) {
            this.update(this.form.toServerDto(this.evaluationSystem, this.term));
        }
    }

    create(form: any) {
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
}
