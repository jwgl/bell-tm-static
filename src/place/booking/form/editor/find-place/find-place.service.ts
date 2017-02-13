import {Injectable} from '@angular/core';

import {Dialog} from 'core/dialogs';

import {FindPlaceDialog} from './find-place.dialog';

@Injectable()
export class FindPlaceDialogService {
    constructor(private dialog: Dialog) {}

    open(options: any): Promise<any> {
        return this.dialog.open(FindPlaceDialog, options);
    }
}
