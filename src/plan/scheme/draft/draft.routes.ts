import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {EditMode} from 'core/constants';
import {SchemeDraftListComponent} from './list/draft-list.component';
import {SchemeDraftItemComponent} from './item/draft-item.component';
import {SchemeDraftEditorComponent} from './editor/draft-editor.component';

const routes: Routes = [
    {path: '', component: SchemeDraftListComponent},
    {path: 'create/:program', component: SchemeDraftEditorComponent, data: {mode: EditMode.Create}},
    {path: ':id/edit', component: SchemeDraftEditorComponent, data: {mode: EditMode.Edit}},
    {path: ':id/revise', component: SchemeDraftEditorComponent, data: {mode: EditMode.Revise}},
    {path: ':id', component: SchemeDraftItemComponent},
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {useHash: true})],
    exports: [RouterModule],
})
export class SchemeDraftRoutingModule {}
