import {Component, OnInit} from 'angular2/core';
import {Router, RouteParams} from 'angular2/router';

import {
    Dialog,
    ConfirmDialog,
    WorkflowWorkitemsDialog,
    WorkflowCommitDialog,
} from '../../../../core/dialogs';
import {toVersionString} from '../../../common/utils';
import {SchemeViewerComponent} from '../../common/scheme-viewer.component';
import {Scheme} from '../../common/scheme.model';
import '../../common/scheme-viewer.model';
import './draft-item.model';
import {SchemeDraftService} from '../draft.service';

/**
 * 所有者教学计划。
 */
@Component({
    selector: 'scheme-draft-item',
    providers: [Dialog],
    template: require('./draft-item.html'),
    directives: [SchemeViewerComponent],
})
export class SchemeDraftItemComponent implements OnInit {
    private id: string;
    private vm: Scheme;
    private workitems: any[];

    constructor(
        private params: RouteParams,
        private router: Router,
        private dialog: Dialog,
        private draftService: SchemeDraftService
    ) {
        this.id = this.params.get('id');
    }

    ngOnInit() {
        this.draftService.loadItem(this.id).subscribe(dto => {
            this.vm = new Scheme(dto);
            this.vm.normalize();
            this.vm.editable = dto.editable;
            this.vm.revisable = dto.revisable;
            this.workitems = dto.workitems;
        });
    }

    edit() {
        this.router.navigate(['Edit', {id: this.id}]);
    }

    remove() {
        this.dialog.open(ConfirmDialog, {
            title: '删除',
            content: '确定要删除吗？',
        }).then(() => {
            this.draftService.delete(this.id).subscribe(() => {
                this.router.navigate(['Index']);
            });
        });
    }

    commit() {
        let what = `${this.vm.title}（${toVersionString(this.vm.versionNumber)}）`;
        this.dialog.open(WorkflowCommitDialog, {
            whoUrl: this.draftService.getCheckersUrl(this.id),
            does: '审核',
            what: what,
        }).then(result => {
            this.draftService.commit(this.id, what, result.to, result.comment).subscribe(() => {
                this.ngOnInit();
            });
        });
    }

    revise() {
        this.router.navigate(['Revise', {id: this.id}]);
    }

    returnList() {
        this.router.navigate(['Index']);
    }

    showWorkitems() {
        this.dialog.open(WorkflowWorkitemsDialog, {instance: this.vm.workflowInstanceId});
    }
}
