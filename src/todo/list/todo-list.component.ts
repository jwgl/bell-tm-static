import {Component} from '@angular/core';
import {TodoService} from '../todo.service';

@Component({
    selector: 'todo-list-container',
    template: require('./todo-list.html'),
})
export class TodoListComponent {
    counts: { open: number, closed: number } = {open: 0, closed: 0};

    constructor(private todoService: TodoService) {
        this.todoService.loadCounts().subscribe(counts => this.counts = counts);
    }
}
