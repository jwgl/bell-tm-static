import {RouterModule} from '@angular/router';

import {ReissueAdminListComponent} from './list/admin-list.component';
import {ReissueAdminItemComponent} from './item/admin-item.component';

const ROUTER_CONFIG = [
    {path: '', redirectTo: 'list/SUBMITTED', pathMatch: 'full'},
    {path: 'list/:status', component: ReissueAdminListComponent},
    {path: ':id', component: ReissueAdminItemComponent},
    {path: ':id/reviews/:wi', component: ReissueAdminItemComponent},
];

export const routing = RouterModule.forRoot(ROUTER_CONFIG, {useHash: true});
