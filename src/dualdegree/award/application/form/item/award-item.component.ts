import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import * as _ from 'lodash';
import * as moment from 'moment';

import {AwardForm} from '../../../shared/form.model';
import {AwardViewService} from './award.service';

@Component({
    selector: 'award-item',
    templateUrl: 'award-item.component.html',
})
export class AwardItemComponent {
    vm: AwardForm;

    constructor(
        private route: ActivatedRoute,
        private service: AwardViewService,
    ) {
        const params = this.route.snapshot.params;
        this.service.loadItem(params['id']).subscribe(dto => {
            this.vm = new AwardForm(dto);
        });
    }
}
