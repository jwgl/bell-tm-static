import {Component} from 'angular2/core';
import {Observable} from 'rxjs/Observable';

import {FromNowComponent} from '../../core/components';
import {TodoService} from '../todo.service';

@Component({
    selector: 'closed-todo-list',
    template: require('./closed-list.html'),
    directives: [FromNowComponent],
})
export class ClosedTodoListComponent {
    todos: Observable<any[]>;

    constructor(private todoService: TodoService) {
        this.todos = this.todoService.loadList({is: 'closed'});
    }
}
