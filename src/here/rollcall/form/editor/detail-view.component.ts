import {Component, Host} from '@angular/core';

import {BaseRollcallView} from './base-view.component';
import {RollcallFormEditorComponent} from './form-editor.component';

@Component({
    styleUrls: ['detail-view.component.scss'],
    templateUrl: 'detail-view.component.html',
})
export class RollcallDetailViewComponent extends BaseRollcallView {
    constructor(@Host() editor: RollcallFormEditorComponent) {
        super(editor);
    }
}
