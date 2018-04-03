import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import * as _ from 'lodash';

import {AwardForm} from '../../shared/form.model';
import {AwardFormService} from '../form.service';

@Component({
    selector: 'award-item',
    templateUrl: 'item.component.html',
})
export class AwardItemComponent {
    vm: AwardForm;

    constructor(
        private route: ActivatedRoute,
        private service: AwardFormService,
    ) {
        const params = this.route.snapshot.params;
        this.service.loadItem(params['id']).subscribe(dto => {
            this.vm = new AwardForm(dto);
        });
    }
}
