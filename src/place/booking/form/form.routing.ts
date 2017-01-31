import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {EditMode} from 'core/constants';

import {BookingFormListComponent} from './list/form-list.component';
import {BookingFormItemComponent} from './item/form-item.component';
import {BookingFormEditorComponent} from './editor/form-editor.component';

const routes: Routes = [
    {path: '', component: BookingFormListComponent},
    {path: 'create', component: BookingFormEditorComponent, data: {mode: EditMode.Create}},
    {path: ':id/edit', component: BookingFormEditorComponent, data: {mode: EditMode.Edit}},
    {path: ':id', component: BookingFormItemComponent},
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {useHash: true}),
    ],
    exports: [
        RouterModule,
    ],
})
export class BookingFormRoutingModule {}
