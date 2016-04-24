import {Component, Inject} from 'angular2/core';
import {Router, Location} from 'angular2/router';
import {Observable} from 'rxjs/Observable';

import {BASE_URL} from '../../core/http';
import {FromNowComponent} from '../../core/components';
import {TodoService} from '../todo.service';

@Component({
    selector: 'open-todo-list',
    template: require('./open-list.html'),
    directives: [FromNowComponent],
})
export class OpenTodoListComponent {
    todos: Observable<any[]>;

    constructor(
        private todoService: TodoService,
        private router: Router,
        private location: Location,
        @Inject(BASE_URL) private baseUrl: String) {
        this.todos = this.todoService.loadList({is: 'open'});
    }
}
