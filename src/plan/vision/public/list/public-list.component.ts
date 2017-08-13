import {Component} from '@angular/core';

import {findGradeRange} from '../../../shared/utils';
import {VisionPublicService} from '../public.service';

/**
 * 培养方案列表。
 */
@Component({
    selector: 'public-vision-list',
    styleUrls: ['public-list.component.scss'],
    templateUrl: 'public-list.component.html',
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
        this.selectedGrade = this.selectedGrade === grade ? 0 : grade;
    }
}
