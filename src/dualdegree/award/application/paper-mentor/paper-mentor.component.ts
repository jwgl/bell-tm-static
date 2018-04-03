import {Component} from '@angular/core';

import {ListOption} from 'core/models';

@Component({
    selector: 'paper-mentor-container',
    template: `
<nav-tabs [options]="options"></nav-tabs>
<router-outlet></router-outlet>
    `,
})
export class PaperMentorComponent {
    options: ListOption[] = [
        {type: 'todo', label: '待设置', class: 'badge-secondary'},
        {type: 'done', label: '已设置', class: 'badge-dark'},
    ];
}
