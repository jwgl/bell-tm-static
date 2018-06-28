import {getBit} from 'core/utils';

import {getProgramType} from '../../shared/utils';

const courseComparer = (a: SchemeCourse, b: SchemeCourse): number => {
        return a.displayOrder - b.displayOrder
            || a.courseName.localeCompare(b.courseName)
            || (a.id ? a.id : Number.MAX_VALUE) - (b.id ? b.id : Number.MAX_VALUE);
};

export enum RecordStatus {
    /**
     * 未变动
     */
    None,

    /**
     * 新增(ref为空)
     * 更新(ref不为空)
     */
    Created,

    /**
     * 删除(不被引用)
     * 更新(被引用)
     */
    Deleted,

    /**
     * 更新上次编辑
     */
    Updated,

    /**
     * 取消上次编辑
     */
    Reverted,
}

export class Scheme {
    id: number;
    versionNumber: number;
    previousId: number;
    previousVersionNumber: number;
    programId: number;
    programType: number;
    subjectName: string;
    departmentId: string;
    departmentName: string;
    grade: number;
    credit: number;
    status: string;
    workflowInstanceId: string;
    properties: Property[];
    terms: number[];
    directions: DirectionDto[];
    practiceCreditRatio: number;
    latest: boolean;
    exportable: boolean;

    constructor(dto: SchemeDto) {
        this.id                    = dto.id;
        this.versionNumber         = dto.versionNumber;
        this.previousId            = dto.previousId;
        this.previousVersionNumber = dto.previousVersionNumber;
        this.programId             = dto.programId;
        this.programType           = dto.programType;
        this.subjectName           = dto.subjectName;
        this.departmentId          = dto.departmentId;
        this.departmentName        = dto.departmentName;
        this.grade                 = dto.grade;
        this.credit                = dto.credit;
        this.status                = dto.status;
        this.workflowInstanceId    = dto.workflowInstanceId;
        this.directions            = dto.directions;
        this.terms                 = dto.template.terms;
        this.practiceCreditRatio   = dto.template.practiceCreditRatio;
        this.latest                = dto.latest;
        this.exportable            = dto.template.exportable;

        this.properties = dto.template.properties.map(tp => {
            tp.locked = tp.locked && dto.template.templateLocked;
            tp.isResidual = tp.id === dto.template.residualPropertyId;
            tp.minCredit = tp.isResidual ? dto.template.minResidualCredit : 0;
            return new Property(this, tp);
        });

        const propertyMap = this.properties.reduce((acc, p, i) => {
            acc[p.id] = p; return acc;
        }, new Object() as {[key: string]: Property});

        dto.template.courses.forEach(sc => {
            propertyMap[sc.propertyId].addTemplateCourse(sc);
        });

        if (dto.id || !dto.id && dto.previousId) {
            // load existed courses
            if (dto.courses) {
                dto.courses.forEach(sc => {
                    sc.isTempCourse = false;
                    propertyMap[sc.propertyId].load(sc);
                });
            }
            if (dto.tempCourses) {
                dto.tempCourses.forEach(sc => {
                    sc.isTempCourse = true;
                    propertyMap[sc.propertyId].load(sc);
                });
            }
        } else {
            // on create, add template courses
            dto.template.courses.forEach(sc => {
                sc.isTempCourse = false;
                propertyMap[sc.propertyId].add(sc);
            });
        }

        this.clearPropertyWithEmptyDirection();

        this.properties.forEach(p => p.sort());

        this.rebuildStatus();
    }

    /**
     * 删除可包含方向课，但实际不包含课程的课程性质
     */
    clearPropertyWithEmptyDirection() {
        for (let i = this.properties.length - 1; i >= 0; i--) {
            const property = this.properties[i];
            if (property.hasDirections &&  (!property.directions || property.directions.length === 0) && property.courses.length === 0) {
                this.properties.splice(i, 1);
            }
        }
    }

    getDirection(directionId: number): DirectionDto {
        return this.directions.find(d => d.id === directionId);
    }

    get title(): string {
        return `${this.grade}级${this.subjectName}专业${getProgramType(this.programType)}教学计划`;
    }

    /**
     * 获取残余学分，即除总学分与总非残余属性学分间的差值。
     */
    get residualCredit(): number {
        return this.credit - this.properties.filter(p => !p.isResidual).reduce((acc, p) => acc + p.minTotalCredit, 0);
    }

