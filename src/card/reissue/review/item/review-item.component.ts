import {Component, ElementRef} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {ReviewOptions} from 'core/workflow';

import {CardReissueForm} from '../../shared/reissue-form.model';
import {ReissueReviewService} from '../review.service';

/**
 * 审核补办学生证申请项。
 */
@Component({
    templateUrl: 'review-item.component.html',

})
export class ReissueReviewItemComponent {
    private id: string;
    private wi: string;

    private form: CardReissueForm;

    constructor(
        private route: ActivatedRoute,
        private service: ReissueReviewService,
    ) {
        this.route.params.subscribe(params => {
            this.id = params['id'];
            this.wi = params['wi'];
            this.service.loadItem(this.id, this.wi).subscribe(dto => this.onItemLoaded(dto));
        });
    }

    onItemLoaded(dto: any) {
        this.form = new CardReissueForm(dto);
        if (this.wi === undefined) {
            this.wi = dto.workitemId;
        }
    }

    get reviewable(): boolean {
        return this.wi && this.form.status === 'SUBMITTED';
    }

    get reviewOptions(): ReviewOptions {
        return {
            id: this.id,
            wi: this.wi,
            type: 'approve',
            what: this.form.title,
        };
    }
}
