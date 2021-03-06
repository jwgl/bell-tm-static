import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {Scheme} from '../../shared/scheme.model';
import {SchemeDepartmentService} from '../main.service';

@Component({
    templateUrl: 'department-item.component.html',
})
export class SchemeDepartmentItemComponent implements OnInit {
    vm: Scheme;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private service: SchemeDepartmentService,
    ) {}

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            this.service.loadItem(params['id']).subscribe(dto => {
                this.vm = new Scheme(dto);
            });
        });
    }
}