    /**
     * 获取不同方向的残余学分，用于显示。
     */
    get directionResidualCredits(): string {
        if (this.directions.length > 0) {
            const residualCredit = this.residualCredit;
            // 获取具有方向的属性
            const property = this.properties.find(p => p.hasDirections);
            // 可能计划中不包含专业方向课程性质
            if (!property) {
                return null;
            }

            // 该属性的最小学分
            const minTotalCredit = property.minTotalCredit;
            // 获取不等于最小学分的方向。
            const results = property.directions.filter(d => d.totalCredit !== minTotalCredit).map(d => {
                return `${d.name.replace('方向', '')}方向${residualCredit - d.totalCredit + minTotalCredit}学分`;
            });
            if (results.length) {
                return `（${results.join('，')}）`;
            } else {
                return null;
            }
        } else {
            return null;
        }
    }

    get creditStatis() {
        return this.properties.map(p => {
            const cs: CreditStatis = new Object() as CreditStatis;
            cs.id = p.id;
            cs.name = p.name;
            cs.credit = p.totalCredit;
            cs.practiceCredit = p.totalPracticeCredit;
            if (p.isCompulsory) {
                cs.electiveCredit = cs.credit;
                cs.electivePracticeCredit = cs.practiceCredit;
            } else {
                cs.electiveCredit = p.courses.filter(c => c.isActive).reduce((sum, c) => sum += c.credit, 0);
                cs.electivePracticeCredit = p.courses.filter(c => c.isActive).reduce((sum, c) => sum += c.practiceCredit, 0);
            }

            if (p.hasDirections) {
                cs.directions = this.directions.map(d => {
                    let direction: Direction = null;
                    if (p.directions) {
                        direction = p.directions.find(pd => pd.id === d.id);
                    }
                    return {
                        id: d.id,
                        name: d.name,
                        credit: direction ? direction.totalCredit : 0,
                        practiceCredit: direction ? direction.totalPracticeCredit : 0,
                    };
                });
            }
            return cs;
        });
    }

    /**
     * 重构状态
     */
    rebuildStatus(): void {
        this.properties.forEach(p => {
            if (p.directions) {
                p.directions.forEach(d => {
                    d.rebuildStatus();
                });
            }
            p.rebuildStatus();
        });
    }
}

/* tslint:disable:max-classes-per-file */
export abstract class AbstractGroup {
    id: number;
    name: string;
    isCompulsory: boolean;
    credit: number;
    locked: boolean;
    courses: SchemeCourse[];

    abstract load(sc: SchemeCourseDto): SchemeCourse;
    abstract add(sc: SchemeCourseDto): SchemeCourse;
    abstract get scheme(): Scheme;
    abstract get property(): Property;

    sort() {
        this.courses.sort(courseComparer);
    }

    get terms(): number[] {
        return this.scheme.terms;
    }

    /**
     * 分组总学分
     */
    get totalCredit(): number {
        return this.isCompulsory
             ? this.courses
                   .filter(c => c.isActive)
                   .reduce((sum, c) => sum +=  c.credit, 0)
             : this.credit;
    }

    /**
     * 分组实践总学分
     */
    get totalPracticeCredit(): number {
        return this.isCompulsory
             ? this.courses
                   .filter(c => c.isActive)
                   .reduce((sum, c) => sum += c.practiceCredit, 0)
             : 0;
    }

    /**
     * 分组总学时
     */
    get totalPeriod(): number {
        return this.isCompulsory
             ? this.courses
                   .filter(c => c.isActive)
                   .reduce((sum, c) => sum += c.totalPeriod, 0)
             : 0;
    }

    /**
     * 分组学期学时
     */
    getTermPeriod(term: number): number {
        return this.isCompulsory
             ? this.courses
                   .filter(c => c.isActive && c.suggestedTerm === term)
                   .reduce((sum, c) => sum += c.theoryPeriod + c.experimentPeriod, 0)
             : 0;
    }

    contains(courseId: string | number): boolean {
        return !!this.courses.find(c => c._courseId === courseId);
    }

    /**
     * 重构状态
     */
    rebuildStatus(): void {
        const deleted = new Object() as {[key: string]: SchemeCourse};

        this.courses.forEach(c => {
            if (c.reviseVersion === this.scheme.versionNumber) {
                c.prevStatus = RecordStatus.Deleted;
                deleted[c.id] = c;
            }
        });

        this.courses.forEach(c => {
            if (c.schemeId === this.scheme.id) {
                if (c.previousId) {
                    c.ref = deleted[c.previousId];
                }
                c.prevStatus = RecordStatus.Created;
            }
        });
    }
}

export class Direction extends AbstractGroup {
    property: Property;

