import {Component} from '@angular/core';
import {Router} from '@angular/router';

import {CourseClassListMainService} from './main.service';

@Component({
    selector: 'course-class-list-container',
    templateUrl: 'main.component.html',
})
export class CourseClassListMainComponent {
    courseClasses: any;

    constructor(
        private router: Router,
        private service: CourseClassListMainService,
    ) {
        this.service.loadList().subscribe(dto => {
            this.courseClasses = dto;
            this.router.navigate([this.courseClasses[0].id]);
        });
    }
}
