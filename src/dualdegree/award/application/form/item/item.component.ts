import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import * as _ from 'lodash';

import {Dialog} from 'core/dialogs';
import {NextOptions, SubmitOptions} from 'core/workflow';

import {AwardForm} from '../../../shared/form.model';
import {ApplicationForm, FileTypes} from '../../shared/form.model';
import {ApplicationFormService} from '../form.service';
import {PaperFormService} from '../paper-form.service';
import {PaperFormDialog} from '../paper/paper-form.dialog';

@Component({
    selector: 'application-item',
    templateUrl: 'item.component.html',
})
export class ApplicationItemComponent {
    vm: ApplicationForm;
    fileNames: any;
    award: AwardForm;
    pending: boolean;
    paperForm: any;

    constructor(
        private route: ActivatedRoute,
        private service: ApplicationFormService,
        private paperFormService: PaperFormService,
        private dialog: Dialog,
    ) {
        const params = this.route.snapshot.params;
        this.loadData(params['id']);
    }

    loadData(id: number) {
        this.service.loadItem(id).subscribe(dto => {
            this.vm = new ApplicationForm(dto.form);
            this.fileNames = dto.fileNames;
            this.award = new AwardForm(dto.award);
            this.paperForm = dto.paperForm;
        });
    }

    get submitOptions(): SubmitOptions {
        return {
            id: this.vm.id,
            type: 'check',
            what: this.vm.title,
        };
    }

    get editAble(): boolean {
        return this.vm.status === 'CREATED' || this.vm.status === 'REJECTED';
    }

    get paperAble(): boolean {
        return this.vm.status === 'STEP2' || this.vm.status === 'STEP5';
    }

    get nextAble(): boolean {
        return this.paperForm || this.pending;
    }

    get uploadUrl(): string {
        return this.service.getUploadUrl({awardId: this.vm.awardId});
    }

    uploadPaper() {
        const uploadUrl = this.uploadUrl;
        const xsrfToken = this.service.xsrfToken;
        const fileType = FileTypes.filter(file => file.prefix === 'paper')[0];
        this.paperFormService.loadPaperForm(this.vm.id).subscribe(data => {
            const paper = data.form ? data.form : [];
            this.dialog.open(PaperFormDialog, {paper, uploadUrl, xsrfToken, fileType})
            .then(result => {
                this.paperFormService.createPaperForm(this.vm.id, result).subscribe(() => {
                    this.loadData(this.vm.id);
                    this.pending = true;
                });
            });
        });
    }

    onItemLoaded(dto: any) {
        this.vm = new ApplicationForm(dto);
    }

    get nextOptions(): NextOptions {
        return {
            id: this.vm.id,
            type: 'process',
            what: this.vm.title,
        };
    }
}