    constructor(property: Property, dto: DirectionDto) {
        super();
        this.property = property;
        this.id = dto.id;
        this.name = dto.name;
        this.isCompulsory = true;
        this.locked = false;
        this.courses = [];
    }

    get scheme() {
        return this.property.scheme;
    }

    /**
     * 加载课程，用于显示、修订和编辑已有课程
     */
    load(sc: SchemeCourseDto): SchemeCourse {
        if (this.id !== sc.directionId) {
            throw new Error(`Course(${sc.courseId}) does not belongs to Direction(${this.id})`);
        }

        const schemeCourse: SchemeCourse = new SchemeCourse(sc);
        schemeCourse.group = this;
        schemeCourse.displayOrder = this.getDisplayOrder(sc);
        // 编辑时由外部函数更新prevStatus
        schemeCourse.prevStatus = RecordStatus.None;
        schemeCourse.currStatus = RecordStatus.None;
        this.courses.push(schemeCourse);
        return schemeCourse;
    }

    /**
     * 添加新课程，用于本次新建、修订、编辑时新增课程
     */
    add(sc: SchemeCourseDto): SchemeCourse {
        sc.directionId = this.id;
        sc.propertyId = this.property.id;

        const schemeCourse: SchemeCourse = new SchemeCourse(sc);
        schemeCourse.group = this;
        schemeCourse.displayOrder = this.getDisplayOrder(sc);
        schemeCourse.prevStatus = RecordStatus.None;
        schemeCourse.currStatus = RecordStatus.Created;
        this.courses.push(schemeCourse);

        return schemeCourse;
    }

    /**
     * 显示行数
     */
    get rowspan(): number {
        return this.courses.length + 1;
    }

    /**
     * 获取显示顺序
     */
    private getDisplayOrder(sc: SchemeCourseDto): number {
        return this.property.scheme.terms.indexOf(sc.suggestedTerm);
    }
}

export class Property extends AbstractGroup {
    scheme: Scheme;
    orderedCoures: string[];
    directions: Direction[];
    templateCourses: SchemeCourseDto[];
    isResidual: boolean;
    minCredit: number;
    hasDirections: boolean;

    constructor(scheme: Scheme, dto: TemplatePropertyDto) {
        super();
        this.scheme = scheme;
        this.id = dto.id;
        this.name = dto.name;
        this.isCompulsory = dto.isCompulsory;
        this.locked = dto.locked;
        this.isResidual = dto.isResidual;
        this.minCredit = dto.minCredit;
        this.courses = [];
        this.credit = dto.credit;
        this.templateCourses = [];
        this.hasDirections = dto.hasDirections;

        if (this.hasDirections && scheme.directions.length > 0) {
            this.directions = scheme.directions.map(d => new Direction(this, d));
        }
    }

    get property(): Property {
        return this;
    }

    /**
     * 获取属性总学分
     */
    get totalCredit(): number {
        if (this.isResidual) { // 残余属性
            return this.scheme.residualCredit;
        } else { // 非残余属性
            return this.isCompulsory
                 ? this.courses
                    .filter(c => c.isActive)
                    .reduce((sum, c) => sum +=  c.credit, 0)
                 : this.credit;
        }
    }

    /**
     * 获取最小总学分，如果不包含方向，则为属性的总学分；如果包含方向，则为各方向学分的最小值。
     */
    get minTotalCredit(): number {
        return this.directions ? this.directions.reduce((min, d) => Math.min(d.totalCredit, min), Number.MAX_VALUE) : this.totalCredit;
    }

    /**
     * 加载已有课程
     */
    load(sc: SchemeCourseDto): SchemeCourse {
        if (this.id !== sc.propertyId) {
            throw new Error(`Course(${sc.courseId}) does not belongs to property(${this.id})`);
        }

        if (this.directions && sc.directionId) {
            const direction = this.directions.find(d => d.id === sc.directionId);
            if (direction) {
                return direction.load(sc);
            } else {
                throw new Error(`Can not find Direction(${sc.directionId}) for Course(${sc.courseId})`);
            }
        }

        sc.displayOrder = this.getDisplayOrder(sc);
        sc.locked = this.getLockedStatus(sc);

        const schemeCourse: SchemeCourse = new SchemeCourse(sc);
        schemeCourse.group = this;
        schemeCourse.prevStatus = RecordStatus.None;
        schemeCourse.currStatus = RecordStatus.None;
        this.courses.push(schemeCourse);
        return schemeCourse;
    }

