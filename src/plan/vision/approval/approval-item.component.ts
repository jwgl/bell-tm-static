import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {ReviewOptions, RevokeOptions} from 'core/workflow';

import {toVersionString} from '../../shared/utils';
import {Vision} from '../shared/vision.model';

@Component({
    templateUrl: 'approval-item.component.html',
})
export class VisionApprovalItemComponent {
    vm: Vision;

    private wi: string;
    private prevId: number;
    private nextId: number;

    constructor(route: ActivatedRoute) {
        route.data.subscribe((data: {item: any}) => this.onItemLoaded(data.item));
    }

    onItemLoaded(dto: any) {
        this.vm = new Vision(dto.vision);
        this.wi = dto.workitemId;
        this.prevId = dto.prevId;
        this.nextId = dto.nextId;
    }

    get reviewable(): boolean {
        return this.wi && this.vm.status === 'CHECKED';
    }

    get reviewOptions(): ReviewOptions {
        return {
            id: this.vm.id,
            wi: this.wi,
            type: 'approve',
            what: `${this.vm.title}（${toVersionString(this.vm.versionNumber)}）`,
        };
    }
}
