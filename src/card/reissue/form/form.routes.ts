import {RouterModule} from '@angular/router';

import {EditMode} from 'core/constants';

import {ReissueFormListComponent} from './list/form-list.component';
import {ReissueFormItemComponent} from './item/form-item.component';
import {ReissueFormEditorComponent} from './editor/form-editor.component';

const ROUTER_CONFIG = [
    {path: '', component: ReissueFormListComponent},
    {path: 'create', component: ReissueFormEditorComponent, data: {mode: EditMode.Create}},
    {path: ':id/edit', component: ReissueFormEditorComponent, data: {mode: EditMode.Edit}},
    {path: ':id', component: ReissueFormItemComponent},
];

export const routing = RouterModule.forRoot(ROUTER_CONFIG, {useHash: true});
