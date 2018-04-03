import {Component} from '@angular/core';

import * as _ from 'lodash';

import {AgreementPublicService} from '../../public.service';

@Component({
    selector: 'public-list',
    styleUrls: ['public-list.component.scss'],
    templateUrl: 'public-list.component.html',
})
export class AgreementPublicComponent {
    agreements: any[];

    constructor(private service: AgreementPublicService) {
        this.service.loadList().subscribe(dto => {
            this.agreements = dto;
        });
    }

    universitiesLength(unvs: any[]): number {
        return _.chain(unvs).map((unv: any) => unv.grades.length).sum().value();
    }

    regionsLength(regions: any[]): number {
        return _.chain(regions).sumBy(g => this.universitiesLength(g.universities)).value();
    }
}
