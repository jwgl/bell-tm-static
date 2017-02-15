import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {Workflow} from 'core/workflow';

import {BookingForm} from '../../shared/form.model';
import {BookingApprovalService} from '../approval.service';

/**
 * 审批补办学生证申请项。
 */
@Component({
    templateUrl: 'approval-item.component.html',

})
export class BookingApprovalItemComponent {
    form: BookingForm;

    private id: string;
    private wi: string;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private service: BookingApprovalService,
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
            this.form = new BookingForm(dto);
            if (this.wi === undefined) {
                this.wi = dto.workitemId;
            }
        });
    }

    accept() {
        this.workflow.accept(this.id, this.wi, 'approve', this.form.title).then(() => {
            this.loadData();
        }, (error) => {
            alert(error.json().message);
        });
    }

    reject(title: string) {
        this.workflow.reject(this.form.id, this.wi, 'approve', this.form.title).then(() => {
            this.loadData();
        }, (error) => {
            alert(error.json().message);
        });
    }

    revoke() {
        this.workflow.revoke(this.form.id, this.form.title).then(() => {
            this.loadData();
        }, (error) => {
            alert(error.json().message);
        });
    }

    showWorkitems() {
        this.workflow.workitems(this.form.workflowInstanceId);
    }
}
