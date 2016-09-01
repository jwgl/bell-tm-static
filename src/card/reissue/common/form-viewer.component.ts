import {Component, Input} from '@angular/core';

@Component({
    selector: 'reissue-form-viewer',
    styles: [require('./form-viewer.scss')],
    template: require('./form-viewer.html'),
})
export class ReissueFormViewerComponent {
    @Input() vm: any;
}
