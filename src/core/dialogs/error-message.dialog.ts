import {Component} from '@angular/core';

import {MODAL_DIRECTIVES} from '../directives';
import {BaseDialog} from './dialog';

@Component({
    selector: 'error-message-dialog',
    template: require('./error-message.html'),
    directives: [MODAL_DIRECTIVES],
})
/**
 * options: {errors: string[]}
 */
export class ErrorMessageDialog extends BaseDialog {
    constructor() {
        super();
    }
}
