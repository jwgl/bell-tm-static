import {Component} from '@angular/core';

import {findGradeRange} from '../../../shared/utils';
import {SchemePublicService} from '../public.service';

/**
 * 教学计划列表控件。
 */
@Component({
    selector: 'public-scheme-list',
    styleUrls: ['public-list.component.scss'],
    templateUrl: 'public-list.component.html',
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
        this.selectedGrade = this.selectedGrade === grade ? 0 : grade;
    }
}
