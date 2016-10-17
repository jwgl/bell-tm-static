import {EditMode} from 'core/constants';
import * as _ from 'lodash';

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

Scheme.prototype.onInit = function(this: Scheme, editMode: EditMode) {
    for (let i = this.properties.length - 1; i >= 0; i--) {
        let property = this.properties[i];
        if (property.hasDirections && property.directions === undefined) {
            this.properties.splice(i, 1);
        }
    }

    if (editMode === EditMode.Edit) {
        this.rebuildStatus();
    }
};

Scheme.prototype.toServerDto = function(this: Scheme) {
    return {
        id: this.id,
        versionNumber: this.versionNumber,
        previousId: this.previousId,
        programId: this.programId,
        courses: this.properties
            .reduce((acc, p) => acc.concat(p.getModifiedCourses()), <SchemeCourse[]>[])
            .map(sc => sc.toServerDto()),
    };
};

Scheme.prototype.rebuildStatus = function(this: Scheme) {
    const that = this;

    this.properties.forEach(p => {
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

AbstractGroup.prototype.remove = function(this: AbstractGroup, sc: SchemeCourse) {
    let index = this.courses.indexOf(sc);
    if (index > -1) {
        this.courses.splice(index, 1);
        if (sc.ref) { // 修改 -> 删除, 还原引用
            if (sc.ref.prevStatus === RecordStatus.None) {
                sc.ref.currStatus = RecordStatus.None;
            } else {
                sc.ref.currStatus = RecordStatus.Reverted;
            }
        }
    }
};

AbstractGroup.prototype.restore = function(this: AbstractGroup, sc: SchemeCourse) {
    for (let i = 0; i < this.courses.length; i++) {
        if (this.courses[i].ref === sc) {
            if (sc.prevStatus === RecordStatus.None) {
                this.courses.splice(i, 1);
            } else {
                this.courses[i].currStatus = RecordStatus.Reverted;
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

Property.prototype.getModifiedCourses = function(this: Property): SchemeCourse[] {
    const EMPTY = <SchemeCourse[]>[];
    return (this.directions ? this.directions.reduce((acc, d) => acc.concat(d.courses), EMPTY) : EMPTY)
            .concat(this.courses)
            .filter(sc => sc.currStatus !== RecordStatus.None);
};

SchemeCourse.prototype.update = function(this: SchemeCourse, dto: SchemeCourseDto, level = 0) {
    if (_.isEqual(dto, this.toClientDto())) {
        return;
    }

    switch (this.prevStatus) {
        case RecordStatus.None:
            switch (this.currStatus) {
                case RecordStatus.None:
                    dto.id = null;
                    this.currStatus = RecordStatus.Deleted;
                    let schemeCourse = this.group.add(dto);
                    schemeCourse.ref = this;
                    break;
                case RecordStatus.Created:
                    this.group.remove(this);
                    if (this.ref) { // 修改 -> 修改
                        this.ref.update(dto, level + 1);
                    } else { // 新建 -> 修改
                        this.group.add(dto);
                    }
                    break;
                default:
                    throw new Error('Unsupported operation');
            }
            break;
        case RecordStatus.Created:
            switch (this.currStatus) {
                case RecordStatus.None:
                case RecordStatus.Updated:
                case RecordStatus.Reverted:
                    this.group.remove(this);
                    if (this.ref) { // 修改 -> 修改
                        this.ref.update(dto, level + 1);
                    } else { // 新建 -> 修改
                        let schemeCourse = this.group.add(dto);
                        schemeCourse.prevStatus = RecordStatus.Created;
                        schemeCourse.currStatus = RecordStatus.Updated;
                    }
                    break;
                default:
                    throw new Error('Unsupported operation');
            }
            break;
        case RecordStatus.Deleted:
            switch (this.currStatus) {
                case RecordStatus.Reverted:
                    if (level === 0) {
                        // 第0层，直接更新Deleted状态项
                        let referencedBy = this.findReferencedBy();
                        if (referencedBy) {
                            // 删除(修改) -> 还原 -> 修改
                            dto.id = referencedBy.id;
                            referencedBy.update(dto, level + 1);
                        } else {
                            // 删除(直接) -> 还原 -> 修改
                            dto.id = null;
                            let schemeCourse = this.group.add(dto);
                            schemeCourse.ref = this;
                        }
                    } else {
                        // 其它层，通过更新操作Deleted状态项
                        // 新增(修改) -> REF -> 修改
                        let schemeCourse = this.group.add(dto);
                        schemeCourse.ref = this;
                        schemeCourse.prevStatus = RecordStatus.Created;
                        schemeCourse.currStatus = RecordStatus.Updated;
                    }
                    this.currStatus = RecordStatus.None;
                    break;
                default:
                    throw new Error('Unsupported operation');
            }
            break;
        default:
            throw new Error('Unsupported operation');
    }
};

SchemeCourse.prototype.remove = function(this: SchemeCourse) {
    switch (this.prevStatus) {
        case RecordStatus.None:
            switch (this.currStatus) {
                case RecordStatus.None:
                    this.currStatus = RecordStatus.Deleted;
                    break;
                case RecordStatus.Created:
                    this.group.remove(this);
                    break;
                default:
                    throw new Error('Unsupported operation');
            }
            break;
        case RecordStatus.Created:
            switch (this.currStatus) {
                case RecordStatus.None:
                case RecordStatus.Updated:
                    this.currStatus = RecordStatus.Reverted;
                    if (this.ref) {
                        this.ref.currStatus = RecordStatus.Reverted;
                    }
                    break;
                default:
                    throw new Error('Unsupported operation');
            }
            break;
        case RecordStatus.Deleted:
            switch (this.currStatus) {
                case RecordStatus.Reverted:
                    this.currStatus = RecordStatus.None;
                    let referencedBy = this.findReferencedBy();
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

SchemeCourse.prototype.restore = function(this: SchemeCourse) {
    switch (this.prevStatus) {
        case RecordStatus.None:
            switch (this.currStatus) {
                case RecordStatus.Deleted:
                    this.group.restore(this);
                    break;
                default:
                    throw new Error('Unsupported operation');
            }
            break;
        case RecordStatus.Created:
            switch (this.currStatus) {
                case RecordStatus.Reverted:
                    this.currStatus = RecordStatus.Updated;
                    if (this.ref) {
                        this.ref.currStatus = RecordStatus.None;
                    }
                    break;
                default:
                    throw new Error('Unsupported operation');
            }
            break;
        case RecordStatus.Deleted:
            switch (this.currStatus) {
                case RecordStatus.None:
                    this.group.restore(this);
                    break;
                default:
                    throw new Error('Unsupported operation');
            }
            break;
        default:
            throw new Error('Unsupported operation');
    }
};

SchemeCourse.prototype.findReferencedBy = function(this: SchemeCourse): SchemeCourse {
    for (let i = 0; i < this.group.courses.length; i++) {
        if (this.group.courses[i].ref === this) {
            return this.group.courses[i];
        }
    }
    return null;
};

SchemeCourse.prototype.toClientDto = function(this: SchemeCourse): SchemeCourseDto {
    return {
        id               : this.id,
        courseId         : this._courseId,
        courseName       : this._courseName,
        credit           : this.credit,
        isTempCourse     : this.isTempCourse,
        propertyId       : this.propertyId,
        directionId      : this.directionId,
        practiceCredit   : this.practiceCredit,
        theoryPeriod     : this.theoryPeriod,
        experimentPeriod : this.experimentPeriod,
        periodWeeks      : this._periodWeeks,
        assessType       : this.assessType,
        suggestedTerm    : this.suggestedTerm,
        allowedTerm      : this.allowedTerm,
        courseGroup      : this.courseGroup,
        displayOrder     : this.displayOrder,
        locked           : this.locked,
        schemeId         : this.schemeId,
        previousId       : this.previousId,
        reviseVersion    : this.reviseVersion,
    };
};

SchemeCourse.prototype.toServerDto = function(this: SchemeCourse) {
    let dto: any = {
        id               : this.id,
        isTempCourse     : this.isTempCourse,
        courseId         : this._courseId,
        practiceCredit   : this.practiceCredit,
        theoryPeriod     : this.theoryPeriod,
        experimentPeriod : this.experimentPeriod,
        periodWeeks      : this._periodWeeks,
        assessType       : this.assessType,
        suggestedTerm    : this.suggestedTerm,
        allowedTerm      : this.allowedTerm,
        courseGroup      : this.courseGroup,
        propertyId       : this.propertyId,
        directionId      : this.directionId,
        status           : this.currStatus,
        previousId       : this.ref ? this.ref.id : null,
        schemeId         : this.schemeId,
    };

    if (dto.isTempCourse && !dto.courseId) {
        dto.tempCourse = {
            name:   this.courseName,
            credit: this.credit,
        };
    }

    return dto;
};

SchemeCourse.prototype.canEdit = function(this: SchemeCourse): boolean {
    return this.prevStatus === RecordStatus.None && (this.currStatus === RecordStatus.None || this.currStatus === RecordStatus.Created)
        || this.prevStatus === RecordStatus.Created && (this.currStatus === RecordStatus.None || this.currStatus === RecordStatus.Updated)
        || this.prevStatus === RecordStatus.Deleted && this.currStatus === RecordStatus.Reverted;
};

SchemeCourse.prototype.canRevert = function(this: SchemeCourse): boolean {
    return this.prevStatus === RecordStatus.None && this.currStatus === RecordStatus.Deleted
        || this.prevStatus === RecordStatus.Created && this.currStatus === RecordStatus.Reverted
        || this.prevStatus === RecordStatus.Deleted && this.currStatus === RecordStatus.None;
};
