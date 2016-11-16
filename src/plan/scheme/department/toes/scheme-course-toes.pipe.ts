import {Pipe} from '@angular/core';

import {SchemeCourse} from '../../common/scheme.model';

@Pipe({name: 'schemeCourseToes'})
export class SchemeCourseToesPipe {
    transform(schemeCourses: SchemeCourse[], selectedTerm: number) {
       return schemeCourses.filter(sc => !sc.isTempCourse && (selectedTerm === 0 || sc.suggestedTerm === selectedTerm));
   }
}
