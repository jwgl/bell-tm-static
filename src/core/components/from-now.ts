import {Component, Input} from '@angular/core';

@Component({
    selector: 'from-now',
    template: '<span title="{{date | date: \'y-MM-dd HH:mm\'}}">{{date | fromNow}}</span>',
})
export class FromNowComponent {
    @Input() date: string;
}
