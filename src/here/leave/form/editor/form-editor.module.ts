import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {CommonDirectivesModule} from 'core/common-directives';
import {CommonDialogsModule} from 'core/common-dialogs';

import {LeaveFormEditorComponent} from './form-editor.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        CommonDirectivesModule,
        CommonDialogsModule,
    ],
    declarations: [
        LeaveFormEditorComponent,
    ],
    exports: [
        LeaveFormEditorComponent,
    ],
})
export class LeaveFormEditorModule {}
