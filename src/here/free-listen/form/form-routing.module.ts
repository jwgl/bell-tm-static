import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {EditMode} from 'core/constants';

import {FreeFormEditorComponent} from './editor/form-editor.component';
import {FreeFormItemComponent} from './item/form-item.component';
import {FreeListenFormListComponent} from './list/form-list.component';

const routes: Routes = [
    {path: '', component: FreeListenFormListComponent},
    {path: 'create', component: FreeFormEditorComponent, data: {mode: EditMode.Create}},
    {path: ':id/edit', component: FreeFormEditorComponent, data: {mode: EditMode.Edit}},
    {path: ':id', component: FreeFormItemComponent},
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {useHash: true}),
    ],
    exports: [
        RouterModule,
    ],
})
export class FreeListenFormRoutingModule {}
