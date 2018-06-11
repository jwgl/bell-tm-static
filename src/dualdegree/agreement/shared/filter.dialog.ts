import { Component } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { BaseDialog } from 'core/dialogs';

import { AgreementViewService } from './filter.service';

@Component({
    selector: 'agreement-filter-dialog',
    templateUrl: 'filter.dialog.html',
})
export class AgreementFilterDialog extends BaseDialog {
    filters: any = {};
    majors: any[];
    regions: any[];

    constructor(private service: AgreementViewService) {
        super();
        if (this.service.filters) {
            this.filters = this.service.filters;
        }
    }

    filterByDepartment(name: string) {
        return (major: any) => major.departmentName === name;
    }

    protected onOpening(): Observable<any> {
        this.majors = this.options.majors;
        this.regions = this.options.regions;
        return null;
    }

    protected onConfirmed(): any {
        this.service.filters = this.filters;
        return this.filters;
    }
}
