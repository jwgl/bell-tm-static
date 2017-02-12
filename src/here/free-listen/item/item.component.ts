import {Component, ElementRef} from '@angular/core';
import * as _ from 'lodash';

import {Workflow} from 'core/workflow';

import {FreeListenItemService} from './item.service';
import {FreeListenForm} from '../shared/form.model';
import {Schedule, ScheduleDto} from '../../shared/schedule/schedule.model';
import '../shared/form-viewer.model';

/**
 * 查看学生请假。
 */
@Component({
    selector: 'free-listen-item',
    templateUrl: 'item.component.html',
})
export class FreeListenItemComponent {
    schedules: Schedule[];
    form: FreeListenForm;

    private id: string;

    constructor(
        elementRef: ElementRef,
        private service: FreeListenItemService,
        private workflow: Workflow,
    ) {
        this.id = elementRef.nativeElement.getAttribute('id');
        this.service.loadItem(this.id).subscribe(dto => {
            const studentSchedules: Schedule[] = dto.studentSchedules.map((s: ScheduleDto) => new Schedule(s));
            const checkerSchedules: Schedule[] = dto.checkerSchedules.map((s: ScheduleDto) => new Schedule(s));
            const departmentSchedules: Schedule[] = dto.departmentSchedules.map((s: ScheduleDto) => new Schedule(s));

            this.form = new FreeListenForm(dto.form, studentSchedules);

            studentSchedules.forEach(it => it.belongsTo = 'student');
            checkerSchedules.forEach(it => it.belongsTo = 'checker');
            departmentSchedules.forEach(it => it.belongsTo = 'department');
            this.schedules = _.concat(studentSchedules, checkerSchedules, departmentSchedules);
        }, (error) => {
            if (error.status === 403) {
                alert('无权查看');
            }
        });
    }

    showWorkitems() {
        this.workflow.workitems(this.form.workflowInstanceId);
    }
}
