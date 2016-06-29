import {provideRouter, RouterConfig} from '@angular/router';

import {VisionDraftListComponent} from './list/draft-list.component';
import {VisionDraftItemComponent} from './item/draft-item.component';
import {VisionDraftEditorComponent} from './editor/draft-editor.component';

const routes: RouterConfig = [
    {path: '', component: VisionDraftListComponent},
    {path: 'create/:program', component: VisionDraftEditorComponent},
    {path: ':id/edit', component: VisionDraftEditorComponent},
    {path: ':id/revise', component: VisionDraftEditorComponent},
    {path: ':id', component: VisionDraftItemComponent},
];

export const DRAFT_ROUTER_PROVIDERS = [
    provideRouter(routes),
];
