import {Component} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

import {CommonDialog} from '../../../../core/dialogs';
import {Workflow} from '../../../../core/workflow';
import {toVersionString} from '../../../common/utils';
import {Scheme} from '../../common/scheme.model';
import '../../common/scheme-viewer.model';
import './draft-item.model';
import {SchemeDraftService} from '../draft.service';

/**
 * 所有者教学计划。
 */
@Component({
    selector: 'scheme-draft-item',
    template: require('./draft-item.html'),
})
export class SchemeDraftItemComponent {
    private id: string;
    private vm: Scheme;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private workflow: Workflow,
        private dialog: CommonDialog,
        private draftService: SchemeDraftService) {
        this.route.params.subscribe(params => {
            this.id = params['id'];
            this.loadData();
        });
    }

    loadData() {
        this.draftService.loadItem(this.id).subscribe(dto => {
            this.vm = new Scheme(dto);
            this.vm.normalize();
            this.vm.editable = dto.editable;
            this.vm.revisable = dto.revisable;
        });
    }

    edit() {
        this.router.navigate(['/', this.id, 'edit']);
    }

    remove() {
        this.dialog.confirm('删除', '确定要删除吗？').then(() => {
            this.draftService.delete(this.id).subscribe(() => {
                this.router.navigate(['/']);
            });
        });
    }

    commit() {
        let errors = this.vm.checkCredit();
        if (errors.length > 0) {
            this.dialog.error(errors);
        } else {
            this.workflow.commit({
                whoUrl: this.draftService.getCheckersUrl(this.id),
                does: '审核',
                what: `${this.vm.title}（${toVersionString(this.vm.versionNumber)}）`,
            }).then(result => {
                this.draftService.commit(this.id, result.what, result.to, result.comment).subscribe(() => {
                    this.loadData();
                });
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
}
