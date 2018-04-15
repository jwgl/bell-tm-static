import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CommonDirectivesModule } from 'core/common-directives';

import { TeacherSelectComponent } from './my-teacher-select.component';

@NgModule({
    imports: [
        CommonModule,
        CommonDirectivesModule,
    ],
    declarations: [
        TeacherSelectComponent,
    ],
    exports: [
        TeacherSelectComponent,
    ],
})
export class MyTeacherModule {}
