import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {AttendanceListComponent} from './list.component';

const routes: Routes = [
    {
        path: '',
        component: AttendanceListComponent,
    },
    {
        path: 'adminClasses/:adminClassId',
        component: AttendanceListComponent,
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
export class AttendanceListMainRoutingModule {}
