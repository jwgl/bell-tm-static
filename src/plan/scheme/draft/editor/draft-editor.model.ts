import {equalsTo} from '../../../../core/utils';
import {EditMode} from '../../../../core/constants';

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
        /**
         *
         */
        onInit(editMode: EditMode): void;

        /**
         * 转换为Server DTO
         */
        toServerDto(): any;

        /**
         * 编辑时，重新构建记录状态
         */
        rebuildStatus(): void;
    }

    interface AbstractGroup {
        /**
         * 删除课程。不要直接调用，调用SchemeCourse#remove。
         */
        remove(sc: SchemeCourse): void;

        /**
         * 还原课程。不要直接调用，调用SchemeCourse#restore。
         */
        restore(sc: SchemeCourse): void;
    }

    interface Property {
        /**
         * 获取修改的课程
         */
        getModifiedCourses(): SchemeCourse[];
    }

    interface SchemeCourse {
        /**
         * 修改课程
         */
        update(dto: SchemeCourseDto, level?: number): void;

        /**
         * 删除课程
         */
        remove(): void;

        /**
         * 还原课程
         */
        restore(): void;

        /**
         * 查找引用当前的课程
         */
        findReferencedBy(): SchemeCourse;

        /**
         * 转换至客户端使用的DTO
         */
        toClientDto(): SchemeCourseDto;

        /**
         * 转换至服务端使用的DTO
         */
        toServerDto(): any;

        /**
         * 是否可编辑
         */
        canEdit(): boolean;

        /**
         * 是否可
         */
        canRevert(): boolean;
    }
}

Scheme.prototype.onInit = function(editMode: EditMode) {
    let that = <Scheme>this;

    for (let i = that.properties.length - 1; i >= 0; i--) {
        let property = that.properties[i];
        if (property.hasDirections && property.directions === undefined) {
            that.properties.splice(i, 1);
        }
    }

    if (editMode === EditMode.Edit) {
        that.rebuildStatus();
    }
};

Scheme.prototype.toServerDto = function() {
    let that = <Scheme>this;

    return {
        id: that.id,
        versionNumber: that.versionNumber,
        previousId: that.previousId,
        programId: that.programId,
        courses: that.properties
            .reduce((acc, p) => acc.concat(p.getModifiedCourses()), <SchemeCourse[]>[])
            .map(sc => sc.toServerDto()),
    };
};

Scheme.prototype.rebuildStatus = function() {
    let that = <Scheme>this;

    that.properties.forEach(p => {
        if (p.directions) {
            p.directions.forEach(d => {
                updateStatus(d.courses);
            });
        }
        updateStatus(p.courses);
    });

    function updateStatus(courses: SchemeCourse[]) {
        let deleted = <{[key: string]: SchemeCourse}>{};
        courses.forEach(c => {
            if (c.reviseVersion === that.versionNumber) {
                c.prevStatus = RecordStatus.Deleted;
                deleted[c.id] = c;
            }
        });
        courses.forEach(c => {
            if (c.schemeId === that.id) {
                if (c.previousId) {
                    c.ref = deleted[c.previousId];
                }
                c.prevStatus = RecordStatus.Created;
            }
        });
    }
};

AbstractGroup.prototype.remove = function(sc: SchemeCourse) {
    // TODO https://github.com/Microsoft/TypeScript/issues/6018
    let that = <AbstractGroup>this;

    let index = that.courses.indexOf(sc);
    if (index > -1) {
        that.courses.splice(index, 1);
        if (sc.ref) { // 修改 -> 删除, 还原引用
            if (sc.ref.prevStatus === RecordStatus.None) {
                sc.ref.currStatus = RecordStatus.None;
            } else {
                sc.ref.currStatus = RecordStatus.Reverted;
            }
        }
    }
};

AbstractGroup.prototype.restore = function(sc: SchemeCourse) {
    let that = <AbstractGroup>this;

    for (let i = 0; i < that.courses.length; i++) {
        if (that.courses[i].ref === sc) {
            if (sc.prevStatus === RecordStatus.None) {
                that.courses.splice(i, 1);
            } else {
                that.courses[i].currStatus = RecordStatus.Reverted;
            }
            break;
        }
    }

    if (sc.prevStatus === RecordStatus.None) {
        sc.currStatus = RecordStatus.None;
    } else {
        sc.currStatus = RecordStatus.Reverted;
    }
};

