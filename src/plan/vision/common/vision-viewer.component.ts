import {Component, Input} from '@angular/core';

import {Markdown} from '../../../core/directives';
import {MarkdownPipe} from '../../../core/pipes';
import {Vision} from './vision.model';

@Component({
    selector: 'vision-viewer',
    styles: [require('./vision-viewer.scss')],
    template: require('./vision-viewer.html'),
    directives: [Markdown],
    pipes: [MarkdownPipe],
})
export class VisionViewerComponent {
    @Input() vision: Vision;
}
