import {Component, ElementRef} from '@angular/core';

import {SchemeDraftService} from './draft.service';

@Component({
    selector: 'scheme-draft-container',
    template: `<router-outlet></router-outlet>`,
})
export class SchemeDraftComponent {
    constructor(
        private elementRef: ElementRef,
        private draftService: SchemeDraftService) {
        let userId = elementRef.nativeElement.getAttribute('user');
        this.draftService.userId = userId;
    }
}
