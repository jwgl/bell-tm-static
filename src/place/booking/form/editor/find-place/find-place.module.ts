import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';

import {CommonDirectivesModule} from 'core/common-directives';

import {FindPlaceDialog} from './find-place.dialog';
import {FindPlaceDialogService} from './find-place.service';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        CommonDirectivesModule,
    ],
    declarations: [
        FindPlaceDialog,
    ],
    providers: [
        FindPlaceDialogService,
    ],
    entryComponents: [
        FindPlaceDialog,
    ],
})
export class BookingFindPlaceModule {}
