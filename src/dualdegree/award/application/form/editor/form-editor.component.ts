import {Location} from '@angular/common';
import {Component} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';

import * as _ from 'lodash';

import {CommonDialog} from 'core/common-dialogs';
import {EditMode} from 'core/constants';
import {Dialog} from 'core/dialogs';

import {ApplicationForm} from '../../shared/form.model';

import {ApplicationFormService} from '../form.service';

import {UploaderDialog} from './uploader.dialog';

import './form-editor.model';

@Component({
    selector: 'application-form-editor',
    styleUrls: ['form-editor.component.scss'],
    templateUrl: 'form-editor.component.html',
})
export class ApplicationFormEditorComponent {
    editMode: EditMode;
    form: ApplicationForm;
    universities: any[];
    fileNames: any;
    awardId: number;
    xsrfToken: string;
    formId: number;

    constructor(
        private service: ApplicationFormService,
        private route: ActivatedRoute,
        private router: Router,
        private location: Location,
        private dialogs: CommonDialog,
        private dialog: Dialog,
    ) {
        this.xsrfToken = this.service.xsrfToken;
        const params = this.route.snapshot.params;
        this.editMode = this.route.snapshot.data['mode'];
        this.awardId = params['awardId'];
        this.formId = params['id'];
        this.refresh();
    }
    refresh() {
        switch (this.editMode) {
            case EditMode.Create:
                this.service.loadDataForCreate({awardId: this.awardId})
                    .subscribe(dto => this.onLoadData(dto));
                break;
            case EditMode.Edit:
                this.service.loadItemForEdit(this.formId)
                    .subscribe(dto => this.onLoadData(dto));
                break;
        }
    }

    onLoadData(dto: any) {
        this.fileNames = dto.fileNames;
        this.form = new ApplicationForm(dto.form);
        this.universities = dto.universities;
        if (!this.form.universityCooperative && this.universities.length) {
            this.form.universityCooperative = this.universities[0].universityEn;
        }
        // 确保有值且一致
        if (this.form.awardId) {
            this.awardId = this.form.awardId;
        } else {
            this.form.awardId = this.awardId;
        }
    }

    imgSrc(filename: string): string {
        return `/web/dualdegree/picture?awardId=${this.awardId}&studentId=${this.form.studentId}&fileName=${filename ? filename : ''}`;
    }

    isEmpty(option: any): boolean {
        return _.isUndefined(option) || _.isNull(option);
    }

    validate(): string[] {
        const validate: string[] = [];
        if (this.isEmpty(this.form.universityCooperative) ||
            this.isEmpty(this.form.majorCooperative) ||
            this.isEmpty(this.form.email) ||
            this.isEmpty(this.form.linkman) ||
            this.isEmpty(this.form.phone)) {
                validate.push('请检查合作大学、国外专业、Email、联系人、联系人电话等是否为空');
        }
        return validate;
    }

    save() {
        const validate = this.validate();
        if (validate.length) {
            this.dialogs.error(validate);
        } else {
            if (this.editMode === EditMode.Create) {
                this.create();
            } else if (this.editMode === EditMode.Edit) {
                this.update();
            }
        }
    }

    create() {
        this.service.create(this.form.toServerDto()).subscribe(id => {
            this.router.navigate(['/', id]);
        });
    }

    update() {
        this.service.update(this.form.id, this.form.toServerDto()).subscribe(id => {
            this.router.navigate(['/', id]);
        });
    }

    url(filename: string): string {
        return `/web/dualdegree/picture/fileview?awardId=${this.awardId}&fileName=${filename ? filename : ''}`;
    }

    open(filename: string) {
        if (!filename) {
            return;
        }
        window.open(this.url(filename), '文件浏览',
        'fullscreen=1, toolbar=0, menubar=0, location=0, status=0, scrollbars=1, resizable=0');
    }

    get uploadUrl(): string {
        return this.service.getUploadUrl({awardId: this.awardId});
    }

    upload(prefix: string) {
        this.fileNames[prefix] = undefined;
        const uploadUrl = this.uploadUrl;
        const xsrfToken = this.service.xsrfToken;
        this.dialog.open(UploaderDialog, {prefix, uploadUrl, xsrfToken})
        .then(() => {
            this.refresh();
        });
    }
}
