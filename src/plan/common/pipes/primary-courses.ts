import {Pipe} from '@angular/core';

@Pipe({name: 'primaryCourses'})
export class PrimaryCoursesPipe {
    transform(courses: any, args: any[]) {
        const items: string[] = [];
        for (const value of courses) {
            const replaced = value
                .replace(/[\(（][\d上下一二三四 五六七ⅠⅡⅢ][\)）]/, '')
                .replace(/[\dⅠⅡⅢI]+$/, '')
                .replace(/^\s+|\s+$/, '');
            let found = false;
            for (const item of items) {
                if (replaced === item) {
                    found = true;
                    break;
                }
            }
            if (!found) {
                items.push(replaced);
            }
        }
        return items.join('、');
    }
}
