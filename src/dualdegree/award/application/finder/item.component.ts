import {Component} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';

import {ApplicationForm} from '../shared/form.model';

import {FinderService} from './finder.service';

@Component({
    templateUrl: 'item.component.html',
})
export class FinderItemComponent {
    form: ApplicationForm;
    fileNames: string[];
    paperForm: any;

    constructor(
        private route: ActivatedRoute,
        private service: FinderService) {
        const params = this.route.snapshot.params;
        this.service.loadItem(params['id']).subscribe(dto => this.loadData(dto));
    }

    loadData(dto: any) {
        this.form = new ApplicationForm(dto.form);
        this.fileNames = dto.fileNames;
        this.paperForm = dto.paperForm;
    }
}
