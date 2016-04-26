import {bootstrap} from 'angular2/platform/browser';
import {LocationStrategy, HashLocationStrategy} from 'angular2/platform/common';
import {Component, ElementRef, provide} from 'angular2/core';
import {ROUTER_PROVIDERS, ROUTER_DIRECTIVES, RouteConfig} from 'angular2/router';

import {REST_PROVIDERS, API_URL} from '../../../core/http';
import {EditMode} from '../../../core/constants';
import {SchemeDraftService} from './draft.service';
import {SchemeDraftListComponent} from './list/draft-list.component';
import {SchemeDraftItemComponent} from './item/draft-item.component';
import {SchemeDraftEditorComponent} from './editor/draft-editor.component';

@Component({
    selector: 'scheme-draft-container',
    template: '<router-outlet></router-outlet>',
    directives: [ROUTER_DIRECTIVES],
})
@RouteConfig([
    {path: '/', component: SchemeDraftListComponent, name: 'Index'},
    {path: '/:id', component: SchemeDraftItemComponent, name: 'Item'},
    {path: '/:id/edit', component: SchemeDraftEditorComponent, name: 'Edit', data: {mode: EditMode.Edit}},
    {path: '/:id/revise', component: SchemeDraftEditorComponent, name: 'Revise', data: {mode: EditMode.Revise}},
    {path: '/create/:program', component: SchemeDraftEditorComponent, name: 'Create', data: {mode: EditMode.Create}},
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
