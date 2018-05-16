import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {FinderItemComponent} from './item.component';
import {FinderListComponent} from './list.component';

const routes: Routes = [
    {path: '', redirectTo: '/list', pathMatch: 'full'},
    {path: 'list', component: FinderListComponent},
    {path: ':id', component: FinderItemComponent},
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
