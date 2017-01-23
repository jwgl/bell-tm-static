import * as _ from 'lodash';

export enum RollcallType {
    None = 0,
    Absent = 1,
    Late = 2,
    Early = 3,
    LateEarly = 5,
    Attend = 6,
}

// {0: 'none', 1: 'absent', ...}
const RollcallTypeNames = _.fromPairs(_.toPairs(RollcallType).filter(p => !/\d+/.test(p[0])).map(p => [p[1], _.camelCase(p[0])]));

// {'none': 0, absent: 0, ...}
const RollcallTypeCounts = _.fromPairs(_.values(RollcallTypeNames).map(n => [n, 0]));

export const RollcallTypes: { [key: string]: { label: string, value: RollcallType } } = {
    'absent': { label: '旷课', value: RollcallType.Absent },
    'late':   { label: '迟到', value: RollcallType.Late },
    'early':  { label: '早退', value: RollcallType.Early },
    'attend': { label: '调课', value: RollcallType.Attend },
};

export const RollcallKeys = ['absent', 'late', 'early', 'attend'];

export namespace RollcallType {
    export function contains(type: RollcallType, key: string) {
        return type === RollcallTypes[key].value ||
               type === RollcallType.LateEarly && (key === 'late' || key === 'early');
    }
}

enum LeaveType {
    PrivateAffair = 1,
    SickLeave = 2,
    PublicAffair = 3,
}

export interface RollcallConfig {
    hideFree: boolean;
    hideLeave: boolean;
    hideCancel: boolean;
    random: number;
    view: string;
}

export class Rollcall {
    id: number;
    type: RollcallType;

    constructor(dto: any) {
        this.id = dto.id;
        this.type = dto.type;
    }
}

class StudentLeave {
    id: number;
    type: LeaveType;

    constructor(dto: any) {
        this.id = dto.id;
        this.type = dto.type;
    }
}

export interface ToggleResult {
    op: 'insert' | 'update' | 'delete' | 'none';
    type?: RollcallType;
}

export class Student {
    index: number;
    id: string;
    name: string;
    taskScheduleId: string;
    adminClass: string;
    subject: string;
    statis: number[];
    rollcall: Rollcall;
    leave: StudentLeave;

    isFreeListen = false;
    isCancelExam = false;
    visible = true;
    pending = false;
    hover = false;

    constructor(index: number, dto: any) {
        this.index = index;
        this.id = dto.id;
        this.name = dto.name;
        this.taskScheduleId = dto.taskScheduleId;
        this.adminClass = dto.adminClass;
        this.subject = dto.subject;
        this.statis = [0, 0, 0, 0];
    }

    toggle(type: string): ToggleResult {
        if (this.pending ||
            this.isCancelExam ||
            this.isFreeListen ||
            this.leave) {
            return { op: 'none' };
        }

        // List view中按回车键时type为空
        if (!type) {
            if (this.rollcall) {
                // 执行取消操作
                if (this.rollcall.type === RollcallType.LateEarly) {
                    type = 'early';
                } else {
                    type = RollcallKeys.find(key => this.rollcall.type === RollcallTypes[key].value);
                }
            } else {
                // 默认为旷课
                type = 'absent';
            }
        }

        let currType = RollcallTypes[type].value;
        if (!this.rollcall) {
            return { op: 'insert', type: currType };
        }

        let prevType = this.rollcall.type;
        if (prevType === currType) {
            return { op: 'delete' };
        }

        if (prevType === RollcallType.LateEarly) {
            if (currType === RollcallType.Late) {
                currType = RollcallType.Early;
            } else if (currType === RollcallType.Early) {
                currType = RollcallType.Late;
            }
        } else if (prevType === RollcallType.Late && currType === RollcallType.Early ||
            currType === RollcallType.Late && prevType === RollcallType.Early) {
            currType = RollcallType.LateEarly;
        }
        return { op: 'update', type: currType };
    }

    get rollcallType(): RollcallType {
        return this.rollcall ? this.rollcall.type : RollcallType.None;
    }

