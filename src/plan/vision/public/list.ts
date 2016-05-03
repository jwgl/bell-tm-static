import {bootstrap} from '@angular/platform-browser-dynamic';
import {provide, Component} from '@angular/core';

import {REST_PROVIDERS, API_URL} from '../../../core/http';
import {findGradeRange} from '../../common/utils';
import {VisionPublicService} from './public.service';

/**
 * 培养方案列表。
 */
@Component({
    selector: 'public-vision-list',
    styles: [require('./list.scss')],
    template: require('./list.html'),
})
export class VisionPublicListComponent {
    private departments: any;
    private grades: number[];

    constructor(private publicService: VisionPublicService) {
        this.publicService.getList().subscribe(departments => {
            this.departments = departments;
            this.grades = findGradeRange(departments);
        });
    }
}

bootstrap(VisionPublicListComponent, [
    provide(API_URL, {useValue: '/api/visions'}),
    REST_PROVIDERS,
    VisionPublicService,
]);
