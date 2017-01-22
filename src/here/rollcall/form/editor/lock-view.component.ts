import {Component, Host} from '@angular/core';

import {BaseRollcallView} from './base-view.component';
import {RollcallFormEditorComponent} from './form-editor.component';

@Component({
    styleUrls: ['lock-view.component.scss'],
    templateUrl: 'lock-view.component.html',
})
export class RollcallLockViewComponent extends BaseRollcallView {
    constructor(@Host() editor: RollcallFormEditorComponent) {
        super(editor);
    }
}
