import {Component, Host} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

import {BaseRollcallView} from './base-view.component';
import {RollcallFormEditorComponent} from './form-editor.component';
import {RollcallFormService} from '../form.service';
import {RollcallType, RollcallTypes, RollcallKeys, Student} from '../form.model';

@Component({
    styleUrls: ['tile-view.component.scss'],
    templateUrl: 'tile-view.component.html',
})
export class RollcallTileViewComponent extends BaseRollcallView {
    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private service: RollcallFormService,
        @Host() editor: RollcallFormEditorComponent,
    ) {
        super(editor);
    }
}
