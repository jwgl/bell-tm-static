import { Pipe } from '@angular/core';

@Pipe({ name: 'observerGroup' })
export class ObserverGroupPipe {
    transform(data: any[], args: any) {
        return data.filter(item => item.observerType === args);
    }
}
