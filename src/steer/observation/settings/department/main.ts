import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { CommonDialogsModule } from 'core/common-dialogs';
import { CommonDirectivesModule } from 'core/common-directives';
import { Dialog } from 'core/dialogs';
import { RestModule } from 'core/rest';

import { TermTextPipe } from '../../shared/pipes/term';
import { MyTeacherModule } from '../../shared/utils/my-teacher.module';

import { AppRoutingModule } from './app-routing.module';
import { ObserverEditorComponent } from './editor/observer-editor.component';
import { ObserverListComponent } from './list/observer-list.component';
import { ObserverSettingsComponent } from './observer-settings.component';
import { ObserverService } from './observer.service';
import { ObserverReportComponent } from './report/observer-report.component';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        CommonDialogsModule,
        CommonDirectivesModule,
        RestModule.for('/api/steer/departments/${departmentId}/settings'),
        HttpModule,
        AppRoutingModule,
        MyTeacherModule,
    ],
    providers: [
        Dialog,
        ObserverService,
    ],
    declarations: [
        ObserverSettingsComponent,
        ObserverEditorComponent,
        ObserverListComponent,
        TermTextPipe,
        ObserverReportComponent,
    ],
    entryComponents: [
        ObserverEditorComponent,
    ],
    bootstrap: [
        ObserverSettingsComponent,
    ],
})

class MainModule { }

platformBrowserDynamic().bootstrapModule(MainModule);
