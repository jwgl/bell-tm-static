import {Component} from '@angular/core';
import {BaseDialog} from './dialog';
import {MODAL_DIRECTIVES} from '../directives';

@Component({
    selector: 'confirm-dialog',
    template: require('./confirm.html'),
    directives: [MODAL_DIRECTIVES],
})
/**
 * options: {title: string, content: string}
 */
export class ConfirmDialog extends BaseDialog {
    constructor() {
        super();
    }
}
