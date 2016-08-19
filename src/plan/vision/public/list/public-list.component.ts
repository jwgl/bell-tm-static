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

    constructor(private publicService: VisionPublicService) {
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
