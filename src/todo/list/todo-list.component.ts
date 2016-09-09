import {Component, Inject} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

import {BASE_URL} from 'core/rest';

import {TodoService} from '../todo.service';

@Component({
    selector: 'todo-list',
    template: require('./todo-list.html'),
})
export class TodoListComponent {
    statuses: any[] = [
        {status: 'open',   label: '待处理', class: 'tag-success'},
        {status: 'closed', label: '已处理', class: 'tag-danger'},
    ];

    private counts: {[key: string]: number};
    private todos: any[];
    private status = 'open';
    private max = 10;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private service: TodoService,
        @Inject(BASE_URL) private baseUrl: string,
    ) {
        this.route.params.subscribe(params => {
            this.status = params['status'];
            this.loadData(0);
        });
    }

    loadData(offset: number) {
        this.service.loadList({
            is: this.status,
            offset: offset,
            max: this.max,
        }).subscribe(result => {
            this.counts = result.counts;
            this.todos = result.todos;
        });
    }
}
