import {Component} from '@angular/core';

import {AgreementPublicService} from '../public.service';

@Component({
    selector: 'agreement-list',
    styleUrls: ['form-list.component.scss'],
    templateUrl: 'form-list.component.html',
})
export class AgreementListComponent {
    agreements: any;

    constructor(private service: AgreementPublicService) {
        this.service.loadList().subscribe(dto => this.agreements = dto);
    }
}
