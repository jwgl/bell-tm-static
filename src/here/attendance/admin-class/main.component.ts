import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {AdminClassListMainService} from './main.service';

@Component({
    selector: 'admin-class-list-container',
    templateUrl: 'main.component.html',
})
export class AdminClassListMainComponent {
    adminClasses: any[];
    totalCount: number;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private service: AdminClassListMainService,
    ) {
        this.service.loadAdminClasses().subscribe(dto => {
            this.service.termId = dto.termId;
            this.adminClasses = dto.adminClasses;
            this.totalCount = this.adminClasses.reduce((sum: number, item) => sum += item.count, 0);
        });
    }
}
