import {Component, Inject, Input} from '@angular/core';

import {Vision} from './vision.model';

@Component({
    selector: 'vision-viewer',
    styleUrls: ['vision-viewer.component.scss'],
    templateUrl: 'vision-viewer.component.html',
})
export class VisionViewerComponent {
    @Input() vision: Vision;

    constructor(@Inject('PUBLIC_SCHEMES_WEB_URL') private publicSchemesWebUrl: string) {}
}
