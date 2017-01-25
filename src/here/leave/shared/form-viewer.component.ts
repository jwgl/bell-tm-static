import {Component, Input} from '@angular/core';

@Component({
    selector: 'leave-form-viewer',
    styleUrls: ['form-viewer.component.scss'],
    templateUrl: 'form-viewer.component.html',
})
export class LeaveFormViewerComponent {
    @Input() form: any;
}