    /**
     * 添加新课程
     */
    add(sc: SchemeCourseDto): SchemeCourse {
        if (this.directions && sc.directionId) {
            const direction = this.directions.find(d => d.id === sc.directionId);
            if (direction) {
                return direction.add(sc);
            } else {
                throw new Error(`Can not find Direction(${sc.directionId}) for Course(${sc.courseId})`);
            }
        }

        sc.propertyId = this.id;
        sc.displayOrder = this.getDisplayOrder(sc);
        sc.locked = this.getLockedStatus(sc);

        const schemeCourse: SchemeCourse = new SchemeCourse(sc);
        schemeCourse.group = this;
        schemeCourse.prevStatus = RecordStatus.None;
        schemeCourse.currStatus = RecordStatus.Created;
        this.courses.push(schemeCourse);
        return schemeCourse;
    }

    addTemplateCourse(sc: SchemeCourseDto) {
        this.templateCourses.push(sc);
    }

    /**
     * 课程排序
     */
    sort(): void {
        if (this.directions) {
            this.directions.forEach(d => {
                d.sort();
            });
        }
        super.sort();
    }

    /**
     * 显示行数
     */
    get rowspan(): number {
        if (this.directions) {
            return this.directions.reduce((sum, d) => sum += d.rowspan, 0) +
                (this.courses.length > 0 ? this.courses.length + 1 : 0);
        } else {
            return this.courses.length + 1;
        }
    }

    /**
     * 获取显示顺序
     */
    private getDisplayOrder(sc: SchemeCourseDto): number {
        let courseOrder = 900;
        if (!sc.isTempCourse) {
            for (let i = 0; i < this.templateCourses.length; i++) {
                const pattern = this.templateCourses[i].matchPattern
                            ? this.templateCourses[i].matchPattern
                            : this.templateCourses[i].courseId.toString();
                if (sc.courseId.toString().search(pattern) !== -1) {
                    courseOrder = 100 + i;
                    break;
                }
            }
        }
        const termIndex = this.scheme.terms.indexOf(sc.suggestedTerm);
        return courseOrder * 10000 + termIndex * 100;
    }

    /**
     * 获取课程锁定状态
     */
    private getLockedStatus(sc: SchemeCourseDto): boolean {
        if (this.locked && this.templateCourses.length > 0) {
            const course = this.templateCourses.find(c => c.courseId === sc.courseId);
            if (course) {
                return course.locked;
            }
        }
        return false;
    }
}

export class SchemeCourse {
    group: AbstractGroup;
    id: number;
    isTempCourse: boolean;
    _courseId: string | number;
    _courseName: string;
    credit: number;
    practiceCredit: number;
    theoryPeriod: number;
    experimentPeriod: number;
    _periodWeeks: number;
    assessType: number;
    suggestedTerm: number;
    allowedTerm: number;
    courseGroup: number;
    propertyId: number;
    directionId: number;
    displayOrder: number;
    locked: boolean;

    prevStatus: RecordStatus;
    currStatus: RecordStatus;

    schemeId: number; // 课程可能来自不同的版本
    previousId: number; // 来自服务端的ref
    reviseVersion: number; // 被修改或删除的版本
    highlight: boolean; // 引用加亮
    /**
     * 引用的记录，当修改记录时，原记录被标记为RecordStatus.Deleted，
     * 插入新记录标记为RecordStatus.Created，新记录的ref引用原记录。
     */
    ref: SchemeCourse;

    constructor(dto: SchemeCourseDto) {
        this.id               = dto.id;
        this.isTempCourse     = dto.isTempCourse;
        this._courseId        = dto.courseId;
        this._courseName      = dto.courseName;
        this.credit           = dto.credit;
        this.practiceCredit   = dto.practiceCredit;
        this.theoryPeriod     = dto.theoryPeriod;
        this.experimentPeriod = dto.experimentPeriod;
        this._periodWeeks     = dto.periodWeeks;
        this.assessType       = dto.assessType;
        this.suggestedTerm    = dto.suggestedTerm;
        this.allowedTerm      = dto.allowedTerm;
        this.courseGroup      = dto.courseGroup;
        this.displayOrder     = dto.displayOrder;
        this.propertyId       = dto.propertyId;
        this.directionId      = dto.directionId;
        this.locked           = dto.locked;
        this.schemeId         = dto.schemeId;
        this.reviseVersion    = dto.reviseVersion;
        this.previousId       = dto.previousId;
    }

    /**
     * 课程ID
     */
    get courseId(): string {
        return this.isTempCourse || this._courseId === undefined ? '-' : `${this._courseId}`;
    }

    /**
     * 课程名称
     */
    get courseName() {
        if (!(this.group instanceof Direction) && this.directionId) {
            const direction = this.group.scheme.getDirection(this.directionId);
            return this._courseName + (direction ? `[${direction.name}]` : `[未知方向${this.directionId}]`);
        } else {
            return this._courseName;
        }
    }

