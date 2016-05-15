import {bootstrap} from '@angular/platform-browser-dynamic';
import {provide} from '@angular/core';

import {REST_PROVIDERS, API_URL} from '../../../core/http';
import {SubjectSetupService} from './subject.service';
import {SubjectDirectorComponent} from './director/subject-director.component';

bootstrap(SubjectDirectorComponent, [
    provide(API_URL, {useValue: '/api/subjectDirectors'}),
    REST_PROVIDERS,
    SubjectSetupService,
]);
