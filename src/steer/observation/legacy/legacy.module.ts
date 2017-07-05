import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { CommonDialogsModule } from 'core/common-dialogs';
import { CommonDirectivesModule } from 'core/common-directives';
import { RestModule } from 'core/rest';

import { TypeTextPipe } from '../shared/pipes/observer-type';
import { PagerPipe } from '../shared/pipes/pager';
import { TermTextPipe } from '../shared/pipes/term';

import { LegacyItemComponent } from './item/legacy-item.component';
import { LegacyRoutingModule } from './legacy-routing.module';
import { LegacyComponent } from './legacy.component';
import { LegacyService } from './legacy.service';
import { LegacyListComponent } from './list/legacy-list.component';
import { FormViewComponent } from './shared/form-view.component';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        RestModule.for('/api/steer/legacies'),
        LegacyRoutingModule,
        CommonDirectivesModule,
        CommonDialogsModule,
    ],
    declarations: [
        LegacyListComponent,
        LegacyItemComponent,
        FormViewComponent,
        LegacyComponent,
        TermTextPipe,
        TypeTextPipe,
        PagerPipe,
    ],
    providers: [
        LegacyService,
    ],
    bootstrap: [
        LegacyComponent,
    ],
})
export class LegacyModule { }
