import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {CommonDialog} from 'core/common-dialogs';
import {EditMode} from 'core/constants';

import {ReissueFormService} from '../form.service';

@Component({
    selector: 'reissue-form-editor',
    styleUrls: ['form-editor.component.scss'],
    templateUrl: 'form-editor.component.html',
})
export class ReissueFormEditorComponent {
    private editMode: EditMode;
    private form: any;
    private student: any;
    private saving = false;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private dialog: CommonDialog,
        private service: ReissueFormService,
    ) {
        this.editMode = this.route.snapshot.data['mode'];
        const params = this.route.snapshot.params;
        switch (this.editMode) {
            case EditMode.Create:
                this.service.loadDataForCreate().subscribe(dto => this.onLoadData(dto));
                break;
            case EditMode.Edit:
                this.service.loadItemForEdit(params['id']).subscribe(dto => this.onLoadData(dto));
                break;
        }
    }

    onLoadData(dto: any) {
        this.form = dto.form;
        this.student = dto.student;
    }

    cancel() {
        switch (this.editMode) {
            case EditMode.Create:
                this.router.navigate(['/']);
                break;
            case EditMode.Edit:
                this.router.navigate(['/', this.form.id]);
                break;
        }
    }

    save() {
        switch (this.editMode) {
            case EditMode.Create:
                this.create();
                break;
            case EditMode.Edit:
                this.update();
                break;
        }
    }

    create() {
        this.saving = true;
        this.service.create({
            reason: this.form.reason,
        }).subscribe(id => {
            this.router.navigate(['/', id]);
        }, error => {
            this.saving = false;
            alert(error.json().message);
        });
    }

    update() {
        this.saving = true;
        this.service.update(this.form.id, {
            reason: this.form.reason,
        }).subscribe(id => {
            this.router.navigate(['/', id]);
        }, error => {
            this.saving = false;
            alert(error.json().message);
        });
    }
}
