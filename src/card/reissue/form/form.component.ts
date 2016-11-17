import {Component, ViewContainerRef} from '@angular/core';

@Component({
    selector: 'reissue-form-container',
    template: '<router-outlet></router-outlet>',
})
export class ReissueFormComponent {
    constructor(public viewContainerRef: ViewContainerRef) {}
}
