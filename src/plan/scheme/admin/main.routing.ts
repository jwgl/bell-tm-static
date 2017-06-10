import {NgModule} from '@angular/core';
import {RouteReuseStrategy, RouterModule, Routes} from '@angular/router';

import {SchemeAdminItemComponent} from './item/admin-item.component';
import {SchemeAdminListComponent} from './list/admin-list.component';
import {CustomReuseStrategy} from './main.reuse';

const routes: Routes = [
    {path: '', component: SchemeAdminListComponent},
    {path: ':id', component: SchemeAdminItemComponent},
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {useHash: true})],
    exports: [RouterModule],
    providers: [
        {provide: RouteReuseStrategy, useClass: CustomReuseStrategy},
    ],
})
export class SchemeAdminRoutingModule {}
