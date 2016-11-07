import {Component, Input, ViewEncapsulation} from '@angular/core';

import {Scheme} from '../scheme.model';

/**
 * 查看器
 */
@Component({
    selector: 'scheme-viewer',
    styleUrls: ['scheme-viewer.component.scss'],
    templateUrl: 'scheme-viewer.component.html',
    encapsulation: ViewEncapsulation.None,
})
export class SchemeViewerComponent {
    @Input() scheme: Scheme;
}
