import {Component, Input, Output, EventEmitter} from '@angular/core';

import {Dialog} from 'core/dialogs';

import {VersionDialog} from '../dialogs/version.dialog';

@Component({
    selector: 'plan-title',
    styles: [require('./plan-title.scss')],
    template: require('./plan-title.html'),
})
export class PlanTitleComponent {
    @Input() title: string;
    @Input() program: string;
    @Input() version: number;
    @Input() editable: boolean;
    @Input() previousVersion: number;
    @Output() versionChanged = new EventEmitter<number>();

    constructor(private dialog: Dialog) {}

    editVersion() {
        this.dialog.open(VersionDialog, {
            prev: this.previousVersion,
            curr: this.version,
        }).then((newValue) => {
            this.versionChanged.emit(newValue);
        }).catch((error) => {
            console.log(error);
        });
    }
}
