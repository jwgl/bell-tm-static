import {bootstrap} from 'angular2/platform/browser';
import {provide, Component} from 'angular2/core';

import {REST_PROVIDERS, API_URL} from '../../../core/http';
import {findGradeRange} from '../../common/utils';
import {SchemePublicService} from './public.service';

/**
 * 教学计划列表控件。
 */
@Component({
    selector: 'public-scheme-list',
    styles: [require('./list.scss')],
    template: require('./list.html'),
})
export class SchemePublicListComponent {
    private departments: any;
    private grades: number[];
    constructor(private publicService: SchemePublicService) {
        this.publicService.getList().subscribe(departments => {
            this.departments = departments;
            this.grades = findGradeRange(departments);
        });
    }
}

bootstrap(SchemePublicListComponent, [
    provide(API_URL, {useValue: '/api/schemes'}),
    REST_PROVIDERS,
    SchemePublicService,
]);
