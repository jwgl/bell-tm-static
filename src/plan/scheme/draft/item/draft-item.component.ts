import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {CommonDialog} from 'core/common-dialogs';
import {SubmitOptions} from 'core/workflow';

import {toVersionString} from '../../../common/utils';
import {Scheme} from '../../common/scheme.model';
import '../../common/scheme.model';
import {SchemeDraftService} from '../draft.service';
import './draft-item.model';

/**
 * 所有者教学计划。
 */
@Component({
    templateUrl: 'draft-item.component.html',
})
export class SchemeDraftItemComponent {
    vm: Scheme;
    showDiff = false;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private dialog: CommonDialog,
        private service: SchemeDraftService) {
        this.route.params.subscribe(params => {
            this.loadData(params['id']);
        });
    }

    loadData(id: string) {
        this.service.loadItem(id).subscribe(dto => {
            this.vm = new Scheme(dto);
            this.vm.editable = dto.editable;
            this.vm.revisable = dto.revisable;
        });
    }

    edit() {
        this.router.navigate(['/', this.vm.id, 'edit']);
    }

    remove() {
        this.dialog.confirm('删除', '确定要删除吗？').then(() => {
            this.service.delete(this.vm.id).subscribe(() => {
                this.router.navigate(['/']);
            });
        });
    }

    revise() {
        this.router.navigate(['/', this.vm.id, 'revise']);
    }

    returnList() {
        this.router.navigate(['/']);
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

    get submitOptions(): SubmitOptions {
        return {
            id: this.vm.id,
            type: 'check',
            what: this.title,
            validate: this.vm.checkCredit.bind(this.vm),
        };
    }
}
