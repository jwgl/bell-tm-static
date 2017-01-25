import {Component} from '@angular/core';

@Component({
    selector: 'form-title',
    styles: [
        'h3 {text-align: center; margin-bottom: 1rem;}',
        'span {border-bottom: double 3px rgba(0,0,0,.85)}',
    ],
    template: '<h3><span><ng-content></ng-content></span></h3>',
})
export class FormTitleComponent {}
