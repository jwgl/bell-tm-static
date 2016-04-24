import {bootstrap} from 'angular2/platform/browser';
import {Component, ElementRef, provide} from 'angular2/core';
import {
    ROUTER_PROVIDERS,
    ROUTER_DIRECTIVES,
    LocationStrategy,
    HashLocationStrategy,
    RouteConfig,
} from 'angular2/router';

import {REST_PROVIDERS, API_URL, API_URL_FIELDS} from '../../../core/http';
import {EditMode} from '../../../core/constants';
import {VisionDraftService} from './draft.service';
import {VisionDraftListComponent} from './list/draft-list.component';
import {VisionDraftItemComponent} from './item/draft-item.component';
import {VisionDraftEditorComponent} from './editor/draft-editor.component';

@Component({
    selector: 'vision-draft-container',
    template: '<router-outlet></router-outlet>',
    directives: [ROUTER_DIRECTIVES],
})
@RouteConfig([
    {path: '/', component: VisionDraftListComponent, name: 'Index'},
    {path: '/:id', component: VisionDraftItemComponent, name: 'Item'},
    {path: '/:id/edit', component: VisionDraftEditorComponent, name: 'Edit', data: {mode: EditMode.Edit}},
    {path: '/:id/revise', component: VisionDraftEditorComponent, name: 'Revise', data: {mode: EditMode.Revise}},
    {path: '/create/:program', component: VisionDraftEditorComponent, name: 'Create', data: {mode: EditMode.Create}},
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
