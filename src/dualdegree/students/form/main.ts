import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {CommonDialogsModule} from 'core/common-dialogs';
import {CommonDirectivesModule} from 'core/common-directives';
import {Dialog} from 'core/dialogs';
import {RestModule} from 'core/rest';

import {StudentAdminDialog} from './editor/form-editor.component';
import {StudentAdminRoutingModule} from './form-routing.module';
import {StudentAdminViewComponent} from './form.component';
import {StudentAdminFormService} from './form.service';
import {StudentAdminListComponent} from './list/form-list.component';
import {QueryDialog} from './list/query-option.dialog';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        RestModule.for('/api/dualdegree/departments/${departmentId}/students'),
        CommonDialogsModule,
        CommonDirectivesModule,
        StudentAdminRoutingModule,
    ],
    declarations: [
        StudentAdminListComponent,
        StudentAdminViewComponent,
        StudentAdminDialog,
        QueryDialog,
    ],
    providers: [
        Dialog,
        StudentAdminFormService,
    ],
    entryComponents: [
        StudentAdminDialog,
        QueryDialog,
    ],
    bootstrap: [
        StudentAdminViewComponent,
    ],
})
class DeptAdminFormModule {}

platformBrowserDynamic().bootstrapModule(DeptAdminFormModule);
