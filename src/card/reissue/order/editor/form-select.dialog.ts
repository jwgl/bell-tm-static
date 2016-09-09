import {Component, ViewChildren, QueryList, ElementRef} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import * as _ from 'lodash';

import {Rest} from 'core/rest';
import {BaseDialog} from 'core/dialogs';
import {CheckboxSelectorComponent} from 'core/common-directives';

@Component({
    selector: 'reissue-form-select-dialog',
    template: require('./form-select.html'),
})
export class ReissueFormSelectDialog extends BaseDialog {
    @ViewChildren(CheckboxSelectorComponent) selectors: QueryList<CheckboxSelectorComponent>;

    constructor(private rest: Rest, private elementRef: ElementRef) {
        super();
    }

    protected onOpening(): Observable<any> {
        return this.rest.get('/api/cardReissues?status=APPROVED').do(result => {
            // 删除已添加的申请
            result.forms = _.differenceWith(result.forms, this.options.order.items, (form: any, item: any) => form.id === item.formId);
        });
    }

    protected onConfirmed(): any {
        return this.selectors.filter(s => s.checked).map(s => s.data);
    }

    checkAll(checked: boolean) {
        this.selectors.forEach(checkbox => checkbox.checked = checked);
    }
}

