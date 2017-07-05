import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LegacyItemComponent } from './item/legacy-item.component';
import { LegacyListComponent } from './list/legacy-list.component';

const routes: Routes = [
    { path: '', redirectTo: '/list', pathMatch: 'full' },
    { path: 'list', component: LegacyListComponent },
    { path: ':id', component: LegacyItemComponent },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, { useHash: true }),
    ],
    exports: [
        RouterModule,
    ],
})
export class LegacyRoutingModule { }
