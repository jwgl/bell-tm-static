import {bootstrap} from '@angular/platform-browser-dynamic';
import {Component, ElementRef, provide} from '@angular/core';
import {LocationStrategy, HashLocationStrategy} from '@angular/common';
import {ROUTER_DIRECTIVES} from '@angular/router';

import {REST_PROVIDERS, API_URL} from '../../../core/http';
import {SchemeDraftService} from './draft.service';
import {DRAFT_ROUTER_PROVIDERS} from './draft.routes';

@Component({
    selector: 'scheme-draft-container',
    template: `<a [routerLink]="'/'"></a><router-outlet></router-outlet>`,
    directives: [ROUTER_DIRECTIVES],
})
class SchemeDraft {
    constructor(
        private elementRef: ElementRef,
        private draftService: SchemeDraftService) {
        let userId = elementRef.nativeElement.getAttribute('user');
        this.draftService.userId = userId;
    }
}

bootstrap(SchemeDraft, [
    DRAFT_ROUTER_PROVIDERS,
    provide(LocationStrategy, {useClass: HashLocationStrategy}),
    provide(API_URL, {useValue: '/api/users/${userId}/schemes'}),
    provide('PUBLIC_SCHEME_URL', {useValue: '/api/schemes'}),
    REST_PROVIDERS,
    SchemeDraftService,
]);
