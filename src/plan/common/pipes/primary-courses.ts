import {Pipe} from 'angular2/core';

@Pipe({name: 'primaryCourses'})
export class PrimaryCoursesPipe {
    transform(courses: any, args: any[]) {
        let items: string[] = [];
        for (let i = 0; i < courses.length; i++) {
            let value = courses[i]
                .replace(/[\(（][\d上下一二三四 五六七ⅠⅡⅢ][\)）]/, '')
                .replace(/[\dⅠⅡⅢI]+$/, '')
                .replace(/^\s+|\s+$/, '');
            let found = false;
            for (let j = 0; j < items.length; j++) {
                if (value === items[j]) {
                    found = true;
                    break;
                }
            }
            if (!found) {
                items.push(value);
            }
        }
        return items.join('、');
    }
}
