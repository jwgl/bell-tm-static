import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {CommonDirectivesModule} from 'core/common-directives';
import {CommonDialogsModule} from 'core/common-dialogs';

import {RollcallFormRoutingModule} from './form-routing.module';
import {RollcallFormEditorComponent} from './form-editor.component';
import {RollcallDetailViewComponent} from './detail-view.component';
import {RollcallListViewComponent} from './list-view.component';
import {RollcallToggleBarComponent} from './toggle-bar.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        CommonDirectivesModule,
        CommonDialogsModule,
        RollcallFormRoutingModule,
    ],
    declarations: [
        RollcallFormEditorComponent,
        RollcallDetailViewComponent,
        RollcallListViewComponent,
        RollcallToggleBarComponent,
    ],
})
export class RoolcallFormEditorModule {}
