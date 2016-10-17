import {Component} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

import {CommonDialog} from 'core/common-dialogs';
import {Workflow} from 'core/workflow';

import {toVersionString} from '../../../common/utils';
import {Vision} from '../../common/vision.model';
import './draft-item.model';
import {VisionDraftService} from '../draft.service';

/**
 * 所有者培养方案。
 */
@Component({
    selector: 'vision-draft-item',
    templateUrl: 'draft-item.component.html',
})
export class VisionDraftItemComponent {
    id: string;
    vm: Vision;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private workflow: Workflow,
        private dialog: CommonDialog,
        private service: VisionDraftService) {
        this.route.params.subscribe(params => {
            this.id = params['id'];
            this.loadData();
        });
    }

    loadData() {
        this.service.loadItem(this.id).subscribe(dto => {
            this.vm = new Vision(dto);
            this.vm.editable = dto.editable;
            this.vm.revisable = dto.revisable;
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
        this.workflow.commit(this.id, this.title).then(() => {
            this.loadData();
        }, (error) => {
            alert(error.json().message);
        });
    }

    revise() {
        this.router.navigate(['/', this.id, 'revise']);
    }

    returnList() {
        this.router.navigate(['/']);
    }

    showWorkitems() {
        this.workflow.workitems(this.vm.workflowInstanceId);
    }

    get title(): string {
        return `${this.vm.title}（${toVersionString(this.vm.versionNumber)}）`;
    }
}
