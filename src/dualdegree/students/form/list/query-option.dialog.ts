import { Component } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { BaseDialog } from 'core/dialogs';

import { StudentAdminFormService } from '../form.service';

@Component({
    selector: 'query-dialog',
    templateUrl: 'query-option.dialog.html',
})
export class QueryDialog extends BaseDialog {
    regions: any[];
    grades: any[];
    subjects: any[];
    options: any = {};

    constructor(private service: StudentAdminFormService) {
        super();
    }

    get validate(): boolean {
        return !(this.options.groupId || this.options.subjectId ||
            this.options.grade || this.options.studentName || this.options.studentId);
    }

    protected onOpening(): Observable<any> {
        this.service.loadDataForCreate().subscribe(dto => {
            this.regions = dto.agreementRegions;
            this.grades = dto.grades;
            this.subjects = dto.subjects;
        });
        return null;
    }

    protected onConfirmed(): any {
        return this.options;
    }
}
