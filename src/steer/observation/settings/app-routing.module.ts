import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ObserverListComponent } from './list/observer-list.component';

const routes: Routes = [
    { path: '', redirectTo: '/list', pathMatch: 'full' },
    { path: 'list', component: ObserverListComponent },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {useHash: true}),
    ],
    exports: [
        RouterModule,
    ],
})
export class AppRoutingModule { }
