import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {CommonDialogsModule} from 'core/common-dialogs';
import {CommonDirectivesModule} from 'core/common-directives';
import {Dialog} from 'core/dialogs';
import {RestModule} from 'core/rest';

import {ApplicationsAdministrateModule} from '../application/administrate/administrate.module';
import {AwardFormViewerModule} from '../shared/form-viewer.module';

import {AwardFormEditorComponent} from './editor/form-editor.component';
import {BatchRoutingModule} from './form-routing.module';
import {AwardViewComponent} from './form.component';
import {AwardFormService} from './form.service';
import {AwardItemComponent} from './item/item.component';
import {AwardListComponent} from './list/form-list.component';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        RestModule.for('/api/dualdegree/departments/${departmentId}/awards'),
        AwardFormViewerModule,
        CommonDialogsModule,
        CommonDirectivesModule,
        BatchRoutingModule,
        ApplicationsAdministrateModule,
    ],
    declarations: [
        AwardFormEditorComponent,
        AwardItemComponent,
        AwardListComponent,
        AwardViewComponent,
    ],
    providers: [
        Dialog,
        AwardFormService,
    ],
    bootstrap: [
        AwardViewComponent,
    ],
    exports: [
        AwardViewComponent,
    ],
})
export class AwardFormModule {}

platformBrowserDynamic().bootstrapModule(AwardFormModule);
