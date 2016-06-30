import {bootstrap} from '@angular/platform-browser-dynamic';
import {provide, Component} from '@angular/core';

import {REST_PROVIDERS, API_URL} from '../../../core/http';
import {GradeFilterPipe} from '../../common/pipes/grade-filter';
import {findGradeRange} from '../../common/utils';
import {SchemePublicService} from './public.service';

/**
 * 教学计划列表控件。
 */
@Component({
    selector: 'public-scheme-list',
    styles: [require('./list.scss')],
    template: require('./list.html'),
    pipes: [GradeFilterPipe],
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

bootstrap(SchemePublicListComponent, [
    provide(API_URL, {useValue: '/api/schemes'}),
    REST_PROVIDERS,
    SchemePublicService,
]);
