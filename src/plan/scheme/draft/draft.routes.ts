import {RouterModule} from '@angular/router';

import {EditMode} from 'core/constants';
import {SchemeDraftListComponent} from './list/draft-list.component';
import {SchemeDraftItemComponent} from './item/draft-item.component';
import {SchemeDraftEditorComponent} from './editor/draft-editor.component';

const ROUTER_CONFIG = [
    {path: '', component: SchemeDraftListComponent},
    {path: 'create/:program', component: SchemeDraftEditorComponent, data: {mode: EditMode.Create}},
    {path: ':id/edit', component: SchemeDraftEditorComponent, data: {mode: EditMode.Edit}},
    {path: ':id/revise', component: SchemeDraftEditorComponent, data: {mode: EditMode.Revise}},
    {path: ':id', component: SchemeDraftItemComponent},
];

export const routing = RouterModule.forRoot(ROUTER_CONFIG, {useHash: true});