    get rollcallKeys(): string[] {
        return this.rollcall ? RollcallKeys.filter(key => RollcallType.contains(this.rollcallType, key)) : [];
    }
}

export interface RollcallFormDto {
    students: any[];
    rollcalls: {
        id: number,
        studentId: string,
        type: RollcallType,
    }[];
    leaves: {
        studentId: string;
    }[];
    locked: boolean;
}

export class RollcallForm {
    students: Student[] = [];
    studentsMap: { [key: string]: Student } = {};
    config: RollcallConfig;
    locked: boolean;

    freedStudents: Student[] = [];
    leftStudents: Student[] = [];
    cancelledStudents: Student[] = [];
    normalStudents: Student[] = [];
    visibleStudents: Student[] = [];

    activeIndex = 0;

    constructor(dto: RollcallFormDto, config: RollcallConfig) {
        this.config = config;
        this.locked = dto.locked;

        dto.students.forEach((s, index) => {
            let student = new Student(index + 1, s);
            this.studentsMap[student.id] = student;
            this.students.push(student);
        });

        dto.rollcalls.forEach(i => this.studentsMap[i.studentId].rollcall = new Rollcall(i));
        dto.leaves.forEach(l => this.studentsMap[l.studentId].leave = new StudentLeave(l));

        this.students.forEach(student => {
            if (student.isFreeListen) {
                this.freedStudents.push(student);
            } else if (student.isCancelExam) {
                this.cancelledStudents.push(student);
            } else if (student.leave) {
                this.leftStudents.push(student);
            } else {
                this.normalStudents.push(student);
            }
        });

        this.freedStudents.forEach(student => student.visible = !this.config.hideFree);
        this.leftStudents.forEach(student => student.visible = !this.config.hideLeave);
        this.cancelledStudents.forEach(student => student.visible = !this.config.hideCancel);
        this.hideRandom();

        this.visibleStudents = this.students.filter(s => s.visible);
    }

    activateNext(step = 1): void {
        this.activeIndex += step;
        if (this.activeIndex >= this.visibleStudents.length) {
            this.activeIndex -= this.visibleStudents.length;
        }
    }

    activatePrev(step = 1): void {
        this.activeIndex -= step;
        if (this.activeIndex < 0) {
            this.activeIndex += this.visibleStudents.length;
        }
    }

    activateFirst(): void {
        this.activeIndex = 0;
    }

    activateLast(): void {
        this.activeIndex = this.visibleStudents.length - 1;
    }

    activateStudent(student: Student): void {
        this.activeIndex = this.visibleStudents.indexOf(student);
    }

    get activeStudent(): Student {
        return this.visibleStudents[this.activeIndex];
    }

    get summary(): any {
        let counters = _.countBy(this.visibleStudents, s => {
            if (s.rollcall) {
                return RollcallTypeNames[s.rollcall.type];
            } else {
                return RollcallTypeNames[RollcallType.None];
            }
        });

        return _.defaults(counters, {
            total: this.students.length,
            free: this.freedStudents.length,
            leave: this.leftStudents.length,
            cancel: this.cancelledStudents.length,
            visible: this.visibleStudents.length,
        }, RollcallTypeCounts);
    }

    private hideRandom() {
        let random = this.config.random;

        if (random < 10 || random > 90) {
            this.normalStudents.forEach(student => student.visible = true);
            return;
        }

        // 统计迟到旷课早退次数,清除之前的随机
        let statis: number[] = [];
        this.normalStudents.forEach((student, index) => {
            statis[index] = student.statis[0] + student.statis[1] + student.statis[2];
            student.visible = true;
        });

        // 随机选择，统计减1，达到-1则隐藏
        let total = this.normalStudents.length;
        let numberToHide = (100 - random) / 100 * total;
        let count = 0;
        while (numberToHide > 0) {
            let index = Math.floor(Math.random() * total);
            if (statis[index] > -1) {
                statis[index]--;
                if (statis[index] === -1) {
                    this.normalStudents[index].visible = false;
                    numberToHide--;
                }
            }
        }
    }
}
