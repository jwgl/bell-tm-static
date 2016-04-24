import {Component} from 'angular2/core';
import {ROUTER_DIRECTIVES, RouteConfig} from 'angular2/router';

import {OpenTodoListComponent} from './open-list.component';
import {ClosedTodoListComponent} from './closed-list.component';
import {TodoService} from '../todo.service';

@Component({
    selector: 'todo-list-container',
    template: require('./todo-list.html'),
    directives: [ROUTER_DIRECTIVES],
})
@RouteConfig([
    {path: '/open', component: OpenTodoListComponent, as: 'Open', useAsDefault: true},
    {path: '/closed', component: ClosedTodoListComponent, as: 'Closed'},
])
export class TodoListComponent {
    counts: { open: number, closed: number };
    openActive = {active: false};
    closedActive = {active: false};

    constructor(private todoService: TodoService) {
        this.todoService.loadCounts().subscribe(counts => this.counts = counts);
    }

    openPageActive(a: any) {
        this.openActive.active = a.classList.contains('router-link-active');
        return this.openActive;
    }

    closedPageActive(a: any) {
        this.closedActive.active = a.classList.contains('router-link-active');
        return this.closedActive;
    }
}
