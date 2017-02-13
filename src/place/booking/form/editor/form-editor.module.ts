import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';

import {CommonDialogsModule} from 'core/common-dialogs';
import {CommonDirectivesModule} from 'core/common-directives';

import {BookingFindPlaceModule} from './find-place/find-place.module';
import {BookingFormEditorComponent} from './form-editor.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        CommonDirectivesModule,
        CommonDialogsModule,
        BookingFindPlaceModule,
    ],
    declarations: [
        BookingFormEditorComponent,
    ],
    exports: [
        BookingFormEditorComponent,
    ],
})
export class BookingFormEditorModule {}
