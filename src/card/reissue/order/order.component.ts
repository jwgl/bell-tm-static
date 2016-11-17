import {Component, ViewContainerRef} from '@angular/core';

@Component({
    selector: 'reissue-order-container',
    template: '<router-outlet></router-outlet>',
})
export class ReissueOrderComponent {
    constructor(public viewContainerRef: ViewContainerRef) {}
}
