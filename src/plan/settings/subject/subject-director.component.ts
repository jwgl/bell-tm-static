import {Component} from '@angular/core';

import {CommonDialog} from 'core/common-dialogs';
import {groupBy} from 'core/utils';

import {SubjectDirectorService} from './subject-director.service';

@Component({
    selector: 'subject-director-list',
    templateUrl: 'subject-director.component.html',
})
export class SubjectDirectorComponent {
    departments: any[];

    constructor(
        private dialog: CommonDialog,
        private service: SubjectDirectorService) {
        this.service.loadList().map(items => {
            const departments: Array<{
                id: string,
                subjects: Array<{subjectId: string}>,
            }> = groupBy(items, [{
                groupBy: 'departmentId',
                into: 'subjects',
                mappings: {
                    departmentId: 'id',
                    departmentName: 'name',
                },
            }]);
            departments.sort((a, b) => a.id.localeCompare(b.id));
            departments.forEach(d => d.subjects.sort((a, b) => a.subjectId.localeCompare(b.subjectId)));
            return departments;
        }).subscribe(departments => {
            this.departments = departments;
        });
    }

    selectDirector(target: any, subject: any) {
        this.dialog.teacher(`选择${subject.subjectName}专业负责人`).then(result => {
            subject.directorProcessing = true;
            this.service.updateDirector(subject.subjectId, result.id).subscribe(_ => {
                subject.directorProcessing = false;
                subject.directorId = result.id;
                subject.directorName = result.name;
            });
        });
    }

    getDirectorLabel(subject: any) {
        if (subject.directorId) {
            return `${subject.directorId} ${subject.directorName}`;
        } else {
            return '<空>';
        }
    }

    selectSecretary(target: any, subject: any) {
        this.dialog.teacher(`选择${subject.subjectName}教务秘书`).then(result => {
            subject.secretaryProcessing = true;
            this.service.updateSecretary(subject.subjectId, result.id).subscribe(_ => {
                subject.secretaryProcessing = false;
                subject.secretaryId = result.id;
                subject.secretaryName = result.name;
            });
        });
    }

    getSecretaryLabel(subject: any) {
        if (subject.secretaryId) {
            return `${subject.secretaryId} ${subject.secretaryName}`;
        } else {
            return '<空>';
        }
    }
}
