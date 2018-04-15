import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { UnScheduleService } from './unschedule.service';
@Component({
    selector: 'task-list',
    templateUrl: 'task-list.component.html',
})
export class TaskListComponent {
    teacher: any;
    tasks: any[];

    constructor(private service: UnScheduleService) { }

    onTeacherSelected(teacher: any): void {
        this.teacher = teacher;
    }

    query() {
        this.service.findTask(this.teacher.id).subscribe(dto => {
            this.tasks = dto;
        });
    }
}
