import {Component} from '@angular/core';

import {findGradeRange} from '../../../common/utils';
import {SchemePublicService} from '../public.service';

/**
 * 教学计划列表控件。
 */
@Component({
    selector: 'public-scheme-list',
    styles: [require('./public-list.scss')],
    template: require('./public-list.html'),
})
export class SchemePublicListComponent {
    private departments: any;
    private grades: number[];
    private selectedGrade = 0;
    constructor(private publicService: SchemePublicService) {
        this.publicService.getList().subscribe(departments => {
            this.departments = departments;
            this.grades = findGradeRange(departments);
        });
    }

    setSelectedGrade(grade: number) {
        if (this.selectedGrade === grade) {
            this.selectedGrade = 0;
        } else {
            this.selectedGrade = grade;
        }
    }
}
