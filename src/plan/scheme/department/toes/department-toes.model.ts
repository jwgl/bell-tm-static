import {
    Scheme,
    AbstractGroup,
    Property,
    SchemeCourseDto,
    SchemeCourse,
    RecordStatus,
} from '../../common/scheme.model';

declare module '../../common/scheme.model' {
    interface Scheme {
        init(programCourses: any[]): void;
        /**
         * 获取需要导出的课程
         */
        getExportCourses(selectedTerm: number): SchemeCourse[];
    }

    interface SchemeCourse {
        departmentId: string;
        departmentName: string;
        startWeek: number;
        readonly endWeek: number;
        selected: boolean;
        exported: boolean;
        toToesDto(): any;
    }
}

Scheme.prototype.init = function(this: Scheme, programCourses: any[]) {
    this.properties.forEach(p => {
        if (p.directions) {
            p.directions.forEach(d => {
                d.courses.forEach(sc => {
                    const programCourse = programCourses.find(it => it.courseId === sc._courseId && it.directionId === d.id);
                    if (programCourse) {
                        sc.startWeek = programCourse.startWeek;
                        sc.departmentId = programCourse.departmentId;
                        sc.departmentName = programCourse.departmentName;
                        sc.exported = true;
                    } else {
                        sc.startWeek = 1;
                        sc.departmentId = this.departmentId;
                        sc.departmentName = this.departmentName;
                        sc.exported = false;
                    }
                });
            });
        }
        p.courses.forEach(sc => {
            const programCourse = programCourses.find(it => it.courseId === sc._courseId);
            if (programCourse) {
                sc.startWeek = programCourse.startWeek;
                sc.departmentId = programCourse.departmentId;
                sc.departmentName = programCourse.departmentName;
                sc.exported = true;
            } else {
                sc.startWeek = 1;
                sc.departmentId = this.departmentId;
                sc.departmentName = this.departmentName;
                sc.exported = false;
            }
        });
    });
};

Scheme.prototype.getExportCourses = function(this: Scheme, selectedTerm: number): SchemeCourse[] {
    let schemeCourses: SchemeCourse[] = [];
    const filter = (sc: SchemeCourse) =>
        sc.selected &&
        !sc.exported &&
        !sc.isTempCourse &&
        (selectedTerm === 0 || sc.suggestedTerm === selectedTerm);
    this.properties.forEach(p => {
        if (p.directions) {
            p.directions.forEach(d => {
                schemeCourses = schemeCourses.concat(d.courses.filter(filter));
            });
        }
        schemeCourses = schemeCourses.concat(p.courses.filter(filter));
    });
    return schemeCourses;
};

Object.defineProperty(SchemeCourse.prototype, 'endWeek', {
        get: function (this: SchemeCourse) {
            // 全学段或实践课
            if (this._periodWeeks === 18 || this.theoryPeriod === 0 && this.experimentPeriod === 0) {
                return 17;
            } else {
                return this.startWeek + this._periodWeeks - 1;
            }
        },
        enumerable: true,
        configurable: true,
    });

SchemeCourse.prototype.toToesDto = function(this: SchemeCourse) {
    return {
        schemeCourseId: this.id,
        startWeek: this.startWeek,
        endWeek: this.endWeek,
        testType: 1,
        departmentId: this.departmentId,
    };
};
