import {Component, ViewContainerRef} from '@angular/core';

@Component({
    selector: 'scheme-department-container',
    template: '<router-outlet></router-outlet>',
})
export class SchemeDepartmentComponent {
    constructor(public viewContainerRef: ViewContainerRef) {}
}
