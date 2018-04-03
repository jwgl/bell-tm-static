import {Component} from '@angular/core';

import * as _ from 'lodash';

import {AwardForm} from '../../../shared/form.model';

import {ApplicationFormService} from '../form.service';

import './form-list.model';

@Component({
    selector: 'award-list',
    styleUrls: ['form-list.component.scss'],
    templateUrl: 'form-list.component.html',
})
export class AwardListComponent {
    awardes: AwardForm[];

    constructor(private service: ApplicationFormService) {
        this.service.loadList().subscribe(dto => this.loadData(dto));
    }

    loadData(dto: any[]) {
        this.awardes = dto.map(data => {
            const award = new AwardForm(data);
            award.status = data.status;
            award.applicationId = data.applicationId;
            return award;
        });
    }

    get graduated(): boolean {
        return _.some(this.awardes, {status: 'APPROVED'});
    }

    expireClass(value: boolean): string {
        return value ? 'badge badge-danger' : '';
    }
}
