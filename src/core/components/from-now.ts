import {Component, Input} from '@angular/core';
import {FromNowPipe, MomentFormatPipe} from '../pipes/moment-pipes';

@Component({
    selector: 'from-now',
    template: '<span title="{{date | momentFormat}}">{{date | fromNow}}</span>',
    pipes: [FromNowPipe, MomentFormatPipe],
})
export class FromNowComponent {
    @Input() date: string;
}
