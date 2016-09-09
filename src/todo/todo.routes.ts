import {RouterModule} from '@angular/router';
import {TodoListComponent} from './list/todo-list.component';

const ROUTER_CONFIG: any = [
    {path: '', redirectTo: 'open', pathMatch: 'full'},
    {path: ':status', component: TodoListComponent},
];

export const routing = RouterModule.forRoot(ROUTER_CONFIG, {useHash: true});
