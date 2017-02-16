import {Component, Inject, QueryList, ViewChildren} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import 'rxjs/add/operator/do';

import * as _ from 'lodash';

import {CheckboxSelectorComponent} from 'core/common-directives';
import {BaseDialog} from 'core/dialogs';

import {BookingReportService} from '../report.service';

@Component({
    templateUrl: 'form-select.dialog.html',
})
export class BookingFormSelectDialog extends BaseDialog {
    @ViewChildren(CheckboxSelectorComponent) selectors: QueryList<CheckboxSelectorComponent>;

    constructor(private service: BookingReportService) {
        super();
    }

    checkAll(checked: boolean) {
        this.selectors.forEach(checkbox => checkbox.checked = checked);
    }

    protected onOpening(): Observable<any> {
        return this.service.unreportedForms().do(result => {
            // 删除已添加的申请
            result.forms = _.differenceWith(
                result.forms,
                this.options.report.items,
                (form: any, item: any) => form.formId === item.formId,
            );
        });
    }

    protected onConfirmed(): any {
        return this.selectors.filter(s => s.checked).map(s => s.data);
    }
}
