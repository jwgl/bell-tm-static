import {Component, Input} from 'angular2/core';

import {Markdown} from '../../../core/directives';
import {MarkdownPipe} from '../../../core/pipes';
import {PLAN_PIPES} from '../../common/pipes';
import {PlanTitleComponent} from '../../common/components';
import {Vision} from './vision.model';

@Component({
    selector: 'vision-viewer',
    styles: [require('./vision-viewer.scss')],
    template: require('./vision-viewer.html'),
    directives: [PlanTitleComponent, Markdown],
    pipes: [PLAN_PIPES, MarkdownPipe],
})
export class VisionViewerComponent {
    @Input() vision: Vision;
}
