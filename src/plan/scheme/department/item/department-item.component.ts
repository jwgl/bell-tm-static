import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {Scheme} from '../../shared/scheme.model';
import {SchemeDepartmentService} from '../department.service';

/**
 * 部门教学计划列表。
 */
@Component({
    selector: 'scheme-department-item',
    templateUrl: 'department-item.component.html',
})
export class SchemeDepartmentItemComponent implements OnInit {
    private id: string;
    private vm: Scheme;
    private showDiff = false;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private service: SchemeDepartmentService) {
    }

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            this.id = params['id'];
            this.service.loadItem(this.id).subscribe(dto => {
                this.vm = new Scheme(dto);
            });
        });
    }

    toggleShowDiff(): void {
        this.showDiff = !this.showDiff;
    }

    get showDiffLabel(): string {
        return this.showDiff ? '隐藏变更' : '显示变更';
    }
}
