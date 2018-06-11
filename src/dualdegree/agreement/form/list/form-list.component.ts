import { Component } from '@angular/core';

import { Dialog } from 'core/dialogs';

import { AgreementFilterDialog } from '../../shared/filter.dialog';

import { AgreementFormService } from '../form.service';

@Component({
    selector: 'agreement-list',
    styleUrls: ['form-list.component.scss'],
    templateUrl: 'form-list.component.html',
})
export class AgreementListComponent {
    agreements: any[];
    regions: any[];
    majors: any[];

    constructor(
        private service: AgreementFormService,
        private dialog: Dialog) {
        this.service.loadList(this.service.filters).subscribe(dto => this.loadData(dto));
    }

    loadData(dto: any) {
        this.agreements = dto.list;
        this.regions = dto.regions;
        this.majors = dto.majors;
    }

    orderBy(key: string) {
        this.agreements.sort((a, b) => a[key].localeCompare(b[key]));
    }

    open() {
        this.dialog.open(AgreementFilterDialog, {majors: this.majors, regions: this.regions}).then(result => {
            this.service.loadList(result).subscribe(dto => this.loadData(dto));
        });
    }
}
