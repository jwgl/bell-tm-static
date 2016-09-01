import {RouterModule} from '@angular/router';
import {OpenTodoListComponent} from './list/open-list.component';
import {ClosedTodoListComponent} from './list/closed-list.component';

const ROUTER_CONFIG: any = [
    {path: '', redirectTo: 'open', pathMatch: 'full'},
    {path: 'open', component: OpenTodoListComponent},
    {path: 'closed', component: ClosedTodoListComponent},
];

export const routing = RouterModule.forRoot(ROUTER_CONFIG, {useHash: true});
