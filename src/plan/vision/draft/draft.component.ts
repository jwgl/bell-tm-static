import {Component, ViewContainerRef} from '@angular/core';

@Component({
    selector: 'vision-draft-container',
    template: '<router-outlet></router-outlet>',
})
export class VisionDraftComponent {
    constructor(public viewContainerRef: ViewContainerRef) {}
}
