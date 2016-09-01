import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {Dialog} from '../../../core/dialogs';
import {CommonDirectivesModule} from '../../../core/common-directives';

import {PlanCommonModule} from '../../common/module';
import {ProgramSettingsComponent} from './program-settings.component';
import {ProgramEditorDialog} from './program-editor.dialog';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        CommonDirectivesModule,
        PlanCommonModule,
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
