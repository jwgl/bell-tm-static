import {Component, Inject} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

import {CommonDialog} from 'core/common-dialogs';
import {EditMode} from 'core/constants';

import {Vision} from '../../common/vision.model';
import './draft-editor.model';
import {VisionDraftService} from '../draft.service';

@Component({
    selector: 'vision-draft-editor',
    styles: [require('./draft-editor.scss')],
    template: require('./draft-editor.html'),
})
export class VisionDraftEditorComponent {
    private editMode: EditMode;
    private vm: Vision;

    private _showSchoolingLength = false;
    private _showAwardedDegree = false;
    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private dialog: CommonDialog,
        private service: VisionDraftService,
        @Inject('DEPARTMENT_VISIONS_URL') private departmentVisionsUrl: string,
    ) {
        this.editMode = this.route.snapshot.data['mode'];
        let params = this.route.snapshot.params;
        switch (this.editMode) {
            case EditMode.Create:
                this.service.loadDataForCreate({program: params['program']}).subscribe(dto => this.vm = new Vision(dto));
                break;
            case EditMode.Revise:
                this.service.loadItemForRevise(params['id']).subscribe(dto => this.vm = new Vision(dto));
                break;
            case EditMode.Edit:
                this.service.loadItemForEdit(params['id']).subscribe(dto => this.vm = new Vision(dto));
                break;
        }
    }

    get showSchoolingLength(): boolean {
        return this._showSchoolingLength || this.vm && !!this.vm.schoolingLength;
    }

    get showAwardedDegree(): boolean {
        return this._showAwardedDegree || this.vm && !!this.vm.awardedDegree;
    }

    get canEditVersion(): boolean {
        return this.editMode === EditMode.Create || this.editMode === EditMode.Revise;
    }

    versionChanged(newValue: number) {
        this.vm.versionNumber = newValue;
    }

    cancel() {
        switch (this.editMode) {
            case EditMode.Create:
                this.router.navigate(['/']);
                break;
            case EditMode.Revise:
                this.router.navigate(['/', this.vm.previousId]);
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
            case EditMode.Revise:
                this.revise();
                break;
            case EditMode.Edit:
                this.update();
                break;
        }
    }

    create() {
        this.service.create(this.vm.toCreateDto()).subscribe(id => {
            this.router.navigate(['/', id]);
        }, error => {
            alert(error);
        });
    }

    revise() {
        this.service.revise(this.vm.toReviseDto()).subscribe(id => {
            this.router.navigate(['/', id]);
        }, error => {
            alert(error);
        });
    }

    update() {
        this.service.update(this.vm.id, this.vm.toUpdateDto()).subscribe(id => {
            this.router.navigate(['/', id]);
        }, error => {
            alert(error);
        });
    }

    import() {
        this.dialog.list(
            '选择导入的专业',
            this.departmentVisionsUrl.replace('${departmentId}', this.vm.departmentId),
            (item: any) => `${item.grade}级${item.subjectName}`
        ).then(id => {
            this.service.loadDataForImport(id).subscribe(vision => {
               this.vm.objective = vision.objective;
               this.vm.specification = vision.specification;
               this.vm.schoolingLength = vision.schoolingLength;
               this.vm.awardedDegree = vision.awardedDegree;
            });
        });
    }
}
