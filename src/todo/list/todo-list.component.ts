import {Component} from '@angular/core';
import {Location} from '@angular/common';
import {ROUTER_DIRECTIVES, Router} from '@angular/router';

import {TodoService} from '../todo.service';

@Component({
    selector: 'todo-list-container',
    template: require('./todo-list.html'),
    directives: [ROUTER_DIRECTIVES],
})
export class TodoListComponent {
    counts: { open: number, closed: number } = {open: 0, closed: 0};

    constructor(private router: Router, private location: Location, private todoService: TodoService) {
        this.todoService.loadCounts().subscribe(counts => this.counts = counts);
    }
}
