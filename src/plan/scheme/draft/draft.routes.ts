import {provideRouter, RouterConfig} from '@angular/router';

import {EditMode} from '../../../core/constants';
import {SchemeDraftListComponent} from './list/draft-list.component';
import {SchemeDraftItemComponent} from './item/draft-item.component';
import {SchemeDraftEditorComponent} from './editor/draft-editor.component';

const routes: RouterConfig = [
    {path: '', component: SchemeDraftListComponent},
    {path: 'create/:program', component: SchemeDraftEditorComponent, data: {mode: EditMode.Create}},
    {path: ':id/edit', component: SchemeDraftEditorComponent, data: {mode: EditMode.Edit}},
    {path: ':id/revise', component: SchemeDraftEditorComponent, data: {mode: EditMode.Revise}},
    {path: ':id', component: SchemeDraftItemComponent},
];

export const DRAFT_ROUTER_PROVIDERS = [
    provideRouter(routes),
];
