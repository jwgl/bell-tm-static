import {RollcallFormEditorComponent} from './form-editor.component';

import {
    RollcallForm,
    RollcallItem,
    Student,
    RollcallType,
    RollcallTypes,
    RollcallKeys,
    ToggleResult,
} from '../form.model';

export class BaseRollcallView {
    editor: RollcallFormEditorComponent;
    types: string[];
    constructor(editor: RollcallFormEditorComponent) {
        this.editor = editor;
        this.types = Object.keys(RollcallTypes);
    }

    get rollcallForm() {
        return this.editor.rollcallForm;
    }

    toggle(student: Student, type: string) {
        let result: ToggleResult = student.toggle(type);
        switch (result.op) {
            case 'insert':
                student.rollcallItem = new RollcallItem({id: 1, type: result.type});
                break;
            case 'update':
                student.rollcallItem.type = result.type;
                break;
            case 'delete':
                student.rollcallItem = null;
                break;
        }
    }

    typeKeys(student: Student): string[] {
        return student.rollcallItem ? RollcallKeys.filter(key => RollcallType.contains(student.rollcallType, key)) : [];
    }

    label(key: string): string {
        return RollcallTypes[key].label;
    }
}
