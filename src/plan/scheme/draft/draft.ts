import {bootstrap} from '@angular/platform-browser-dynamic';
import {Component, ElementRef, provide} from '@angular/core';
import {LocationStrategy, HashLocationStrategy} from '@angular/common';
import {ROUTER_PROVIDERS, ROUTER_DIRECTIVES, Routes, Route} from '@angular/router';

import {REST_PROVIDERS, API_URL} from '../../../core/http';
import {SchemeDraftService} from './draft.service';
import {SchemeDraftListComponent} from './list/draft-list.component';
import {SchemeDraftItemComponent} from './item/draft-item.component';
import {SchemeDraftEditorComponent} from './editor/draft-editor.component';

@Component({
    selector: 'scheme-draft-container',
    template: `<a [routerLink]="'/'"></a><router-outlet></router-outlet>`,
    directives: [ROUTER_DIRECTIVES],
})
@Routes([
    new Route({path: '/', component: SchemeDraftListComponent}),
    new Route({path: '/create/:program', component: SchemeDraftEditorComponent}),
    new Route({path: '/:id/edit', component: SchemeDraftEditorComponent}),
    new Route({path: '/:id/revise', component: SchemeDraftEditorComponent}),
    new Route({path: '/:id', component: SchemeDraftItemComponent}),
])
class SchemeDraft {
    constructor(
        private elementRef: ElementRef,
        private draftService: SchemeDraftService) {
        let userId = elementRef.nativeElement.getAttribute('user');
        this.draftService.userId = userId;
    }
}

bootstrap(SchemeDraft, [
    ROUTER_PROVIDERS,
    provide(LocationStrategy, {useClass: HashLocationStrategy}),
    provide(API_URL, {useValue: '/api/users/${userId}/schemes'}),
    provide('PUBLIC_SCHEME_URL', {useValue: '/api/schemes'}),
    REST_PROVIDERS,
    SchemeDraftService,
]);
