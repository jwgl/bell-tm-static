import {Component} from '@angular/core';

import {ListOption} from 'core/models';

@Component({
    selector: 'vision-check-container',
    template: `
<nav-tabs [options]="options"></nav-tabs>
<router-outlet></router-outlet>
`,
})
export class VisionCheckComponent {
    options: ListOption[] = [
        {type: 'todo', label: '待审核', class: 'badge-success'},
        {type: 'done', label: '已审核', class: 'badge-danger'},
    ];
}
