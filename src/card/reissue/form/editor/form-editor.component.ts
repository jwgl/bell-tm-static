import {Component} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

import {CommonDialog} from '../../../../core/common-dialogs';
import {EditMode} from '../../../../core/constants';

import {ReissueFormService} from '../form.service';

@Component({
    selector: 'reissue-form-editor',
    styles: [require('./form-editor.scss')],
    template: require('./form-editor.html'),
})
export class ReissueFormEditorComponent {
    private editMode: EditMode;
    private vm: any;
    private saving = false;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private dialog: CommonDialog,
        private service: ReissueFormService
    ) {
        this.editMode = this.route.snapshot.data['mode'];
        let params = this.route.snapshot.params;
        switch (this.editMode) {
            case EditMode.Create:
                this.service.loadDataForCreate(null).subscribe(dto => this.vm = dto);
                break;
            case EditMode.Revise:
                this.service.loadItemForRevise(params['id']).subscribe(model => this.vm = model);
                break;
            case EditMode.Edit:
                this.service.loadItemForEdit(params['id']).subscribe(model => this.vm = model);
                break;
        }
    }

    cancel() {
        switch (this.editMode) {
            case EditMode.Create:
                this.router.navigate(['/']);
                break;
            case EditMode.Edit:
                this.router.navigate(['/', this.vm.id]);
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
            reason: this.vm.reason,
        }).subscribe(id => {
            this.router.navigate(['/', id]);
        }, error => {
            this.saving = false;
            alert(error.json().message);
        });
    }

    update() {
        this.saving = true;
        this.service.update({
            id:     this.vm.id,
            reason: this.vm.reason,
        }).subscribe(id => {
            this.router.navigate(['/', id]);
        }, error => {
            this.saving = false;
            alert(error.json().message);
        });
    }
}
