import {Component, ElementRef, ViewChild} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {BaseDialog} from 'core/dialogs';
import {ApiUrl, Rest} from 'core/rest';

@Component({
    selector: 'mentor-select-dialog',
    templateUrl: 'mentor-select.dialog.html',
})
export class MentorSelectDialog extends BaseDialog {
    mentors: any[];
    teacherId: string;

    constructor(private rest: Rest, private api: ApiUrl) {
        super();
    }

    protected onOpening(): Observable<any> {
        this.rest.get(`${this.api.list()}/mentors`).subscribe(dto => this.mentors = dto);
        return null;
    }

    protected onConfirmed(): any {
        return this.teacherId;
    }
}
