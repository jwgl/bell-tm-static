import {Scheme, Property, SchemeCourse} from './scheme.model';

declare module './scheme.model' {
    /**
     * 课程清理。对于无方向的课程性质，如果课程为空，则增加三行空课程。
     */
    interface Property {
        normalize(): void;
    }

    /**
     * 课程清理。对于无方向的课程性质，如果课程为空，则增加三行空课程。
     */
    interface Scheme {
        normalize(): void;
    }
}

Property.prototype.normalize = function() {
    let that = <Property>this;

    if (that.directions) {
        // 清除没有课程的方向
        for (let i = that.directions.length - 1; i >= 0; i--) {
            if (that.directions[i].courses.length === 0) {
                that.directions.splice(i, 1);
            }
        }
    } else {
        // 没有数据的性质增加空课程，如果是方向课则不增加
        if (!that.hasDirections && that.courses.length === 0) {
            for (let i = 0; i < 3; i++) {
                that.courses.push(new EmptyCourse());
            }
        }
    }
};

Scheme.prototype.normalize = function() {
    let that = <Scheme>this;

    for (let i = that.properties.length - 1; i >= 0; i--) {
        let property = that.properties[i];
        property.normalize();
        // 删除可包含方向课，但实际不包含课程的课程性质
        if (property.hasDirections && (!property.directions || property.directions.length === 0)) {
            that.properties.splice(i, 1);
        }
    };
};

class EmptyCourse extends SchemeCourse {
    constructor() {
        super({
            courseId: 0,
            courseName: '',
            credit: 0,
            isTempCourse: true,
            propertyId: 0,
            practiceCredit: 0,
            suggestedTerm: 0,
            theoryPeriod: 0,
            experimentPeriod: 0,
            periodWeeks: 0,
            assessType: 1,
            allowedTerm: 0,
            previousId: null,
            reviseVersion: null,
        });
    }
};
