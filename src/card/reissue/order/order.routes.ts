import {RouterModule} from '@angular/router';

import {EditMode} from 'core/constants';

import {ReissueOrderListComponent} from './list/order-list.component';
import {ReissueOrderItemComponent} from './item/order-item.component';
import {ReissueOrderEditorComponent} from './editor/order-editor.component';
import {ReissueOrderReceiveComponent} from './receive/order-receive.component';

const ROUTER_CONFIG = [
    {path: '', component: ReissueOrderListComponent},
    {path: 'create', component: ReissueOrderEditorComponent, data: {mode: EditMode.Create}},
    {path: ':id', component: ReissueOrderItemComponent},
    {path: ':id/edit', component: ReissueOrderEditorComponent, data: {mode: EditMode.Edit}},
    {path: ':id/receive', component: ReissueOrderReceiveComponent},
];

export const routing = RouterModule.forRoot(ROUTER_CONFIG, {useHash: true});
