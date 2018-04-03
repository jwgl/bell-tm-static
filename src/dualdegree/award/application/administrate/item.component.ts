import {Component} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';

import {ApplicationForm} from '../shared/form.model';

import {ApplicationsAdministrateService} from './administrate.service';

@Component({
    templateUrl: 'item.component.html',
})
export class ApplicationsAdministrateItemComponent {
    form: ApplicationForm;
    fileNames: string[];
    awardId: number;
    paperForm: any;

    constructor(
        private route: ActivatedRoute,
        private service: ApplicationsAdministrateService) {
        const params = this.route.snapshot.params;
        this.awardId = params['id'];
        this.service.loadApplicationItem(params['applicationId'], {awardId: this.awardId})
            .subscribe(dto => this.loadData(dto));
    }

    loadData(dto: any) {
        this.form = new ApplicationForm(dto.form);
        this.fileNames = dto.fileNames;
        this.paperForm = dto.paperForm;
    }
}
