import {Component, Input, Inject} from '@angular/core';

import {Vision} from './vision.model';

@Component({
    selector: 'vision-viewer',
    styles: [require('./vision-viewer.scss')],
    template: require('./vision-viewer.html'),
})
export class VisionViewerComponent {
    @Input() vision: Vision;

    constructor(@Inject('PUBLIC_SCHEMES_WEB_URL') private publicSchemesWebUrl: string) {}
}
