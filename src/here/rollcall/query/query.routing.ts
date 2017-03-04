import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {RollcallQueryListComponent} from './list.component';

const routes: Routes = [
    {
        path: '',
        component: RollcallQueryListComponent,
    },
    {
        path: 'adminClasses/:adminClassId',
        component: RollcallQueryListComponent,
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
export class RollcallQueryRoutingModule {}
