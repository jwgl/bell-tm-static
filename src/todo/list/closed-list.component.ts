import {Component, Inject} from 'angular2/core';
import {Router, Location} from 'angular2/router';
import {Observable} from 'rxjs/Observable';

import {BASE_URL} from '../../core/http';
import {FromNowComponent} from '../../core/components';
import {TodoService} from '../todo.service';

@Component({
    selector: 'closed-todo-list',
    template: require('./closed-list.html'),
    directives: [FromNowComponent],
})
export class ClosedTodoListComponent {
    todos: Observable<any[]>;

    constructor(
        private todoService: TodoService,
        private router: Router,
        private location: Location,
        @Inject(BASE_URL) private baseUrl: String) {
        this.todos = this.todoService.loadList({is: 'closed'});
    }
}
