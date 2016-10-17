import {Component, Input} from '@angular/core';

@Component({
    selector: 'student-info',
    styleUrls: ['student-info.component.scss'],
    templateUrl: 'student-info.component.html',
})
export class StudentInfoComponent {
    @Input() student: any;
}
