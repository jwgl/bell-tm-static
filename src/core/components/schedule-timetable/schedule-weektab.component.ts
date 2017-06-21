import {Component, ContentChild, Input, OnChanges, SimpleChanges, TemplateRef} from '@angular/core';
import * as _ from 'lodash';

import {Term} from '../../models/term';

@Component({
    selector: 'schedule-weektab',
    styleUrls: ['schedule-weektab.component.scss'],
    templateUrl: 'schedule-weektab.component.html',
})
export class ScheduleWeektabComponent implements OnChanges {
    @Input() term: Term;
    @Input() size: string;
    @Input() showTermTab = false;

    @ContentChild('weekTabTpl') weekTabTemplate: TemplateRef<any>;

    selectedWeek: number;
    weeks: number[];

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['term']) {
            const term: Term = changes['term'].currentValue;
            if (term) {
                this.selectedWeek = term.currentWeek;
                this.weeks = _.range(term.startWeek, term.endWeek + 1);
            }
        }
    }
}
