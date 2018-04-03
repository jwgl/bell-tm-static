import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {CommonDirectivesModule} from 'core/common-directives';
import {RestModule} from 'core/rest';

import {AgreementFormViewerComponent} from '../shared/form-viewer.component';

import {AgreementItemComponent} from './item/item.component';
import {AgreementListComponent} from './list/form-list.component';
import {AgreementRoutingModule} from './public-routing.module';
import {PublicViewComponent} from './public.component';
import {AgreementPublicService} from './public.service';

@NgModule({
    imports: [
        BrowserModule,
        CommonDirectivesModule,
        RestModule.for('/api/dualdegree/agreement-publics'),
        AgreementRoutingModule,
    ],
    declarations: [
        AgreementFormViewerComponent,
        AgreementItemComponent,
        AgreementListComponent,
        PublicViewComponent,
    ],
    providers: [
        AgreementPublicService,
    ],
    bootstrap: [PublicViewComponent],
})
class MainModule {}

platformBrowserDynamic().bootstrapModule(MainModule);
