import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {CommonDialog} from 'core/common-dialogs';
import {SubmitOptions} from 'core/workflow';

import {toVersionString} from '../../../shared/utils';
import {Scheme} from '../../shared/scheme.model';
import {SchemeDraftService} from '../draft.service';

import './draft-item.model';

/**
 * 所有者教学计划。
 */
@Component({
    templateUrl: 'draft-item.component.html',
})
export class SchemeDraftItemComponent implements OnInit {
    vm: Scheme;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private dialog: CommonDialog,
        private service: SchemeDraftService,
    ) {}

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.service.loadItem(params['id']).subscribe(dto => {
                this.vm = new Scheme(dto);
                this.vm.editable = dto.editable;
                this.vm.revisable = dto.revisable;
            });
        });
    }

    remove() {
        this.dialog.confirm('删除', '确定要删除吗？').then(() => {
            this.service.delete(this.vm.id).subscribe(() => {
                this.router.navigate(['/']);
            });
        });
    }

    get title(): string {
        return `${this.vm.title}（${toVersionString(this.vm.versionNumber)}）`;
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
