import {Component, Input} from '@angular/core';

@Component({
    selector: '.dropdown-menu',
    styleUrls: ['navmenu.component.scss'],
    templateUrl: 'navmenu.component.html',
})
export class NavmenuComponent {
    @Input() menus: any[];
}
