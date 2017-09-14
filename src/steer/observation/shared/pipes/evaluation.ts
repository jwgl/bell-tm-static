import { Pipe } from '@angular/core';

import { GradeMap } from '../../form/shared/form.model';

@Pipe({ name: 'evaluationTitle' })
export class EvaluationTextPipe {
    transform(value: number) {
        return GradeMap[value];
    }
}
