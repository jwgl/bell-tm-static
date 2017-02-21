import {Component, Input} from '@angular/core';

@Component({
    selector: 'reissue-form-viewer',
    styleUrls: ['form-viewer.component.scss'],
    templateUrl: 'form-viewer.component.html',
})
export class ReissueFormViewerComponent {
    @Input() form: any;
}
