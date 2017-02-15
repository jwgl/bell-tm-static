import {Component, Input, Output} from '@angular/core';

@Component({
    selector: 'remove-item',
    styles: ['i:hover{color: red}'],
    template: '<i class="fa fa-times"></i>',
})
export class RemoveItemComponent {}
