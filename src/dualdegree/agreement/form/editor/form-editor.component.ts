import {Location} from '@angular/common';
import {Component} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';

import * as _ from 'lodash';

import {CommonDialog} from 'core/common-dialogs';
import {EditMode} from 'core/constants';
import {Dialog} from 'core/dialogs';

import {AgreementForm, AgreementItem} from '../../shared/form.model';
import {AgreementFormService} from '../form.service';
import './form-editor.model';
import {MajorDialog} from './major-item/major.dialog';

@Component({
    selector: 'agreement-form-editor',
    templateUrl: 'form-editor.component.html',
})
export class AgreementFormEditorComponent {
    editMode: EditMode;
    form: AgreementForm;
    regions: any[];
    majors: any[];

    constructor(
        private service: AgreementFormService,
        private route: ActivatedRoute,
        private router: Router,
        private location: Location,
        private dialogs: CommonDialog,
        private dialog: Dialog,
    ) {
        this.editMode = this.route.snapshot.data['mode'];
        const params = this.route.snapshot.params;
        this.service.loadDataForCreate().subscribe(dto => this.onLoadData(dto));
        if (this.editMode === EditMode.Edit) {
            this.service.loadItemForEdit(params['id']).subscribe(dto => this.onLoadData(dto));
        }
    }

    onLoadData(dto: any) {
        this.form = new AgreementForm(dto.form);
        this.form.removedItems = [];
        this.regions = dto.regions;
        this.majors = dto.majors;
    }

    goBack(): void {
        this.location.back();
    }

    isEmpty(option: any): boolean {
        return _.isUndefined(option) || _.isNull(option);
    }

    validate(): string[] {
        const validate: string[] = [];
        if (this.isEmpty(this.form.agreementName) ||
            this.isEmpty(this.form.universityEn) ||
            this.isEmpty(this.form.regionId) ||
            this.isEmpty(this.form.universityCn)) {
                validate.push('请检查协议名称、国外大学（中）、国外大学（英）、项目等是否为空');
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
            this.router.navigate(['/']);
        });
    }

    update() {
        this.service.update(this.form.id, this.form.toServerDto()).subscribe(id => {
            this.router.navigate(['/']);
        });
    }

    addItem() {
        const its = this.form.items.map(item => item.id);
        this.dialog.open(MajorDialog, {majors: this.majors, items: its}).then(result => {
            const item = new AgreementItem(this.form, result);
            this.form.addItem(item);
        });
    }
}
