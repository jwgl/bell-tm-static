import {Property, Scheme, SchemeCourse} from '../scheme.model';

declare module '../scheme.model' {
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

Property.prototype.normalize = function(this: Property) {
    if (this.directions) {
        // 清除没有课程的方向
        for (let i = this.directions.length - 1; i >= 0; i--) {
            if (this.directions[i].courses.length === 0) {
                this.directions.splice(i, 1);
            }
        }
    } else {
        // 没有数据的性质增加空课程，如果是方向课则不增加
        if (!this.hasDirections && this.courses.length === 0) {
            for (let i = 0; i < 3; i++) {
                this.courses.push(new EmptyCourse(this));
            }
        }
    }
};

Scheme.prototype.normalize = function(this: Scheme) {
    for (let i = this.properties.length - 1; i >= 0; i--) {
        const property = this.properties[i];
        property.normalize();
    }
    this.clearPropertyWithEmptyDirection();
};

class EmptyCourse extends SchemeCourse {
    constructor(property: Property) {
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
        this.group = property;
    }
}
