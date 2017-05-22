import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {AdminClassListComponent} from './list.component';

const routes: Routes = [
    {
        path: '',
        children: [
            {path: '', redirectTo: 'all', pathMatch: 'full'},
            {path: ':id', component: AdminClassListComponent},
        ],
    },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {useHash: true}),
    ],
    exports: [
        RouterModule,
    ],
})
export class AdminClassListMainRoutingModule {}
