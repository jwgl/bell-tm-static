import {Component, OnInit} from '@angular/core';

import {SchemeDepartmentService} from '../main.service';

@Component({
    styleUrls: ['department-list.component.scss'],
    templateUrl: 'department-list.component.html',
})
export class SchemeDepartmentListComponent implements OnInit {
    programs: any[];

    constructor(private service: SchemeDepartmentService) {}

    ngOnInit(): void {
        this.service.loadList().subscribe(programs => this.programs = programs);
    }
}
