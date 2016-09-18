import {Component, Input} from '@angular/core';

@Component({
    selector: 'from-now',
    template: '<span title="{{date | moment}}">{{date | fromNow}}</span>',
})
export class FromNowComponent {
    @Input() date: string;
}
