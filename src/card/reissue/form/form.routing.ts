import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {EditMode} from 'core/constants';

import {ReissueFormEditorComponent} from './editor/form-editor.component';
import {ReissueFormItemComponent} from './item/form-item.component';
import {ReissueFormListComponent} from './list/form-list.component';

const routes: Routes = [
    {path: '', component: ReissueFormListComponent},
    {path: 'create', component: ReissueFormEditorComponent, data: {mode: EditMode.Create}},
    {path: ':id/edit', component: ReissueFormEditorComponent, data: {mode: EditMode.Edit}},
    {path: ':id', component: ReissueFormItemComponent},
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {useHash: true}),
    ],
    exports: [
        RouterModule,
    ],
})
export class ReissueFormRoutingModule {}
