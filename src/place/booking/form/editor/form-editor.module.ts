import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {CommonDirectivesModule} from 'core/common-directives';
import {CommonDialogsModule} from 'core/common-dialogs';

import {BookingFormEditorComponent} from './form-editor.component';
import {BookingFindPlaceModule} from './find-place/find-place.module';

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