Property.prototype.getModifiedCourses = function(): SchemeCourse[] {
    let that = <Property>this;

    const EMPTY = <SchemeCourse[]>[];
    return (that.directions ? that.directions.reduce((acc, d) => acc.concat(d.courses), EMPTY) : EMPTY)
            .concat(this.courses)
            .filter(sc => sc.currStatus !== RecordStatus.None);
};

SchemeCourse.prototype.update = function(dto: SchemeCourseDto, level = 0) {
    let that = <SchemeCourse>this;

    if (equalsTo(dto, that.toClientDto())) {
        return;
    }

    switch (this.prevStatus) {
        case RecordStatus.None:
            switch (that.currStatus) {
                case RecordStatus.None:
                    dto.id = null;
                    that.currStatus = RecordStatus.Deleted;
                    let schemeCourse = that.group.add(dto);
                    schemeCourse.ref = that;
                    break;
                case RecordStatus.Created:
                    that.group.remove(that);
                    if (that.ref) { // 修改 -> 修改
                        that.ref.update(dto, level + 1);
                    } else { // 新建 -> 修改
                        that.group.add(dto);
                    }
                    break;
                default:
                    throw new Error('Unsupported operation');
            }
            break;
        case RecordStatus.Created:
            switch (that.currStatus) {
                case RecordStatus.None:
                case RecordStatus.Updated:
                case RecordStatus.Reverted:
                    that.group.remove(that);
                    if (that.ref) { // 修改 -> 修改
                        that.ref.update(dto, level + 1);
                    } else { // 新建 -> 修改
                        let schemeCourse = that.group.add(dto);
                        schemeCourse.prevStatus = RecordStatus.Created;
                        schemeCourse.currStatus = RecordStatus.Updated;
                    }
                    break;
                default:
                    throw new Error('Unsupported operation');
            }
            break;
        case RecordStatus.Deleted:
            switch (that.currStatus) {
                case RecordStatus.Reverted:
                    if (level === 0) {
                        // 第0层，直接更新Deleted状态项
                        let referencedBy = that.findReferencedBy();
                        if (referencedBy) {
                            // 删除(修改) -> 还原 -> 修改
                            dto.id = referencedBy.id;
                            referencedBy.update(dto, level + 1);
                        } else {
                            // 删除(直接) -> 还原 -> 修改
                            dto.id = null;
                            let schemeCourse = that.group.add(dto);
                            schemeCourse.ref = that;
                        }
                    } else {
                        // 其它层，通过更新操作Deleted状态项
                        // 新增(修改) -> REF -> 修改
                        let schemeCourse = that.group.add(dto);
                        schemeCourse.ref = that;
                        schemeCourse.prevStatus = RecordStatus.Created;
                        schemeCourse.currStatus = RecordStatus.Updated;
                    }
                    that.currStatus = RecordStatus.None;
                    break;
                default:
                    throw new Error('Unsupported operation');
            }
            break;
        default:
            throw new Error('Unsupported operation');
    }
};

SchemeCourse.prototype.remove = function() {
    let that = <SchemeCourse>this;
    switch (this.prevStatus) {
        case RecordStatus.None:
            switch (that.currStatus) {
                case RecordStatus.None:
                    that.currStatus = RecordStatus.Deleted;
                    break;
                case RecordStatus.Created:
                    that.group.remove(that);
                    break;
                default:
                    throw new Error('Unsupported operation');
            }
            break;
        case RecordStatus.Created:
            switch (that.currStatus) {
                case RecordStatus.None:
                case RecordStatus.Updated:
                    that.currStatus = RecordStatus.Reverted;
                    if (that.ref) {
                        that.ref.currStatus = RecordStatus.Reverted;
                    }
                    break;
                default:
                    throw new Error('Unsupported operation');
            }
            break;
        case RecordStatus.Deleted:
            switch (that.currStatus) {
                case RecordStatus.Reverted:
                    that.currStatus = RecordStatus.None;
                    let referencedBy = that.findReferencedBy();
                    if (referencedBy) {
                        referencedBy.currStatus = RecordStatus.Updated;
                    }
                    break;
                default:
                    throw new Error('Unsupported operation');
            }
            break;
        default:
            throw new Error('Unsupported operation');
    }
};


