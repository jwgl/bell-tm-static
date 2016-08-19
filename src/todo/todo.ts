import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule, provide} from '@angular/core';

import {FromNowComponent} from '../core/components';
import {RestModule, BASE_URL} from '../core/http';
import {TodoListComponent} from './list/todo-list.component';
import {OpenTodoListComponent} from './list/open-list.component';
import {ClosedTodoListComponent} from './list/closed-list.component';
import {TodoService} from './todo.service';
import {routing} from './todo.routes';

let match = window.location.href.match(/\/users\/([^\/]+)\//);
let userId = match[1];

@NgModule({
    bootstrap: [TodoListComponent],
    declarations: [
        TodoListComponent,
        OpenTodoListComponent,
        ClosedTodoListComponent,
        FromNowComponent,
    ],
    imports: [
        BrowserModule,
        routing,
        RestModule.for(`/api/users/${userId}/works`),
    ],
    providers: [
        provide(BASE_URL, {useValue: `/users/${userId}/works`}),
        TodoService,
    ],
})
class MainModule {}

platformBrowserDynamic().bootstrapModule(MainModule);
