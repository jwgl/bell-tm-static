import {Component} from '@angular/core';

import {ListOption} from 'core/models';

@Component({
    selector: 'free-listen-check-container',
    template: `
<nav-tabs [options]="options"></nav-tabs>
<router-outlet></router-outlet>
    `,
})
export class FreeListenCheckComponent {
    options: ListOption[] = [
        {type: 'todo', label: '待审核', class: 'badge-success'},
        {type: 'done', label: '已审核', class: 'badge-danger'},
    ];
}
