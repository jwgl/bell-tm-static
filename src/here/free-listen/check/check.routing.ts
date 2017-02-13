import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {FreeListenCheckItemComponent} from './item/check-item.component';
import {FreeListenCheckListComponent} from './list/check-list.component';

const routes: Routes = [
    {path: '', redirectTo: 'list/PENDING', pathMatch: 'full'},
    {path: 'list/:status', component: FreeListenCheckListComponent},
    {path: ':id', component: FreeListenCheckItemComponent},
    {path: ':id/workitems/:wi', component: FreeListenCheckItemComponent},
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {useHash: true}),
    ],
    exports: [
        RouterModule,
    ],
})
export class FreeListenCheckRoutingModule {}
