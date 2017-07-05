import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import * as _ from 'lodash';

import { ObserverService } from '../observer.service';

interface ObserverReport {
    observer: string;
    observeTimes: number;
    totalSection: number;
}

@Component({
    selector: 'observer-report',
    templateUrl: 'observer-report.component.html',
})
export class ObserverReportComponent {
    list: ObserverReport[];

    constructor(
        private service: ObserverService,
    ) {
        this.service.observerReport().subscribe(dto => {
            this.list = dto.list;
            this.list.sort((a, b) => a.observeTimes - b.observeTimes);
        });
    }
}
