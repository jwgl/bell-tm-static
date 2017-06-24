import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';

import {CommonDialogsModule} from 'core/common-dialogs';
import {CommonDirectivesModule} from 'core/common-directives';

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
