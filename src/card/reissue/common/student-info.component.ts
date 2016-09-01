import {Component, Input} from '@angular/core';

@Component({
    selector: 'student-info',
    styles: [require('./student-info.scss')],
    template: require('./student-info.html'),
})
export class StudentInfoComponent {
    @Input() student: any;
}
