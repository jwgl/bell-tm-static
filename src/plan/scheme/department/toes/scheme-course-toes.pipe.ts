import {Pipe} from '@angular/core';

import {RecordStatus, SchemeCourse} from '../../shared/scheme.model';

@Pipe({name: 'schemeCourseToes'})
export class SchemeCourseToesPipe {
    transform(schemeCourses: SchemeCourse[], selectedTerm: number) {
       return schemeCourses.filter(sc => {
           return !sc.isTempCourse &&
                  (selectedTerm === 0 || sc.suggestedTerm === selectedTerm) &&
                  sc.prevStatus !== RecordStatus.Deleted;
       });
   }
}
