import {Component} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';

import {ApiUrl} from 'core/rest';

import {ApplicationsAdministrateService} from './administrate.service';

@Component({
    selector: 'application-list',
    templateUrl: 'list.component.html',
})
export class ApplicationListComponent {
    list: any[];
    awardId: number;

    constructor(
        private api: ApiUrl,
        private route: ActivatedRoute,
        private service: ApplicationsAdministrateService,
    ) {
        const params = this.route.snapshot.params;
        this.awardId = params['id'];
        this.service.loadApplicationList({awardId: this.awardId})
            .subscribe(dto => {this.list = dto; });
    }

    downloadUrl(pre: string): string {
        return `${this.api.item(this.awardId)}/attachments?status=ALL&pre=${pre}`;
    }
}
