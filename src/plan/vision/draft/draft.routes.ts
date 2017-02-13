import {RouterModule} from '@angular/router';

import {EditMode} from 'core/constants';

import {VisionDraftEditorComponent} from './editor/draft-editor.component';
import {VisionDraftItemComponent} from './item/draft-item.component';
import {VisionDraftListComponent} from './list/draft-list.component';

const ROUTER_CONFIG = [
    {path: '', component: VisionDraftListComponent},
    {path: 'create/:program', component: VisionDraftEditorComponent, data: {mode: EditMode.Create}},
    {path: ':id/edit', component: VisionDraftEditorComponent, data: {mode: EditMode.Edit}},
    {path: ':id/revise', component: VisionDraftEditorComponent, data: {mode: EditMode.Revise}},
    {path: ':id', component: VisionDraftItemComponent},
];

export const routing = RouterModule.forRoot(ROUTER_CONFIG, {useHash: true});
