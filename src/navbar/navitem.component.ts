import {Component, Input} from '@angular/core';

@Component({
    selector: '.nav-item[menu]',
    host: {
        '[class.dropdown]': 'menu.items',
    },
    templateUrl: 'navitem.component.html',
})
export class NavitemComponent {
    @Input() menu: any;
}
