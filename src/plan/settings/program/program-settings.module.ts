import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';

import {CommonDirectivesModule} from 'core/common-directives';
import {Dialog} from 'core/dialogs';

import {PlanSharedModule} from '../../shared/module';
import {ProgramEditorDialog} from './program-editor.dialog';
import {ProgramSettingsComponent} from './program-settings.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        CommonDirectivesModule,
        PlanSharedModule,
    ],
    declarations: [
        ProgramSettingsComponent,
        ProgramEditorDialog,
    ],
    providers: [
        Dialog,
    ],
    exports: [
        ProgramSettingsComponent,
    ],
    entryComponents: [
        ProgramEditorDialog,
    ],
})
export class ProgramSettingsModule {}
