import {Component, ElementRef} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

import {Workflow} from 'core/workflow';

import {CardReissueForm} from '../../common/card-reissue-form.model';
import {ReissueAdminService} from '../admin.service';

/**
 * 补办学生证申请（管理员）。
 */
@Component({
    selector: 'reissue-form',
    templateUrl: 'admin-item.component.html',

})
export class ReissueAdminItemComponent {
    private id: string;
    private wi: string;

    private vm: CardReissueForm;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        elementRef: ElementRef,
        private service: ReissueAdminService,
        private workflow: Workflow,
    ) {
        this.route.params.subscribe(params => {
            this.id = params['id'];
            this.wi = params['wi'];
            this.loadData();
        });

    }

    loadData() {
        this.service.loadItem(this.id).subscribe(dto => {
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
        return this.vm.status === 'COMMITTED' && this.wi !== undefined;
    }

    showWorkitems() {
        this.workflow.workitems(this.vm.workflowInstanceId);
    }
}
