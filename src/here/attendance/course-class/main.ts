import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {CommonDirectivesModule} from 'core/common-directives';
import {RestModule} from 'core/rest';

import {CourseClassListComponent} from './list.component';
import {CourseClassListMainComponent} from './main.component';
import {CourseClassListRoutingModule} from './main.routing';
import {CourseClassListMainService} from './main.service';

@NgModule({
    bootstrap: [CourseClassListMainComponent],
    declarations: [
        CourseClassListMainComponent,
        CourseClassListComponent,
    ],
    imports: [
        BrowserModule,
        RestModule.for('/api/here/teachers/${userId}/courseClasses'),
        CommonDirectivesModule,
        CourseClassListRoutingModule,
    ],
    providers: [
        CourseClassListMainService,
    ],
})
class MainModule {}

platformBrowserDynamic().bootstrapModule(MainModule);
