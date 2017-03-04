import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {RouterModule} from '@angular/router';

import {CommonDirectivesModule} from 'core/common-directives';
import {RestModule} from 'core/rest';

import {RollcallQueryListComponent} from './list.component';
import {RollcallQueryComponent} from './query.component';
import {RollcallQueryRoutingModule} from './query.routing';
import {RollcallQueryService} from './query.service';

@NgModule({
    bootstrap: [RollcallQueryComponent],
    declarations: [
        RollcallQueryComponent,
        RollcallQueryListComponent,
    ],
    imports: [
        BrowserModule,
        FormsModule,
        RouterModule,
        CommonDirectivesModule,
        RestModule.for('/api/here/rollcalls'),
        RollcallQueryRoutingModule,
    ],
    providers: [
        RollcallQueryService,
        {provide: 'ADMIN_CLASS_ROLLCALL_API', useValue: '/api/here/adminClasses/${id}/rollcalls'},
    ],
})
class MainModule {}

platformBrowserDynamic().bootstrapModule(MainModule);
