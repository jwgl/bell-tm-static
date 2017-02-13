import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {CommonDirectivesModule} from 'core/common-directives';
import {BASE_URL, RestModule} from 'core/rest';

import {TodoListComponent} from './list/todo-list.component';
import {TodoComponent} from './todo.component';
import {routing} from './todo.routes';
import {TodoService} from './todo.service';

@NgModule({
    bootstrap: [TodoComponent],
    declarations: [
        TodoComponent,
        TodoListComponent,
    ],
    imports: [
        BrowserModule,
        routing,
        RestModule.for('/api/core/users/${userId}/works'),
        CommonDirectivesModule,
    ],
    providers: [
        {provide: BASE_URL, useValue: '/web/core/users/${userId}/works'},
        TodoService,
    ],
})
class MainModule {}

platformBrowserDynamic().bootstrapModule(MainModule);
