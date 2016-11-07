import {Component} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

import {CommonDialog} from 'core/common-dialogs';
import {Workflow} from 'core/workflow';

import {toVersionString} from '../../../common/utils';
import {Scheme} from '../../common/scheme.model';
import '../../common/scheme.model';
import './draft-item.model';
import {SchemeDraftService} from '../draft.service';

/**
 * 所有者教学计划。
 */
@Component({
    selector: 'scheme-draft-item',
    templateUrl: 'draft-item.component.html',
})
export class SchemeDraftItemComponent {
    private id: string;
    private vm: Scheme;
    private showDiff = false;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private workflow: Workflow,
        private dialog: CommonDialog,
        private service: SchemeDraftService) {
        this.route.params.subscribe(params => {
            this.id = params['id'];
            this.loadData();
        });
    }

    loadData() {
        this.service.loadItem(this.id).subscribe(dto => {
            this.vm = new Scheme(dto);
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

    submit() {
        let errors = this.vm.checkCredit();
        if (errors.length > 0) {
            this.dialog.error(errors);
        } else {
            this.workflow.submit(this.id, this.title).then(() => {
                this.loadData();
            }, (error) => {
                alert(error.json().message);
            });
        }
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

    toggleShowDiff(): void {
        this.showDiff = !this.showDiff;
    }

    get showDiffLabel(): string {
        return this.showDiff ? '隐藏变更' : '显示变更';
    }
}
