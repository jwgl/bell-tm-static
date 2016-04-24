import {bootstrap} from 'angular2/platform/browser';
import {provide} from 'angular2/core';

import {REST_PROVIDERS, API_URL} from '../../../core/http';
import {VisionReviewService} from './review.service';
import {VisionReviewComponent} from './review.component';

bootstrap(VisionReviewComponent, [
    provide(API_URL, {useValue: '/api/visions'}),
    REST_PROVIDERS,
    VisionReviewService,
]);
