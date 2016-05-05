import {bootstrap} from '@angular/platform-browser-dynamic';
import {Component, ElementRef, provide} from '@angular/core';
import {LocationStrategy, HashLocationStrategy} from '@angular/common';
import {ROUTER_PROVIDERS, ROUTER_DIRECTIVES, Routes, Route} from '@angular/router';

import {REST_PROVIDERS, API_URL, API_URL_FIELDS} from '../../../core/http';
import {VisionDraftService} from './draft.service';
import {VisionDraftListComponent} from './list/draft-list.component';
import {VisionDraftItemComponent} from './item/draft-item.component';
import {VisionDraftEditorComponent} from './editor/draft-editor.component';

@Component({
    selector: 'vision-draft-container',
    template: `<a [routerLink]="'/'"></a><router-outlet></router-outlet>`,
    directives: [ROUTER_DIRECTIVES],
})
@Routes([
    new Route({path: '/', component: VisionDraftListComponent}),
    new Route({path: '/create/:program', component: VisionDraftEditorComponent}),
    new Route({path: '/:id/edit', component: VisionDraftEditorComponent}),
    new Route({path: '/:id/revise', component: VisionDraftEditorComponent}),
    new Route({path: '/:id', component: VisionDraftItemComponent}),
])
class VisionDraft {
    constructor(
        private elementRef: ElementRef,
        private draftService: VisionDraftService) {
        let userId = elementRef.nativeElement.getAttribute('user');
        this.draftService.userId = userId;
    }
}

bootstrap(VisionDraft, [
    ROUTER_PROVIDERS,
    provide(LocationStrategy, {useClass: HashLocationStrategy}),
    provide(API_URL, {useValue: '/api/users/${userId}/visions'}),
    provide(API_URL_FIELDS, {useValue: '/api/fields'}),
    provide('API_URL_IMPORT', {useValue: '/api/visions'}),
    REST_PROVIDERS,
    VisionDraftService,
]);
