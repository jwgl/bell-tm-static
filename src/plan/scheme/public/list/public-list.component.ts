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
    constructor(private service: SchemePublicService) {
        this.service.loadList().subscribe(dto => {
            this.departments = dto;
            this.grades = findGradeRange(dto);
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
