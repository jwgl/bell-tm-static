import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {EditMode} from 'core/constants';

import {BookingReportEditorComponent} from './editor/report-editor.component';
import {BookingReportItemComponent} from './item/report-item.component';
import {BookingReportListComponent} from './list/report-list.component';

const routes: Routes = [
    {path: '', component: BookingReportListComponent},
    {path: 'create', component: BookingReportEditorComponent, data: {mode: EditMode.Create}},
    {path: ':id', component: BookingReportItemComponent},
    {path: ':id/edit', component: BookingReportEditorComponent, data: {mode: EditMode.Edit}},
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {useHash: true}),
    ],
    exports: [
        RouterModule,
    ],
})
export class BookingReportRoutingModule {}
