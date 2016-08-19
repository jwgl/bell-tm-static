import {Component, ElementRef} from '@angular/core';

import {VisionDraftService} from './draft.service';

@Component({
    selector: 'vision-draft-container',
    template: `<router-outlet></router-outlet>`,
})
export class VisionDraftComponent {
    constructor(
        private elementRef: ElementRef,
        private draftService: VisionDraftService) {
        let userId = elementRef.nativeElement.getAttribute('user');
        this.draftService.userId = userId;
    }
}
