import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { CommonDialog } from 'core/common-dialogs';

import { EvaluationMap, ObservationForm } from '../../form/shared/form.model';
import { PublicService } from '../public.service';

@Component({
    selector: 'public-item',
    templateUrl: 'public-item.component.html',
})
export class PublicItemComponent {
    vm: ObservationForm;
    evaluationSystem: EvaluationMap[];

    constructor(
        private router: Router,
        private dialog: CommonDialog,
        private route: ActivatedRoute,
        private service: PublicService,
    ) {
        const params = this.route.snapshot.params;
        this.service.loadItem(params['id']).subscribe(dto => {
            this.vm = new ObservationForm(dto.form);
            this.evaluationSystem = dto.evaluationSystem;
        });
    }
}
