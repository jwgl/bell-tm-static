import {Rollcall, RollcallForm, Student, ToggleResult} from '../form.model';
import {RollcallFormService} from '../form.service';
import {RollcallFormEditorComponent} from './form-editor.component';

export class BaseRollcallView {
    constructor(private editor: RollcallFormEditorComponent) {}

    get rollcallForm() {
        return this.editor.rollcallForm;
    }

    toggle(student: Student, type: string) {
        this.editor.toggle(student, type);
    }
}
