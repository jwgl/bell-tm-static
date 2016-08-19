import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {provideDialog} from '../../../core/dialogs';
import {ModalDirectivesModule} from '../../../core/directives';
import {BootstrapFormModule} from '../../../core/bootstrap';

import {PlanCommonModule} from '../../common/module';
import {ProgramSettingsComponent} from './program-settings.component';
import {ProgramEditorDialog} from './program-editor.dialog';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        BootstrapFormModule,
        ModalDirectivesModule,
        PlanCommonModule,
    ],
    declarations: [
        ProgramSettingsComponent,
        ProgramEditorDialog,
    ],
    providers: [
        provideDialog(null, ProgramSettingsModule),
    ],
    exports: [
        ProgramSettingsComponent,
    ],
})
export class ProgramSettingsModule {}
