import {Component} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

import {CommonDialog} from 'core/common-dialogs';
import {Workflow} from 'core/workflow';

import {BookingFormService} from '../form.service';
import {BookingForm} from '../../common/form.model';
import './form-item.model';

@Component({
    selector: 'booking-form-item',
    templateUrl: 'form-item.component.html',
})
export class BookingFormItemComponent {
    form: BookingForm;
    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private workflow: Workflow,
        private dialog: CommonDialog,
        private service: BookingFormService) {
        this.route.params.subscribe(params => {
            this.loadData(parseInt(params['id'], 10));
        });
    }

    loadData(id: number) {
        this.service.loadItem(id).subscribe(dto => {
            this.form = new BookingForm(dto);
            this.form.editable = dto.editable;
        });
    }

    edit() {
        this.router.navigate(['/', this.form.id, 'edit']);
    }

    remove() {
        this.dialog.confirm('删除', '确定要删除吗？').then(() => {
            this.service.delete(this.form.id).subscribe(() => {
                this.router.navigate(['/']);
            });
        });
    }

    commit() {
        this.workflow.commit(this.form.id, this.form.title).then(() => {
            this.loadData(this.form.id);
        }, (error) => {
            alert(error.json().message);
        });
    }

    returnList() {
        this.router.navigate(['/']);
    }

    showWorkitems() {
        this.workflow.workitems(this.form.workflowInstanceId);
    }
}
