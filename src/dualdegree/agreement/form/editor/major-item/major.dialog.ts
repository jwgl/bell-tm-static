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
    majorOptionsCn: string;

    constructor() {
        super();
    }

    filterByGrade(grade: number) {
        return (major: any) => major.grade === grade;
    }

    filterByDepartment(name: string) {
        return (major: any) => major.departmentName === name;
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
        majorItem.majorOptionsCn = this.majorOptionsCn;
        return majorItem;
    }

    get majorSelected(): any {
        const items = this.majors.filter(major => major.departmentName === this.departmentName
            && major.grade === this.grade
            && major.subjectName === this.subjectName);
        return items.length ? items[0] : null;
    }
}
