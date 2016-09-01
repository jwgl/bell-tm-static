import {Component} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

import {CommonDialog} from '../../../../core/common-dialogs';
import {Workflow} from '../../../../core/workflow';
import {ReissueFormService} from '../form.service';

@Component({
    selector: 'reissue-form-item',
    template: require('./form-item.html'),
})
export class ReissueFormItemComponent {
    id: string;
    vm: any;
    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private workflow: Workflow,
        private dialog: CommonDialog,
        private service: ReissueFormService) {
        this.route.params.subscribe(params => {
            this.id = params['id'];
            this.loadData();
        });
    }

    loadData() {
        this.service.loadItem(this.id).subscribe(dto => {
            this.vm = dto;
        });
    }

    edit() {
        this.router.navigate(['/', this.id, 'edit']);
    }

    remove() {
        this.dialog.confirm('删除', '确定要删除吗？').then(() => {
            this.service.delete(this.id).subscribe(() => {
                this.router.navigate(['/']);
            });
        });
    }

    commit() {
        this.workflow.commit(this.id, '补办学生证申请').then(() => {
            this.loadData();
        }, (error) => {
            alert(error.json().message);
        });
    }

    returnList() {
        this.router.navigate(['/']);
    }

    showWorkitems() {
        this.workflow.workitems(this.vm.workflowInstanceId);
    }
}
