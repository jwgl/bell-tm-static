import {Component, Inject} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

import {Dialog} from 'core/dialogs';
import {EditMode} from 'core/constants';

import {ReissueOrder} from '../common/reissue-order.model';
import {ReissueOrderService} from '../order.service';
import {ReissueFormSelectDialog} from './form-select.dialog';

@Component({
    selector: 'reissue-order-editor',
    styles: [require('./order-editor.scss')],
    template: require('./order-editor.html'),
})
export class ReissueOrderEditorComponent {
    private editMode: EditMode;
    private vm: ReissueOrder;
    private saving = false;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private dialog: Dialog,
        private service: ReissueOrderService,
        @Inject('REISSUE_FORM_WEB_URL')
        private reissueFormWebUrl: String,
    ) {
        this.editMode = this.route.snapshot.data['mode'];
        let params = this.route.snapshot.params;
        switch (this.editMode) {
            case EditMode.Create:
                this.vm = ReissueOrder.create();
                break;
            case EditMode.Edit:
                this.service.loadItemForEdit(params['id']).subscribe(dto => this.vm = ReissueOrder.fromDto(dto));
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
        this.service.create(this.vm.toServerDto()).subscribe(id => {
            this.router.navigate(['/', id]);
        }, error => {
            this.saving = false;
            alert(error.json().message);
        });
    }

    update() {
        this.saving = true;
        this.service.update(this.vm.id, this.vm.toServerDto()).subscribe(id => {
            this.router.navigate(['/', id]);
        }, error => {
            this.saving = false;
            alert(error.json().message);
        });
    }

    addItems() {
        this.dialog.open(ReissueFormSelectDialog, {order: this.vm}).then((results: any[])  => {
            results.forEach(item => this.vm.addItem(item));
            this.vm.items.forEach(item => console.log(JSON.stringify(item)));
        });
    }

    removeItem(formId: number) {
        this.vm.removeItem(formId);
    }
}
