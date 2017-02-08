import {Component, OnInit} from '@angular/core';

import {SchemeDepartmentService} from '../department.service';

/**
 * 部门教学计划列表。
 */
@Component({
    selector: 'scheme-department-list',
    templateUrl: 'department-list.component.html',
})
export class SchemeDepartmentListComponent implements OnInit {
    private schemes: any[];

    constructor(private service: SchemeDepartmentService) {}

    ngOnInit(): void {
        this.service.loadList().subscribe(data => this.schemes = data);
    }
}
