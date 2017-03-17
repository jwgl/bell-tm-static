import {Component, Input, ViewEncapsulation} from '@angular/core';

import {Scheme} from '../scheme.model';

/**
 * 查看器
 */
@Component({
    selector: 'scheme-viewer',
    styleUrls: ['scheme-viewer.component.scss'],
    templateUrl: 'scheme-viewer.component.html',
    host: {'[class.show-diff]': 'showDiff'},
    encapsulation: ViewEncapsulation.None,
})
export class SchemeViewerComponent {
    @Input() scheme: Scheme;
    @Input() showDiff: boolean;
}
