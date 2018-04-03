import {Component} from '@angular/core';

import {AwardForm} from '../../shared/form.model';
import {AwardFormService} from '../form.service';

@Component({
    selector: 'award-list',
    styleUrls: ['form-list.component.scss'],
    templateUrl: 'form-list.component.html',
})
export class AwardListComponent {
    awardes: AwardForm[];

    constructor(private service: AwardFormService) {
        this.service.loadList().subscribe(dto => this.loadData(dto));
    }

    loadData(dto: any[]) {
        this.awardes = dto.map(data => new AwardForm(data));
    }
}
