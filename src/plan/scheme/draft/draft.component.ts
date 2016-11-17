import {Component, ViewContainerRef} from '@angular/core';

@Component({
    selector: 'scheme-draft-container',
    template: `<router-outlet></router-outlet>`,
})
export class SchemeDraftComponent {
    constructor(public viewContainerRef: ViewContainerRef) {}
}
