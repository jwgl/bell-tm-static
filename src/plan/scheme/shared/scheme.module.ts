import {NgModule} from '@angular/core';

import {AssessTypePipe} from './pipes/assess-type';
import {TermNamePipe} from './pipes/term-name';
import {TermTitlePipe} from './pipes/term-title';
import {ZeroEmptyPipe} from './pipes/zero-empty';

@NgModule({
    declarations: [
        AssessTypePipe,
        TermNamePipe,
        TermTitlePipe,
        ZeroEmptyPipe,
    ],
    exports: [
        AssessTypePipe,
        TermNamePipe,
        TermTitlePipe,
        ZeroEmptyPipe,
    ],
})
export class SchemeSharedModule {}
