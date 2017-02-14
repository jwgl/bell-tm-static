import {Rollcall, RollcallForm, RollcallType, Student, ToggleResult} from '../form.model';
import {RollcallFormService} from '../form.service';
import {RollcallFormEditorComponent} from './form-editor.component';

export class BaseRollcallView {
    constructor(private editor: RollcallFormEditorComponent) {}

    get rollcallForm() {
        return this.editor.rollcallForm;
    }

    toggle(student: Student, type: RollcallType) {
        this.editor.toggle(student, type);
    }
}
