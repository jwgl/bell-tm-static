import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { CommonDialogsModule } from 'core/common-dialogs';
import { CommonDirectivesModule } from 'core/common-directives';
import { RestModule } from 'core/rest';

import { ObservationFormViewerComponent } from '../form/shared/form-viewer.component';
import { FormViewComponent } from '../legacy/shared/form-view.component';
import { TypeTextPipe } from '../shared/pipes/observer-type';
import { TermTextPipe } from '../shared/pipes/term';

import { LegacyItemComponent } from './item/legacy-item.component';
import { PublicItemComponent } from './item/public-item.component';
import { PublicListComponent } from './list/public-list.component';

import { PublicRoutingModule } from './public-routing.module';
import { PublicComponent } from './public.component';
import { PublicService } from './public.service';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        RestModule.for('/api/steer/publics'),
        PublicRoutingModule,
        CommonDirectivesModule,
        CommonDialogsModule,
    ],
    declarations: [
        PublicListComponent,
        PublicComponent,
        PublicItemComponent,
        TermTextPipe,
        ObservationFormViewerComponent,
        LegacyItemComponent,
        FormViewComponent,
        TypeTextPipe,
    ],
    providers: [
        PublicService,
    ],
    bootstrap: [
        PublicComponent,
    ],
})
export class PublicModule { }
