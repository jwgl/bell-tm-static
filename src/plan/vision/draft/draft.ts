import {bootstrap} from '@angular/platform-browser-dynamic';
import {Component, ElementRef, provide} from '@angular/core';
import {LocationStrategy, HashLocationStrategy} from '@angular/common';
import {ROUTER_DIRECTIVES} from '@angular/router';

import {REST_PROVIDERS, API_URL, API_URL_FIELDS} from '../../../core/http';
import {VisionDraftService} from './draft.service';
import {DRAFT_ROUTER_PROVIDERS} from './draft.routes';

@Component({
    selector: 'vision-draft-container',
    template: `<a [routerLink]="'/'"></a><router-outlet></router-outlet>`,
    directives: [ROUTER_DIRECTIVES],
})
class VisionDraft {
    constructor(
        private elementRef: ElementRef,
        private draftService: VisionDraftService) {
        let userId = elementRef.nativeElement.getAttribute('user');
        this.draftService.userId = userId;
    }
}

bootstrap(VisionDraft, [
    DRAFT_ROUTER_PROVIDERS,
    provide(LocationStrategy, {useClass: HashLocationStrategy}),
    provide(API_URL, {useValue: '/api/users/${userId}/visions'}),
    provide(API_URL_FIELDS, {useValue: '/api/fields'}),
    provide('API_URL_IMPORT', {useValue: '/api/visions'}),
    REST_PROVIDERS,
    VisionDraftService,
]);