SchemeCourse.prototype.restore = function() {
    let that = <SchemeCourse>this;

    switch (this.prevStatus) {
        case RecordStatus.None:
            switch (that.currStatus) {
                case RecordStatus.Deleted:
                    that.group.restore(that);
                    break;
                default:
                    throw new Error('Unsupported operation');
            }
            break;
        case RecordStatus.Created:
            switch (that.currStatus) {
                case RecordStatus.Reverted:
                    that.currStatus = RecordStatus.Updated;
                    if (that.ref) {
                        that.ref.currStatus = RecordStatus.None;
                    }
                    break;
                default:
                    throw new Error('Unsupported operation');
            }
            break;
        case RecordStatus.Deleted:
            switch (that.currStatus) {
                case RecordStatus.None:
                    that.group.restore(that);
                    break;
                default:
                    throw new Error('Unsupported operation');
            }
            break;
        default:
            throw new Error('Unsupported operation');
    }
};

SchemeCourse.prototype.findReferencedBy = function(): SchemeCourse {
    let that = <SchemeCourse>this;

    for (let i = 0; i < that.group.courses.length; i++) {
        if (that.group.courses[i].ref === that) {
            return that.group.courses[i];
        }
    }
    return null;
};

SchemeCourse.prototype.toClientDto = function(): SchemeCourseDto {
    let that = <SchemeCourse>this;

    return {
        id               : that.id,
        courseId         : that._courseId,
        courseName       : that._courseName,
        credit           : that.credit,
        isTempCourse     : that.isTempCourse,
        propertyId       : that.propertyId,
        directionId      : that.directionId,
        practiceCredit   : that.practiceCredit,
        theoryPeriod     : that.theoryPeriod,
        experimentPeriod : that.experimentPeriod,
        periodWeeks      : that._periodWeeks,
        assessType       : that.assessType,
        suggestedTerm    : that.suggestedTerm,
        allowedTerm      : that.allowedTerm,
        courseGroup      : that.courseGroup,
        displayOrder     : that.displayOrder,
        locked           : that.locked,
        schemeId         : that.schemeId,
        previousId       : that.previousId,
        reviseVersion    : that.reviseVersion,
    };
};


SchemeCourse.prototype.toServerDto = function() {
    let that = <SchemeCourse>this;

    let dto: any = {
        id               : that.id,
        isTempCourse     : that.isTempCourse,
        courseId         : that._courseId,
        practiceCredit   : that.practiceCredit,
        theoryPeriod     : that.theoryPeriod,
        experimentPeriod : that.experimentPeriod,
        periodWeeks      : that._periodWeeks,
        assessType       : that.assessType,
        suggestedTerm    : that.suggestedTerm,
        allowedTerm      : that.allowedTerm,
        courseGroup      : that.courseGroup,
        propertyId       : that.propertyId,
        directionId      : that.directionId,
        status           : that.currStatus,
        previousId       : that.ref ? that.ref.id : null,
        schemeId         : that.schemeId,
    };

    if (dto.isTempCourse && !dto.courseId) {
        dto.tempCourse = {
            name:   that.courseName,
            credit: that.credit,
        };
    }

    return dto;
};

SchemeCourse.prototype.canEdit = function(): boolean {
    let that = <SchemeCourse>this;
    return that.prevStatus === RecordStatus.None && (that.currStatus === RecordStatus.None || that.currStatus === RecordStatus.Created)
        || that.prevStatus === RecordStatus.Created && (that.currStatus === RecordStatus.None || that.currStatus === RecordStatus.Updated)
        || that.prevStatus === RecordStatus.Deleted && that.currStatus === RecordStatus.Reverted;
};

SchemeCourse.prototype.canRevert = function(): boolean {
    let that = <SchemeCourse>this;
    return that.prevStatus === RecordStatus.None && that.currStatus === RecordStatus.Deleted
        || that.prevStatus === RecordStatus.Created && that.currStatus === RecordStatus.Reverted
        || that.prevStatus === RecordStatus.Deleted && that.currStatus === RecordStatus.None;
};
