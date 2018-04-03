import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {EditMode} from 'core/constants';

import {ApplicationFormEditorComponent} from './editor/form-editor.component';
import {AwardItemComponent} from './item/award-item.component';
import {ApplicationItemComponent} from './item/item.component';
import {AwardListComponent} from './list/form-list.component';

const routes: Routes = [
    { path: '', redirectTo: '/list', pathMatch: 'full' },
    { path: 'list', component: AwardListComponent },
    { path: 'create/:awardId', component: ApplicationFormEditorComponent, data: { mode: EditMode.Create }},
    { path: 'awards/:id', component: AwardItemComponent },
    { path: ':id/edit', component: ApplicationFormEditorComponent, data: { mode: EditMode.Edit }},
    { path: ':id', component: ApplicationItemComponent },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, { useHash: true }),
    ],
    exports: [
        RouterModule,
    ],
})
export class ApplicationRoutingModule { }
