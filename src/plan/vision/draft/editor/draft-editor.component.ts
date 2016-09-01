import {Component} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

import {CommonDialog} from '../../../../core/common-dialogs';
import {EditMode} from '../../../../core/constants';

import {Vision} from '../../common/vision.model';
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
        private draftService: VisionDraftService
    ) {
        this.editMode = this.route.snapshot.data['mode'];
        let params = this.route.snapshot.params;
        switch (this.editMode) {
            case EditMode.Create:
                this.draftService.loadDataForCreate(params['program']).subscribe(model => this.vm = model);
                break;
            case EditMode.Revise:
                this.draftService.loadItemForRevise(params['id']).subscribe(model => this.vm = model);
                break;
            case EditMode.Edit:
                this.draftService.loadItemForEdit(params['id']).subscribe(model => this.vm = model);
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
        this.draftService.create({
            objective:       this.vm.objective,
            specification:   this.vm.specification,
            schoolingLength: this.vm.schoolingLength,
            awardedDegree:   this.vm.awardedDegree,
            programId:       this.vm.programId,
            versionNumber:   this.vm.versionNumber,
        }).subscribe(id => {
            this.router.navigate(['/', id]);
        }, error => {
            alert(error);
        });
    }

    revise() {
        this.draftService.revise({
            previousId:      this.vm.previousId,
            objective:       this.vm.objective,
            specification:   this.vm.specification,
            schoolingLength: this.vm.schoolingLength,
            awardedDegree:   this.vm.awardedDegree,
            programId:       this.vm.programId,
            versionNumber:   this.vm.versionNumber,
        }).subscribe(id => {
            this.router.navigate(['/', id]);
        }, error => {
            alert(error);
        });
    }

    update() {
        this.draftService.update({
            id:              this.vm.id,
            objective:       this.vm.objective,
            specification:   this.vm.specification,
            schoolingLength: this.vm.schoolingLength,
            awardedDegree:   this.vm.awardedDegree,
            programId:       this.vm.programId,
        }).subscribe(id => {
            this.router.navigate(['/', id]);
        }, error => {
            alert(error);
        });
    }

    import() {
        this.dialog.list(
            '选择导入的专业',
            `/api/departments/${this.vm.departmentId}/visions`,
            (item: any) => `${item.grade}级${item.subjectName}`
        ).then(id => {
            this.draftService.loadDataForImport(id).subscribe(vision => {
               this.vm.objective = vision.objective;
               this.vm.specification = vision.specification;
               this.vm.schoolingLength = vision.schoolingLength;
               this.vm.awardedDegree = vision.awardedDegree;
            });
        });
    }
}
