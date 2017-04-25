import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {ReviewOptions} from 'core/workflow';

import {toVersionString} from '../../shared/utils';
import {Scheme} from '../shared/scheme.model';

@Component({
    templateUrl: 'check-item.component.html',
})
export class SchemeCheckItemComponent {
    vm: Scheme;

    private wi: string;
    private prevId: number;
    private nextId: number;

    constructor(route: ActivatedRoute) {
        route.data.subscribe((data: {item: any}) => this.onItemLoaded(data.item));
    }

    onItemLoaded(dto: any) {
        this.vm = new Scheme(dto.scheme);
        this.wi = dto.workitemId;
        this.prevId = dto.prevId;
        this.nextId = dto.nextId;
    }

    get reviewable(): boolean {
        return this.wi && this.vm.status === 'SUBMITTED';
    }

    get reviewOptions(): ReviewOptions {
        return {
            id: this.vm.id,
            wi: this.wi,
            type: 'check',
            what: `${this.vm.title}（${toVersionString(this.vm.versionNumber)}）`,
        };
    }
}
