import {bootstrap} from '@angular/platform-browser-dynamic';
import {provide} from '@angular/core';
import {LocationStrategy, HashLocationStrategy} from '@angular/common';

import {REST_PROVIDERS, API_URL, BASE_URL} from '../core/http';
import {TodoService} from './todo.service';
import {TodoListComponent} from './list/todo-list.component';
import {TODO_ROUTER_PROVIDERS} from './todo.routes';

let match = window.location.href.match(/\/users\/([^\/]+)\//);
let userId = match[1];

bootstrap(TodoListComponent, [
    TODO_ROUTER_PROVIDERS,
    provide(LocationStrategy, {useClass: HashLocationStrategy}),
    provide(API_URL, {useValue: `/api/users/${userId}/works`}),
    provide(BASE_URL, {useValue: `/users/${userId}/works`}),
    REST_PROVIDERS,
    TodoService,
]);
