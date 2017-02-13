import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {CommonDialog} from 'core/common-dialogs';
import {Dialog} from 'core/dialogs';

import {Scheme, SchemeCourse} from '../../common/scheme.model';
import {SchemeDepartmentService} from '../department.service';
import './department-toes.model';
import {SchemeCourseDialog} from './scheme-course.dialog';

@Component({
    selector: 'scheme-department-toes',
    styleUrls: ['department-toes.component.scss'],
    templateUrl: 'department-toes.component.html',
})
export class SchemeDepartmentToesComponent implements OnInit {
    private id: string;
    private vm: Scheme;
    private selectedTerm = 0;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private dialog: Dialog,
        private commonDialog: CommonDialog,
        private service: SchemeDepartmentService,
    ) {}

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            this.id = params['id'];
            this.service.loadToes(this.id).subscribe(dto => {
                this.vm = new Scheme(dto.scheme);
                this.vm.init(dto.programCourses);
            });
        });
    }

    onEdit(schemeCourse: SchemeCourse): void {
        this.dialog.open(SchemeCourseDialog, {schemeCourse}).then(result => {
            schemeCourse.startWeek = result.startWeek;
            schemeCourse.departmentId = result.departmentId;
            schemeCourse.departmentName = result.departmentName;
        });
    }

    exportToes(): void {
        this.commonDialog.confirm('导入教务系统', '导入前请认真核对数据，导入后需要通过教学计划变更流程对数据进行修改。').then(() => {
            const schemeCourses = this.vm.getExportCourses(this.selectedTerm);
            const toes = schemeCourses.map(sc => sc.toToesDto());
            this.service.saveToes(this.id, {courses: toes}).subscribe(result => {
                schemeCourses.forEach(sc => sc.exported = true);
            }, error => {
                alert(JSON.stringify(error));
            });
        });
    }
}
