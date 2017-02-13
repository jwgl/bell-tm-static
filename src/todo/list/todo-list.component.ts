import {Component, Inject} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {BASE_URL} from 'core/rest';

import {TodoService} from '../todo.service';

@Component({
    selector: 'todo-list',
    templateUrl: 'todo-list.component.html',
})
export class TodoListComponent {
    public readonly statuses: any[] = [
        {status: 'open',   label: '待处理', class: 'badge-success'},
        {status: 'closed', label: '已处理', class: 'badge-danger'},
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
        const match = window.location.href.match(/\/users\/([^\/]+)\//);
        this.baseUrl = this.baseUrl.replace('${userId}', match[1]);
        this.route.params.subscribe(params => {
            this.status = params['status'];
            this.loadData(0);
        });
    }

    private loadData(offset: number) {
        this.service.loadList({
            is: this.status,
            max: this.max,
            offset,
        }).subscribe(result => {
            this.counts = result.counts;
            this.todos = result.todos;
        });
    }
}
