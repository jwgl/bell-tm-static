import {Component, ElementRef} from '@angular/core';

import {ApiUrl, Rest} from 'core/rest';
import {ReviewOptions} from 'core/workflow';

import {toVersionString} from '../../common/utils';
import {Scheme} from '../common/scheme.model';
import '../common/scheme.model';
import './review.model';

@Component({
    selector: 'scheme-review',
    templateUrl: 'review.component.html',
})
export class SchemeReviewComponent {
    id: string;
    wi: string;
    vm: Scheme;

    constructor(
        elementRef: ElementRef,
        private rest: Rest,
        public api: ApiUrl) {
        this.id = elementRef.nativeElement.getAttribute('id');
        this.wi = elementRef.nativeElement.getAttribute('wi');
        this.loadData();
    }

    loadData() {
        this.rest.get(this.api.workitem(this.id, this.wi)).subscribe(item => {
            this.vm = new Scheme(item);
            this.vm.activity = item.activity;
        });
    }

    get reviewable(): boolean {
        return (this.vm.status === 'SUBMITTED' && this.vm.activity === 'check')
            || (this.vm.status === 'CHECKED' && this.vm.activity === 'approve');
    }

    get title(): string {
        return `${this.vm.title}（${toVersionString(this.vm.versionNumber)}）`;
    }

    get reviewOptions(): ReviewOptions {
        return {
            id: this.id,
            wi: this.wi,
            type: this.vm.activity,
            what: this.vm.title,
        };
    }
}
