import {Component} from '@angular/core';

import * as _ from 'lodash';
import {Observable} from 'rxjs/Observable';

import {BaseDialog} from 'core/dialogs';

@Component({
    selector: 'major-dialog',
    templateUrl: 'major.dialog.html',
})
export class MajorDialog extends BaseDialog {
    majors: any[];
    items: any[];
    departmentName: string;
    subjectName: string;
    grade: number;
    majorOptions: string;

    uniq(list: any[], option: string): any[] {
        if (!list) {
            return null;
        } else {
            const values = _.chain(list)
                .map(major => major[option])
                .uniq()
                .sort()
                .value();
            return values;
        }
    }

    get departments(): string[] {
        return this.uniq(this.majors, 'departmentName');
    }

    get grades(): number[] {
        if (!this.departmentName) {
            return null;
        } else {
            const list = this.majors.filter(major => major.departmentName === this.departmentName);
            return this.uniq(list, 'grade');
        }
    }

    get subjects(): string[] {
        if (!this.departmentName || !this.grade) {
            return null;
        } else {
            const list = this.majors.filter(major => major.departmentName === this.departmentName && major.grade === this.grade);
            return this.uniq(list, 'subjectName');
        }
    }

    protected onOpening(): Observable<any> {
        this.items = this.options.items;
        this.majors = this.options.majors;
        this.majors = this.majors.filter(data => !this.items.some(it => it === data.id));
        return null;
    }

    protected onConfirmed(): any {
        const majorItem = this.majorSelected;
        majorItem.majorOptions = this.majorOptions;
        return majorItem;
    }

    get majorSelected(): any {
        const items = this.majors.filter(major => major.departmentName === this.departmentName
            && major.grade === this.grade
            && major.subjectName === this.subjectName);
        return items.length ? items[0] : null;
    }
}
