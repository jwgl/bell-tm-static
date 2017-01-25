import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {EditMode} from 'core/constants';

import {LeaveFormListComponent} from './list/form-list.component';
import {LeaveFormItemComponent} from './item/form-item.component';
import {LeaveFormEditorComponent} from './editor/form-editor.component';

const routes: Routes = [
    {path: '', component: LeaveFormListComponent},
    {path: 'create', component: LeaveFormEditorComponent, data: {mode: EditMode.Create}},
    {path: ':id/edit', component: LeaveFormEditorComponent, data: {mode: EditMode.Edit}},
    {path: ':id', component: LeaveFormItemComponent},
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {useHash: true}),
    ],
    exports: [
        RouterModule,
    ],
})
export class LeaveFormRoutingModule {}

