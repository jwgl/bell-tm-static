import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {UserProfileEditComponent} from './profile-edit.component';
import {UserProfileViewComponent} from './profile-view.component';

const routes: Routes = [
    {path: '', component: UserProfileViewComponent},
    {path: 'edit', component: UserProfileEditComponent},
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {useHash: true}),
    ],
    exports: [
        RouterModule,
    ],
})
export class UserProfileRoutingModule {}
