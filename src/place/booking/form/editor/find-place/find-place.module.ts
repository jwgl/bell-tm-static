import {NgModule, Injectable} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {CommonDirectivesModule} from 'core/common-directives';
import {Dialog} from 'core/dialogs';

import {FindPlaceDialog} from './find-place.dialog';

@Injectable()
export class FindPlaceDialogService {
    constructor(private dialog: Dialog) {}

    open(options: any): Promise<any> {
        return this.dialog.open(FindPlaceDialog, options);
    }
}

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
