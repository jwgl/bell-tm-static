import {Component, Inject} from '@angular/core';

import {Dialog} from 'core/dialogs';
import {groupBy} from 'core/utils';

import {ProgramEditorDialog} from './program-editor.dialog';
import {ProgramSettingsService} from './program-settings.service';

@Component({
    selector: 'program-settings-list',
    styleUrls: ['program-settings.component.scss'],
    templateUrl: 'program-settings.component.html',
})
export class ProgramSettingsComponent {
    departments: any[];
    grades: any[];

    constructor(
        private dialog: Dialog,
        private service: ProgramSettingsService,
        @Inject('SCHEME_TEMPLATES_URL') private schemeTemplatesUrl: string,
    ) {
        this.loadData();
    }

    loadData(grade = 0) {
        this.service.loadList(grade).map(items => {
            const departments: Array<{
                id: string,
                programs: Array<{programId: number}>,
            }> = groupBy(items, [{
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

    onGradeChanged(grade: number) {
        this.loadData(grade);
    }

    edit(program: any) {
        this.dialog.open(ProgramEditorDialog, {
            programSetting: program,
            url: this.schemeTemplatesUrl,
        }).then(result => {
            this.service.update(program.programId, result).subscribe(_ => {
                program.minLengthOfSchooling = result.minLengthOfSchooling;
                program.maxLengthOfSchooling = result.maxLengthOfSchooling;
                program.visionRevisible = result.visionRevisible;
                program.practiceCreditRatio = result.practiceCreditRatio;
                program.templateLocked = result.templateLocked;
                program.schemeRevisible = result.schemeRevisible;
                program.schemeExportable = result.schemeExportable;
                program.templateId = result.templateId;
                program.templateName = result.templateName;
            });
        });
    }
}
