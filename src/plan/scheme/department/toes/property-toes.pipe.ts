import {Pipe} from '@angular/core';

import {Property} from '../../common/scheme.model';

@Pipe({name: 'propertyToes'})
export class PropertyToesPipe {
    transform(properties: Property[]) {
        return properties.filter(p => p.name !== '通识必修课' && p.name !== '通识选修课');
    }
}
