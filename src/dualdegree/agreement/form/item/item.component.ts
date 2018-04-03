import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import * as _ from 'lodash';

import {AgreementForm, AgreementItem} from '../../shared/form.model';
import {AgreementFormService} from '../form.service';

@Component({
    selector: 'agreement-item',
    templateUrl: 'item.component.html',
})
export class AgreementItemComponent {
    vm: AgreementForm;
    items: any[];

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private service: AgreementFormService,
    ) {
        const params = this.route.snapshot.params;
        this.service.loadItem(params['id']).subscribe(dto => {
            this.vm = new AgreementForm(dto);
            this.items = dto.items;
        });
    }
}
