import {bootstrap} from '@angular/platform-browser-dynamic';
import {provide} from '@angular/core';

import {REST_PROVIDERS, API_URL} from '../../core/http';
import {ProgramSettingsService} from './program-settings.service';
import {ProgramSettingsComponent} from './program-settings.component';

bootstrap(ProgramSettingsComponent, [
    provide(API_URL, {useValue: '/api/programSettings'}),
    REST_PROVIDERS,
    ProgramSettingsService,
]);
