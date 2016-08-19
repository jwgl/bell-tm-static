import {Component} from '@angular/core';
import {BaseDialog} from './dialog';

@Component({
    selector: 'confirm-dialog',
    template: require('./confirm.html'),
})
/**
 * options: {title: string, content: string}
 */
export class ConfirmDialog extends BaseDialog {
    constructor() {
        super();
    }
}
