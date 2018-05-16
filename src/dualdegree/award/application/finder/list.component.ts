import {Component} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';

import {ApiUrl} from 'core/rest';

import {FinderService} from './finder.service';

@Component({
    selector: 'application-list',
    templateUrl: 'list.component.html',
})
export class FinderListComponent {
    list: any[];
    query: string;

    constructor(private service: FinderService) { }

    find() {
        this.service.loadList({q: this.query}).subscribe(dto => this.list = dto);
    }
}
