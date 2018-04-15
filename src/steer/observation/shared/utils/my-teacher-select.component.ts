import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/switchMap';

import { ApiUrl, Rest } from 'core/rest';
import { typeahead } from 'core/utils/typeahead';

@Component({
    selector: 'my-teacher-select',
    styleUrls: ['my-teacher-select.component.scss'],
    templateUrl: 'my-teacher-select.component.html',
})
export class TeacherSelectComponent {
    @ViewChild('search') input: ElementRef;
    @ViewChild('dropdown') dropdown: ElementRef;
    @Output() selectTeacher: EventEmitter<any> = new EventEmitter<any>();

    teachers: any[];
    teacher: any;

    constructor(private rest: Rest, api: ApiUrl) { }

    teacherSelected(teacher: any) {
        this.selectTeacher.emit(teacher);
        this.teacher = teacher;
    }

    ngAfterViewInit() {
        $(this.dropdown.nativeElement).on('shown.bs.dropdown', () => {
            this.input.nativeElement.focus();
        });
        typeahead(this.input)
            .switchMap(value => this.rest.get(`/api/steer/teachers?q=${encodeURIComponent(value)}`))
            .subscribe(value => this.teachers = value);
    }

    get result(): string {
        if (!this.teacher) {
            return '教师姓名';
        } else {
            return `${this.teacher.id} : ${this.teacher.name}`;
        }
    }

    clearTeacher(): void {
        this.selectTeacher.emit(null);
        this.teacher = null;
    }
}
