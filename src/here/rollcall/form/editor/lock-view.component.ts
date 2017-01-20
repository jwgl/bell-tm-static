import {Component, Host} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

import {BaseRollcallView} from './base-view.component';
import {RollcallFormEditorComponent} from './form-editor.component';
import {RollcallFormService} from '../form.service';

@Component({
    styleUrls: ['lock-view.component.scss'],
    templateUrl: 'lock-view.component.html',
})
export class RollcallLockViewComponent extends BaseRollcallView {
    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private service: RollcallFormService,
        @Host() editor: RollcallFormEditorComponent,
    ) {
        super(editor);
    }
}
