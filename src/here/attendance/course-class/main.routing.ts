import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {CourseClassListComponent} from './list.component';

const routes: Routes = [
    {
        path: '',
        children: [
            {path: ':id', component: CourseClassListComponent},
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
export class CourseClassListRoutingModule {}
