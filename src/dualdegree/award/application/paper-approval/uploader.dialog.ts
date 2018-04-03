import {Component} from '@angular/core';

import {Observable} from 'rxjs/Observable';

import {BaseDialog} from 'core/dialogs';

import {FileTypes} from '../shared/form.model';

@Component({
    selector: 'uploader-dialog',
    template: `
    <modal-dialog [title]="title">
        <modal-body>
            <uploader-panel [uploadUrl]="uploadUrl" [xsrfToken]="xsrfToken" [fileType]="fileType"></uploader-panel>
        </modal-body>
        <modal-footer>
            <button type="button" class="btn btn-secondary" (click)="ok()">确定</button>
        </modal-footer>
    </modal-dialog>
    `,
})
export class UploaderDialog extends BaseDialog {
    uploadUrl: string;
    fileType: any;
    xsrfToken: string;

    constructor() {
        super();
    }

    protected onOpening(): Observable<any> {
        this.uploadUrl = this.options.uploadUrl;
        this.xsrfToken = this.options.xsrfToken;
        this.fileType = FileTypes.filter(file => file.prefix === 'review')[0];
        return null;
    }

    protected onConfirmed(): any {
        return null;
    }

    get title(): string {
        return this.fileType.label;
    }
}
