import {RollcallFormEditorComponent} from './form-editor.component';
import {RollcallFormService} from '../form.service';
import {
    RollcallForm,
    RollcallItem,
    Student,
    ToggleResult,
} from '../form.model';

export class BaseRollcallView {
    constructor(private editor: RollcallFormEditorComponent) {}

    get rollcallForm() {
        return this.editor.rollcallForm;
    }

    toggle(student: Student, type: string) {
        this.editor.toggle(student, type);
    }
}
