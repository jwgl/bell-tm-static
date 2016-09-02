import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {RestModule} from 'core/rest';

import {ProgramSettingsComponent} from './program/program-settings.component';
import {ProgramSettingsModule} from './program/program-settings.module';
import {ProgramSettingsService} from './program-settings.service';

@NgModule({
    bootstrap: [ProgramSettingsComponent],
    imports: [
        BrowserModule,
        ProgramSettingsModule,
        RestModule.for('/api/programSettings'),
    ],
    providers: [
        ProgramSettingsService,
    ],
})
class MainModule {}

platformBrowserDynamic().bootstrapModule(MainModule);
