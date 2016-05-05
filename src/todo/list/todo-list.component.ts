import {Component} from '@angular/core';
import {Location} from '@angular/common';
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
    counts: { open: number, closed: number } = {open: 0, closed: 0};

    constructor(private router: Router, private location: Location, private todoService: TodoService) {
        this.todoService.loadCounts().subscribe(counts => this.counts = counts);
        if (location.path() === '') {
            this.router.navigate(['/open']);
        }
    }

    get openPageActive() {
        return this.location.path() === '/open';
    }

    get closedPageActive() {
        return this.location.path() === '/closed';
    }
}
