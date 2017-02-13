import {Component, ElementRef} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {Workflow} from 'core/workflow';

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

    private vm: CardReissueForm;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        elementRef: ElementRef,
        private service: ReissueReviewService,
        private workflow: Workflow,
    ) {
        this.route.params.subscribe(params => {
            this.id = params['id'];
            this.wi = params['wi'];
            this.loadData();
        });

    }

    loadData() {
        this.service.loadItem(this.id, this.wi).subscribe(dto => {
            this.vm = new CardReissueForm(dto);
            if (this.wi === undefined) {
                this.wi = dto.workitemId;
            }
        });
    }

    accept() {
        this.workflow.accept(this.id, this.wi, 'approve', this.vm.title).then(() => {
            this.loadData();
        }, (error) => {
            alert(error.json().message);
        });
    }

    reject(title: string) {
        this.workflow.reject(this.vm.id, this.wi, 'approve', this.vm.title).then(() => {
            this.loadData();
        }, (error) => {
            alert(error.json().message);
        });
    }

    get reviewable(): boolean {
        return this.vm.status === 'SUBMITTED' && this.wi !== undefined;
    }

    showWorkitems() {
        this.workflow.workitems(this.vm.workflowInstanceId);
    }
}
