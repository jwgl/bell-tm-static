import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';

import { CommonDialogsModule } from 'core/common-dialogs';
import { CommonDirectivesModule } from 'core/common-directives';
import { Dialog } from 'core/dialogs';
import { RestModule } from 'core/rest';

import { TeacherSelectComponent } from '../common/teacher-select.component';
import { TypeTextPipe } from '../shared/pipes/observer-type';
import { TermTextPipe } from '../shared/pipes/term';

import { AppRoutingModule } from './app-routing.module';
import { ObserverListComponent } from './list/observer-list.component';
import { ObserverSettingsComponent } from './observer-settings.component';
import { ObserverService } from './observer.service';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        CommonDialogsModule,
        CommonDirectivesModule,
        RestModule.for('/api/steer/settings'),
        HttpModule,
        AppRoutingModule,
    ],
    providers: [
        Dialog,
        ObserverService,
    ],
    declarations: [
        ObserverSettingsComponent,
        ObserverListComponent,
        TeacherSelectComponent,
        TermTextPipe,
        TypeTextPipe,
    ],
    bootstrap: [
        ObserverSettingsComponent,
    ],
})
export class ObserverSettingsModule { }
