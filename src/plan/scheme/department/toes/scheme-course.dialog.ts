import {Component} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import 'rxjs/add/operator/do';

import {BaseDialog} from 'core/dialogs';
import {Rest} from 'core/rest';

@Component({
    selector: 'scheme-course-dialog',
    templateUrl: 'scheme-course.dialog.html',
})
export class SchemeCourseDialog extends BaseDialog {
    startWeek: number;
    department: any;
    schemeCourse: any;
    constructor(private rest: Rest) {
        super();
    }

    get startWeeks(): number[] {
        if (this.schemeCourse.isPracticeCourse) {
            return [];
        } else if (this.schemeCourse._periodWeeks > 9) {
            return [1];
        } else if (this.schemeCourse._periodWeeks === 9) {
            return [1, 9];
        } else {
            const starts: number[] = [];
            for (let i = 1; i <= 18 - this.schemeCourse._periodWeeks; i++) {
                starts.push(i);
            }
            return starts;
        }
    }

    getEndWeek(startWeek: number, length: number): number {
        if (length === 18) {
            return 17;
        } else {
            return startWeek + length - 1;
        }
    }

    protected onOpening(): Observable<any> {
        this.schemeCourse = this.options.schemeCourse;
        this.startWeek = this.schemeCourse.startWeek;
        return this.rest.get('/api/core/departments?q=t').do((departments: any[]) => {
            this.department = departments.find(it => it.id === this.schemeCourse.departmentId);
        });
    }

    protected onConfirmed() {
        return {
            startWeek: this.startWeek,
            departmentId: this.department.id,
            departmentName: this.department.name,
        };
    }
}
