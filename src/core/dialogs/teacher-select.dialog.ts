import {Component, ViewChild, ElementRef} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {Rest} from '../rest';
import {BaseDialog} from './dialog';
import {typeahead} from '../utils/typeahead';

@Component({
    selector: 'teacher-select-dialog',
    template: require('./teacher-select.html'),
})
export class TeacherSelectDialog extends BaseDialog {
    @ViewChild('search') input: ElementRef;

    title: string;
    result: {id: string, name: string};
    teachers: any[];

    constructor(private rest: Rest) {
        super();
    }

    protected onOpening(): Observable<any> {
        this.title = this.options.title || '选择教师';
        return null;
    }

    protected onConfirmed(): any {
        return this.result;
    }

    ngAfterViewInit() {
        typeahead(this.input)
        .switchMap(value => this.rest.get(`/api/core/teachers?q=${value}`))
        .subscribe(value => this.teachers = value);
    }
}
