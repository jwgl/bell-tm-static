import {Component} from '@angular/core';

import {findGradeRange} from '../../../common/utils';
import {VisionPublicService} from '../public.service';

/**
 * 培养方案列表。
 */
@Component({
    selector: 'public-vision-list',
    styles: [require('./public-list.scss')],
    template: require('./public-list.html'),
})
export class VisionPublicListComponent {
    private departments: any;
    private grades: number[];
    private selectedGrade = 0;

    constructor(private service: VisionPublicService) {
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