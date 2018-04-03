import { Component } from '@angular/core';

import { AgreementFormService } from '../form.service';

@Component({
    selector: 'agreement-list',
    styleUrls: ['form-list.component.scss'],
    templateUrl: 'form-list.component.html',
})
export class AgreementListComponent {
    agreements: any;

    constructor(private service: AgreementFormService) {
        this.service.loadList().subscribe(dto => this.agreements = dto);
    }
}
