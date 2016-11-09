import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {RestModule} from 'core/rest';

import {SubjectDirectorComponent} from './subject-director.component';
import {SubjectDirectorModule} from './subject-director.module';
import {SubjectDirectorService} from './subject-director.service';

@NgModule({
    bootstrap: [SubjectDirectorComponent],
    imports: [
        BrowserModule,
        SubjectDirectorModule,
        RestModule.for('/api/plan/settings/subjects'),
    ],
    providers: [
        SubjectDirectorService,
    ],
})
class MainModule {}

platformBrowserDynamic().bootstrapModule(MainModule);
