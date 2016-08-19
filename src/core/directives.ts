import {NgModule} from '@angular/core';

export {Select2} from './directives/select2';
export {Markdown} from './directives/markdown';
export {Spinning} from './directives/spinning';

import {
    ModalDialogDirective,
    ModalCancelButtonDirective,
    ModalOkButtonDirective,
} from './directives/modal-dialog.directive';

export const MODAL_DIRECTIVES: any[] = [
    ModalDialogDirective,
    ModalCancelButtonDirective,
    ModalOkButtonDirective,
];

@NgModule({
    declarations: [MODAL_DIRECTIVES],
    exports: [MODAL_DIRECTIVES],
})
export class ModalDirectivesModule {}
