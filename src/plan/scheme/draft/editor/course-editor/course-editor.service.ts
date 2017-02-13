import {Injectable} from '@angular/core';

import {Dialog} from 'core/dialogs';

import {CourseEditorDialog} from './course-editor.dialog';

@Injectable()
export class CourseEditorService {
    constructor(private dialog: Dialog) {}

    open(options: any): Promise<any> {
        return this.dialog.open(CourseEditorDialog, options);
    }
}
