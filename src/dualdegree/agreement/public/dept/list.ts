import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {RestModule} from 'core/rest';

import {AgreementPublicService} from '../public.service';

import {AgreementPublicComponent} from './list/public-list.component';

@NgModule({
    imports: [
        BrowserModule,
        RestModule.for('/api/dualdegree/departments/${departmentId}/agreements'),
    ],
    declarations: [
        AgreementPublicComponent,
    ],
    providers: [
        AgreementPublicService,
    ],
    bootstrap: [AgreementPublicComponent],
})
class MainModule {}

platformBrowserDynamic().bootstrapModule(MainModule);
