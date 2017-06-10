import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {Scheme} from '../../shared/scheme.model';
import {SchemeAdminService} from '../main.service';

@Component({
    templateUrl: 'admin-item.component.html',
})
export class SchemeAdminItemComponent implements OnInit {
    vm: Scheme;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private service: SchemeAdminService,
    ) {}

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            this.service.loadItem(params['id']).subscribe(dto => {
                this.vm = new Scheme(dto);
            });
        });
    }
}
