import { Pipe } from '@angular/core';

@Pipe({ name: 'evaluationTitle' })
export class EvaluationTextPipe {
    transform(value: number) {
        const evaluationText: string[] = ['优', '良', '中', '差'];
        return (value == null || value > 3) ? null : evaluationText[value];
    }
}
