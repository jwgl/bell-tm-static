import {provideRouter, RouterConfig} from '@angular/router';
import {OpenTodoListComponent} from './list/open-list.component';
import {ClosedTodoListComponent} from './list/closed-list.component';

const routes: RouterConfig = [
    {path: '', redirectTo: 'open', terminal: true},
    {path: 'open', component: OpenTodoListComponent},
    {path: 'closed', component: ClosedTodoListComponent},
];

export const TODO_ROUTER_PROVIDERS = [
    provideRouter(routes),
];
