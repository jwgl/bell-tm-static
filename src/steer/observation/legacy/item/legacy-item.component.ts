import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { LegacyService } from '../legacy.service';

@Component({
    selector: 'legacy-item',
    templateUrl: 'legacy-item.component.html',
})
export class LegacyItemComponent {
    vm: any;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private service: LegacyService,
    ) {
        const params = this.route.snapshot.params;
        this.service.loadItem(params['id']).subscribe(dto => {
            this.vm = dto;
        });
    }
}
