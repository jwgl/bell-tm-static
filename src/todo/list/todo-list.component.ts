import {Component} from '@angular/core';
import {ROUTER_DIRECTIVES, Router, Routes, Route} from '@angular/router';

import {OpenTodoListComponent} from './open-list.component';
import {ClosedTodoListComponent} from './closed-list.component';
import {TodoService} from '../todo.service';

@Component({
    selector: 'todo-list-container',
    template: require('./todo-list.html'),
    directives: [ROUTER_DIRECTIVES],
})
@Routes([
    new Route({path: 'open', component: OpenTodoListComponent}),
    new Route({path: 'closed', component: ClosedTodoListComponent}),
])
export class TodoListComponent {
    counts: { open: number, closed: number };
    openActive = {active: false};
    closedActive = {active: false};

    constructor(private router: Router, private todoService: TodoService) {
        this.todoService.loadCounts().subscribe(counts => this.counts = counts);
        this.router.navigate(['/open']);
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
