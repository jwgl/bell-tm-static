import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ObserverGroupPipe } from './observer-group';
import { TypeTextPipe } from './observer-type';
import { PagerPipe } from './pager';
import { StatusTextPipe } from './status';
import { TermTextPipe } from './term';

@NgModule({
    imports: [
        CommonModule,
    ],
    declarations: [
        ObserverGroupPipe,
        TypeTextPipe,
        PagerPipe,
        StatusTextPipe,
        TermTextPipe,
    ],
    exports: [
        ObserverGroupPipe,
        TypeTextPipe,
        PagerPipe,
        StatusTextPipe,
        TermTextPipe,
    ],
})
export class PipesModule {}
