import { Component } from '@angular/core';

import { ReportService } from '../report.service';
import { ObservationItem } from '../shared/form-list.model';

@Component({
    selector: 'reward-list',
    styleUrls: ['reward.component.scss'],
    templateUrl: 'reward.component.html',
})
export class RewardListComponent {
    list: any[];
    monthes: string[];
    _month: string;

    constructor(
        private service: ReportService) {
        service.loadList({ type: 'REWARD', month: null, done: false }).subscribe(dto => {
            this.list = dto.list;
            this._month = dto.month;
            this.monthes = dto.monthes;
        });
    }

    set month(value: string) {
        this._month = value;
        this.service.loadList({ type: 'REWARD', month: value, done: false }).subscribe(dto => {
            this.list = dto.list;
        });
    }

    get month(): string {
        return this._month;
    }

    done() {
         setTimeout(() =>
            this.service.loadList({ type: 'REWARD', month: this._month, done: true })
                .subscribe(() => this.list = null), 1000);
    }
}
