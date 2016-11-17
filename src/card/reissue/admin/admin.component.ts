import {Component, ViewContainerRef} from '@angular/core';

@Component({
    selector: 'reissue-admin-container',
    template: '<router-outlet></router-outlet>',
})
export class ReissueAdminComponent {
    constructor(public viewContainerRef: ViewContainerRef) {}
}
