import {Component} from '@angular/core';

import {CommonDialog} from '../../../core/common-dialogs';
import {groupBy} from '../../../core/utils';
import {SubjectDirectorService} from '../subject-director.service';

@Component({
    selector: 'subject-director-list',
    template: require('./subject-director.html'),
})
export class SubjectDirectorComponent {
    departments: any[];

    constructor(
        private dialog: CommonDialog,
        private service: SubjectDirectorService) {
        this.service.loadList().map(items => {
            let departments: {
                id: string,
                subjects: {subjectId: string}[],
            }[] = groupBy(items, [{
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

    selectTeacher(target: any, subject: any) {
        this.dialog.teacher(`选择${subject.subjectName}专业负责人`).then(result => {
            subject.processing = true;
            this.service.save(subject.subjectId, result.id).subscribe(_ => {
                subject.processing = false;
                subject.teacherId = result.id;
                subject.teacherName = result.name;
            });
        });
    }

    format(subject: any) {
        if (subject.teacherId) {
            return `${subject.teacherId} ${subject.teacherName}`;
        } else {
            return '<空>';
        }
    }
}
