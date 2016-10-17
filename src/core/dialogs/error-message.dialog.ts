import {Component} from '@angular/core';

import {BaseDialog} from './dialog';

@Component({
    selector: 'error-message-dialog',
    templateUrl: 'error-message.dialog.html',
})
/**
 * options: {errors: string[]}
 */
export class ErrorMessageDialog extends BaseDialog {
    constructor() {
        super();
    }
}
