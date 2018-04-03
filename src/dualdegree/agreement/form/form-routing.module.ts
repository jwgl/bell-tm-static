import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EditMode } from 'core/constants';

import { AgreementFormEditorComponent } from './editor/form-editor.component';
import { AgreementItemComponent } from './item/item.component';
import { AgreementListComponent } from './list/form-list.component';

const routes: Routes = [
    { path: '', redirectTo: '/list', pathMatch: 'full' },
    { path: 'editor', component: AgreementFormEditorComponent, data: { mode: EditMode.Create }},
    { path: 'list', component: AgreementListComponent },
    { path: ':id/edit', component: AgreementFormEditorComponent, data: { mode: EditMode.Edit }},
    { path: ':id', component: AgreementItemComponent },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, { useHash: true }),
    ],
    exports: [
        RouterModule,
    ],
})
export class AgreementRoutingModule { }
