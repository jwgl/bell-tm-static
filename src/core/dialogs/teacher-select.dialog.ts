import {Component, ElementRef, ViewChild} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {Rest} from '../rest';
import {typeahead} from '../utils/typeahead';
import {BaseDialog} from './base-dialog';

@Component({
    selector: 'teacher-select-dialog',
    templateUrl: 'teacher-select.dialog.html',
})
export class TeacherSelectDialog extends BaseDialog {
    @ViewChild('search') input: ElementRef;

    title: string;
    result: {id: string, name: string};
    teachers: any[];

    constructor(private rest: Rest) {
        super();
    }

    ngAfterViewInit() {
        typeahead(this.input)
            .switchMap(value => this.rest.get(`/api/core/teachers?q=${encodeURIComponent(value)}`))
            .subscribe(value => this.teachers = value);
    }

    protected onOpening(): Observable<any> {
        this.title = this.options.title || '选择教师';
        return null;
    }

    protected onConfirmed(): any {
        return this.result;
    }
}
