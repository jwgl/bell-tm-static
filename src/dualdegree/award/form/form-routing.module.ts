import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {EditMode} from 'core/constants';

import {ApplicationsAdministrateItemComponent} from '../application/administrate/item.component';
import {ApplicationListComponent} from '../application/administrate/list.component';
import {AwardFormEditorComponent} from './editor/form-editor.component';
import {AwardItemComponent} from './item/item.component';
import {AwardListComponent} from './list/form-list.component';

const routes: Routes = [
    {path: '', redirectTo: '/list', pathMatch: 'full'},
    {path: 'editor', component: AwardFormEditorComponent, data: { mode: EditMode.Create }},
    {path: 'list', component: AwardListComponent},
    {path: ':id/edit', component: AwardFormEditorComponent, data: { mode: EditMode.Edit }},
    {path: ':id/applications', component: ApplicationListComponent},
    {path: ':id/applications/:applicationId', component: ApplicationsAdministrateItemComponent},
    {path: ':id', component: AwardItemComponent },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {useHash: true}),
    ],
    exports: [
        RouterModule,
    ],
})
export class BatchRoutingModule {}
