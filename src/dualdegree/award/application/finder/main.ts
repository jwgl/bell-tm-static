import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {CommonDirectivesModule} from 'core/common-directives';
import {RestModule} from 'core/rest';

import {ApplicationSharedModule} from '../shared/application-shared.module';
import {BatchRoutingModule} from './finder-routing.module';
import {FinderComponent} from './finder.component';
import {FinderService} from './finder.service';
import {FinderItemComponent} from './item.component';
import {FinderListComponent} from './list.component';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        CommonDirectivesModule,
        RestModule.for('/api/dualdegree/finders'),
        BatchRoutingModule,
        ApplicationSharedModule,
    ],
    declarations: [
        FinderListComponent,
        FinderItemComponent,
        FinderComponent,
    ],
    providers: [
        FinderService,
    ],
    bootstrap: [FinderComponent],
})
class FinderModule {}

platformBrowserDynamic().bootstrapModule(FinderModule);
