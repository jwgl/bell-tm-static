import {Component, Input} from '@angular/core';

@Component({
    selector: 'rollcall-summary',
    styleUrls: ['rollcall-summary.component.scss'],
    templateUrl: 'rollcall-summary.component.html',
})
export class RollcallSummaryComponent {
    @Input() summary: any;
}
