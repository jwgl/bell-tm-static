import {Component} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {BaseDialog} from 'core/dialogs';
import {EditMode} from 'core/constants';

import {getPeriodWeeks, buildPeriodWeeksOptions} from '../../../../common/utils';
import {SchemeCourseDto, CourseSelectDto} from '../../../common/scheme.model';

@Component({
    selector: 'course-editor-dialog',
    template: require('./course-editor.html'),
})
export class CourseEditorDialog extends BaseDialog {
    title: string;
    schemeCourse: SchemeCourseDto = <any>{};
    periodWeekOptions: [{label: string, value: number}] = <any>[];
    lastPeriodWeeks: number;

    constructor() {
        super();
    }

    protected onOpening(): Observable<any> {
        if (this.options.editMode === EditMode.Create) {
            this.title = `添加课程 - ${this.options.group.name}`;
            this.schemeCourse = this.defaultCourse();
        } else {
            this.title = `编辑课程 - ${this.options.group.name}`;
            this.schemeCourse = this.options.dto;
        }

        this.onChangeSuggestedTerm(`${this.schemeCourse.suggestedTerm}`);
        return null;
    }

    onConfirmed() {
        this.schemeCourse.suggestedTerm = parseInt(`${this.schemeCourse.suggestedTerm}`, 10);
        return this.schemeCourse;
    }

    onCourseSelected(course: CourseSelectDto): void {
        if (course) {
            this.schemeCourse.courseId = course.id;
            this.schemeCourse.courseName = course.name;
            this.schemeCourse.credit = course.credit;
            this.schemeCourse.practiceCredit = 0;
            this.schemeCourse.theoryPeriod = course.theoryPeriod;
            this.schemeCourse.experimentPeriod = course.experimentPeriod;
            this.schemeCourse.periodWeeks = course.periodWeeks === 0 ? getPeriodWeeks(this.options.terms[0]) : course.periodWeeks;
            this.schemeCourse.assessType = course.assessType;
            this.schemeCourse.isTempCourse = course.isTempCourse;
        } else {
            this.schemeCourse.courseId = null;
            this.schemeCourse.courseName = null;
            this.schemeCourse.isTempCourse = true;
        }
    }

    onChangeSuggestedTerm(value: string) {
        if (value) {
            let term = parseInt(value, 10);
            let periodWeeks = getPeriodWeeks(term);
            if (this.lastPeriodWeeks !== periodWeeks) {
                this.periodWeekOptions = buildPeriodWeeksOptions(term);
                this.lastPeriodWeeks = periodWeeks;
                if (this.schemeCourse.periodWeeks === 0) {
                    this.schemeCourse.periodWeeks = periodWeeks;
                }
            }

            if (!this.schemeCourse.id) {
                this.schemeCourse.displayOrder = this.getTermOrder(term) * 100;
            }
        }
    }

    private defaultCourse(): SchemeCourseDto {
        let term = this.options.terms[0];
        return {
            courseId: null,
            courseName: null,
            credit: 0,
            isTempCourse: true,
            propertyId: 1,
            practiceCredit: 0,
            suggestedTerm: term,
            theoryPeriod: 0,
            experimentPeriod: 0,
            periodWeeks: getPeriodWeeks(term),
            allowedTerm: 1,
            assessType: 1,
            displayOrder: this.getTermOrder(term) * 100,
            previousId: null,
            reviseVersion: null,
        };
    }

    private getTermOrder(term: number): number {
        return (<number[]>this.options.terms).indexOf(term);
    }
}
