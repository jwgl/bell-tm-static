import {provideRouter, RouterConfig} from '@angular/router';

import {SchemeDraftListComponent} from './list/draft-list.component';
import {SchemeDraftItemComponent} from './item/draft-item.component';
import {SchemeDraftEditorComponent} from './editor/draft-editor.component';

const routes: RouterConfig = [
    {path: '', component: SchemeDraftListComponent},
    {path: 'create/:program', component: SchemeDraftEditorComponent},
    {path: ':id/edit', component: SchemeDraftEditorComponent},
    {path: ':id/revise', component: SchemeDraftEditorComponent},
    {path: ':id', component: SchemeDraftItemComponent},
];

export const DRAFT_ROUTER_PROVIDERS = [
    provideRouter(routes),
];
