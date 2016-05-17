import {Component} from '@angular/core';

import {Dialog, SimpleListSelectDialog} from '../../core/dialogs';
import {Spinning} from '../../core/directives';
import {groupBy} from '../../core/utils';
import {ProgramTypePipe, VersionNumberPipe} from '../common/pipes';
import {ProgramSettingsService} from './program-settings.service';

@Component({
    selector: 'program-settings-list',
    styles: [require('./program-settings.scss')],
    template: require('./program-settings.html'),
    directives: [Spinning],
    providers: [Dialog],
    pipes: [ProgramTypePipe, VersionNumberPipe],
})
export class ProgramSettingsComponent {
    departments: any[];
    grades: any[];

    constructor(
        private dialog: Dialog,
        private service: ProgramSettingsService) {
        this.loadData();
    }

    loadData(grade = 0) {
        this.service.loadList(grade).map(items => {
            let departments: {
                id: string,
                programs: {programId: number}[],
            }[] = groupBy(items, [{
                groupBy: 'departmentId',
                into: 'programs',
                mappings: {
                    departmentId: 'id',
                    departmentName: 'name',
                },
            }]);
            departments.sort((a, b) => a.id.localeCompare(b.id));
            departments.forEach(d => d.programs.sort((a, b) => a.programId - b.programId));
            return departments;
        }).subscribe(departments => {
            this.departments = departments;
        });

        this.service.loadGrades().subscribe(grades => this.grades = grades);
    }

    valueChanged(program: any, field: string) {
        let newValue = !program[field];
        program.processing = true;
        this.service.update(program.programId, field, newValue).subscribe(_ => {
            program.processing = false;
            program[field] = newValue;
        });
    }

    selectTemplate(program: any) {
        this.dialog.open(SimpleListSelectDialog, {
            title: '选择教学计划模板',
            url: '/api/schemeTemplates',
            valueFn: (item: any) => item,
            labelFn: (item: any) => item.name,
        }).then(result => {
            program.processing = true;
            this.service.update(program.programId, 'schemeTemplate', result.id).subscribe(_ => {
                program.processing = false;
                program.templateId = result.id;
                program.templateName = result.name;
            });
        });
    }

    onGradeChanged(grade: number) {
        this.loadData(grade);
    }
}
