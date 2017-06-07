import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {CourseClassAttendanceComponent} from './course-class.component';

const routes: Routes = [
    {
        path: '',
        children: [
            {path: ':id', component: CourseClassAttendanceComponent},
            {path: ':teacherId/:id', component: CourseClassAttendanceComponent},
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
export class CourseClassRoutingModule {}
