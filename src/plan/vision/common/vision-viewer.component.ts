import {Component, Input} from '@angular/core';

import {Vision} from './vision.model';

@Component({
    selector: 'vision-viewer',
    styles: [require('./vision-viewer.scss')],
    template: require('./vision-viewer.html'),
})
export class VisionViewerComponent {
    @Input() vision: Vision;
}
