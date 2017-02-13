import {Component, ElementRef} from '@angular/core';

import {Workflow} from 'core/workflow';

import {Schedule, ScheduleDto} from '../../shared/schedule/schedule.model';
import {LeaveForm} from '../shared/form.model';
import {LeaveItemService} from './item.service';

/**
 * 查看学生请假。
 */
@Component({
    selector: 'student-leave-item',
    templateUrl: 'item.component.html',
})
export class LeaveItemComponent {
    private id: string;

    private form: LeaveForm;

    constructor(
        elementRef: ElementRef,
        private service: LeaveItemService,
        private workflow: Workflow,
    ) {
        this.id = elementRef.nativeElement.getAttribute('id');
        this.service.loadItem(this.id).subscribe(dto => {
            const schedules = dto.schedules.map((s: ScheduleDto) => new Schedule(s));
            this.form = new LeaveForm(dto.form, schedules);
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
