import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {EditMode} from 'core/constants';

import {ReissueOrderEditorComponent} from './editor/order-editor.component';
import {ReissueOrderItemComponent} from './item/order-item.component';
import {ReissueOrderListComponent} from './list/order-list.component';
import {ReissueOrderReceiveComponent} from './receive/order-receive.component';

const routes: Routes = [
    {path: '', component: ReissueOrderListComponent},
    {path: 'create', component: ReissueOrderEditorComponent, data: {mode: EditMode.Create}},
    {path: ':id', component: ReissueOrderItemComponent},
    {path: ':id/edit', component: ReissueOrderEditorComponent, data: {mode: EditMode.Edit}},
    {path: ':id/receive', component: ReissueOrderReceiveComponent},
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {useHash: true}),
    ],
    exports: [
        RouterModule,
    ],
})
export class ReissueOrderRoutingModule {}
