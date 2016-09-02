import {Component, Inject} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {BASE_URL} from 'core/rest';

import {TodoService} from '../todo.service';

@Component({
    selector: 'open-todo-list',
    template: require('./open-list.html'),
})
export class OpenTodoListComponent {
    todos: Observable<any[]>;

    constructor(@Inject(BASE_URL) private baseUrl: string, private todoService: TodoService) {
        this.todos = this.todoService.loadList({is: 'open'});
    }
}
