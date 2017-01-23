import {Component, Host} from '@angular/core';

import {BaseRollcallView} from './base-view.component';
import {RollcallFormEditorComponent} from './form-editor.component';
import {Student} from '../form.model';

@Component({
    styleUrls: ['tile-view.component.scss'],
    templateUrl: 'tile-view.component.html',
})
export class RollcallTileViewComponent extends BaseRollcallView {
    hovered: Student = null;
    constructor(@Host() editor: RollcallFormEditorComponent) {
        super(editor);
    }
}
