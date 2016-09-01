import {Component, ElementRef} from '@angular/core';

import {ReissueFormService} from './form.service';

@Component({
    selector: 'reissue-form-container',
    template: '<router-outlet></router-outlet>',
})
export class ReissueFormComponent {
    constructor(
        private elementRef: ElementRef,
        private formService: ReissueFormService) {
        this.formService.userId = elementRef.nativeElement.getAttribute('user');
    }
}
