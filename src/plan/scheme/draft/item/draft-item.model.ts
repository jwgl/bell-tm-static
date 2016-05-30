/* tslint:disable:no-unused-variable */
import {Scheme} from '../../common/scheme.model';
/* tslint:enable:no-unused-variable */

declare module '../../common/scheme.model' {
    interface Scheme {
        editable?: boolean;
        revisable?: boolean;
        checkCredit(): string[];
    }
}

Scheme.prototype.checkCredit = function() {
    let that = <Scheme>this;
    let errors = <string[]>[];
    let statis = that.creditStatis;
    let compulsories = statis.filter(s => !s.name.startsWith('专业选修') && s.name.startsWith('专业'));
    if (that.directions.length > 0) {
        let directions = that.directions.map(d => {
            return {
                id: d.id,
                name: d.name,
                total: compulsories.reduce((sum, s) =>
                    sum += s.directions ? s.directions.find(sd => sd.id === d.id).credit : s.credit, 0),
                practiceCredit: compulsories.reduce((sum, s) =>
                    sum += s.directions ? s.directions.find(sd => sd.id === d.id).practiceCredit : s.practiceCredit, 0),
            };
        });

        directions.forEach(d => {
            if (d.practiceCredit / d.total < that.practiceCreditRatio) {
                errors.push(`${d.name.replace('方向', '')}方向的专业必修课比例小于${that.practiceCreditRatio * 100}%（${d.practiceCredit}/${d.total}）`);
            }
        });
    } else {
        let total = compulsories.reduce((sum, s) => sum += s.credit, 0);
        let practiceCredit = compulsories.reduce((sum, s) => sum += s.practiceCredit, 0);

        if (practiceCredit / total < that.practiceCreditRatio) {
            errors.push(`专业必修课比例小于${that.practiceCreditRatio * 100}%（${practiceCredit}/${total}）`);
        }
    }

    let electives = statis.filter(s => s.name.startsWith('专业选修'));
    let electiveCredit = electives.reduce((sum, s) => sum += s.electiveCredit, 0);
    let electivePracticeCredit = electives.reduce((sum, s) => sum += s.electivePracticeCredit, 0);

    if (electivePracticeCredit / electiveCredit < that.practiceCreditRatio) {
        errors.push(`专业选课课比例小于${that.practiceCreditRatio * 100}%（${electivePracticeCredit}/${electiveCredit}）`);
    }

    return errors;
};
