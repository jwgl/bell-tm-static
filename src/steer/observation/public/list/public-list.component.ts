import { Component } from '@angular/core';

import * as _ from 'lodash';

import { CommonDialog } from 'core/common-dialogs';

import { ObservationItem } from '../../form/shared/form-list.model';
import { PublicService } from '../public.service';

@Component({
    selector: 'public-list',
    templateUrl: 'public-list.component.html',
})
export class PublicListComponent {
    list: ObservationItem[];

    constructor(
        private service: PublicService,
        private dialog: CommonDialog) {
        service.loadList().subscribe(dto => {
            this.list = dto;
        });
    }
}
