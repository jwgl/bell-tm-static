import {Component} from 'angular2/core';
import {Observable} from 'rxjs/Observable';

import {FromNowComponent} from '../../core/components';
import {TodoService} from '../todo.service';

@Component({
    selector: 'open-todo-list',
    template: require('./open-list.html'),
    directives: [FromNowComponent],
})
export class OpenTodoListComponent {
    todos: Observable<any[]>;

    constructor(private todoService: TodoService) {
        this.todos = this.todoService.loadList({is: 'open'});
    }
}
