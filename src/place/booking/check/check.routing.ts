import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {BookingCheckListComponent} from './list/check-list.component';
import {BookingCheckItemComponent} from './item/check-item.component';

const routes: Routes = [
    {path: '', redirectTo: 'list/PENDING', pathMatch: 'full'},
    {path: 'list/:status', component: BookingCheckListComponent},
    {path: ':id', component: BookingCheckItemComponent},
    {path: ':id/workitems/:wi', component: BookingCheckItemComponent},
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {useHash: true}),
    ],
    exports: [
        RouterModule,
    ],
})
export class BookingCheckRoutingModule {}
