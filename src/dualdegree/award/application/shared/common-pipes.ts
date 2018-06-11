import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DualdegreeStatusPipe } from './pipes/audit-status';
import { TypeTextPipe } from './pipes/paper-type';

@NgModule({
    imports: [
        CommonModule,
    ],
    declarations: [
        DualdegreeStatusPipe,
        TypeTextPipe,
    ],
    exports: [
        DualdegreeStatusPipe,
        TypeTextPipe,
    ],
})
export class PipesModule {}