    /**
     * 课程总学时
     */
    get totalPeriod() {
        return this.isPracticeCourse
            ? this._periodWeeks * 18
            : Math.round((this.theoryPeriod + this.experimentPeriod) * this._periodWeeks / 18) * 18;
    }

    /**
     * 学时周数
     */
    get periodWeeks() {
        if (this._periodWeeks === 18) {
            return null;
        } else {
            return this._periodWeeks;
        }
    }

    /**
     * 是否显示学时周，纯实践课和非全学段课不显示
     */
    get showPeriodWeeks(): boolean {
        return !this.isPracticeCourse && this._periodWeeks !== 18;
    }

    get isPracticeCourse(): boolean {
        return this.theoryPeriod === 0 && this.experimentPeriod === 0;
    }

    /**
     * 获取按学期显示的字符串
     */
    getTermPeriod(term: number): string {
        if (this.suggestedTerm === term) {
            if (this.isPracticeCourse) {
                return `${this._periodWeeks}周`;
            } else {
                if (this.experimentPeriod !== 0) {
                    return `${this.theoryPeriod}+${this.experimentPeriod}`;
                } else {
                    return `${this.theoryPeriod}`;
                }
            }
        } else {
            if (getBit(this.allowedTerm, term - 1)) {
                return '\u25CF';
            } else {
                return null;
            }
        }
    }

    /**
     * 是否为活动课程，活动课程计入统计数据
     */
    get isActive(): boolean {
        return (this.prevStatus === RecordStatus.None && this.currStatus !== RecordStatus.Deleted)
            || (this.prevStatus === RecordStatus.Created && this.currStatus !== RecordStatus.Reverted)
            || (this.prevStatus === RecordStatus.Deleted && this.currStatus === RecordStatus.Reverted);
    }

    get prevStatusLabel(): string {
        return RecordStatus[this.prevStatus];
    }

    get currStatusLabel(): string {
        return RecordStatus[this.currStatus];
    }

    get terms(): number[] {
        return this.group.terms;
    }
}

export interface SchemeDto {
    id: number;
    versionNumber: number;
    previousId: number;
    previousVersionNumber: number;
    programId: number;
    programType: number;
    subjectName: string;
    departmentId: string;
    departmentName: string;
    grade: number;
    credit: number;
    status: string;
    workflowInstanceId: string;
    courses: SchemeCourseDto[];
    tempCourses: SchemeCourseDto[];
    template: TemplateDto;
    directions: DirectionDto[];
    latest: boolean;
}

export interface SchemeCourseDto {
    id?: number;
    courseId: string | number;
    courseName: string;
    credit: number;
    isTempCourse: boolean;
    propertyId: number;
    directionId?: number;
    practiceCredit: number;
    theoryPeriod: number;
    experimentPeriod: number;
    periodWeeks: number;
    assessType: number;
    suggestedTerm: number;
    allowedTerm: number;
    courseGroup?: number;
    displayOrder?: number;
    locked?: boolean;
    schemeId?: number;
    previousId?: number;
    reviseVersion: number;
    matchPattern?: string; // template course only
}

export interface TemplateDto {
    id: number;
    templateLocked: boolean;
    exportable: boolean;
    residualPropertyId: number;
    minResidualCredit: number;
    properties: TemplatePropertyDto[];
    terms: number[];
    courses: SchemeCourseDto[];
    practiceCreditRatio: number;
}

export interface TemplatePropertyDto {
    id: number;
    name: string;
    isCompulsory: boolean;
    hasDirections: boolean;
    credit: number;
    locked: boolean;
    isResidual: boolean;
    minCredit: number;
}

export interface DirectionDto {
    id: number;
    name: string;
}

/**
 * 课程选择DTO
 */
export interface CourseSelectDto {
    id: string;
    name: string;
    credit: number;
    theoryPeriod: number;
    experimentPeriod: number;
    periodWeeks: number;
    assessType: number;
    department: string;
    isTempCourse: boolean;
}

export interface CreditStatis {
    id: number;                     // 课程性质ID
    name: string;                   // 课程性质名称
    credit: number;                 // 要求总学分
    practiceCredit: number;         // 要求总实践学分
    electiveCredit: number;         // 可选总学分
    electivePracticeCredit: number; // 可选总实践学分
    directions: Array<{
        id: number;                 // 方向ID
        name: string;               // 方向名称
        credit: number;             // 要求总学分
        practiceCredit: number;     // 要求总实践学分
    }>;
}
