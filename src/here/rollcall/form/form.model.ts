import * as _ from 'lodash';

export enum RollcallType {
    None      = 0,
    Absent    = 1,
    Late      = 2,
    Early     = 3,
    LateEarly = 5,
    Attend    = 6,
}

// {0: 'none', 1: 'absent', ...}
const RollcallTypeNames = _.fromPairs(_.toPairs(RollcallType).filter(p => !/\d+/.test(p[0])).map(p => [p[1], _.camelCase(p[0])]));

// {'none': 0, absent: 0, ...}
const RollcallTypeCounts = _.fromPairs(_.values(RollcallTypeNames).map(n => [n, 0]));

export const RollcallTypes: {[key: string]: {label: string, value: RollcallType, comb?: RollcallType}} = {
    'absent': {label: '旷课', value: RollcallType.Absent},
    'late':   {label: '迟到', value: RollcallType.Late, comb: RollcallType.Early},
    'early':  {label: '早退', value: RollcallType.Early, comb: RollcallType.Late},
    'attend': {label: '调课', value: RollcallType.Attend},
};

export const RollcallKeys = ['absent', 'late', 'early', 'attend'];

export namespace RollcallType {
    export function contains(type: RollcallType, key: string) {
        return type === RollcallTypes[key].value ||
               type === RollcallTypes[key].value + RollcallTypes[key].comb;
    }
}

enum LeaveType {
    PrivateAffair = 1,
    SickLeave     = 2,
    PublicAffair  = 3,
}

export interface RollcallConfig {
    hideFree: boolean;
    hideLeave: boolean;
    hideCancel: boolean;
    random: number;
    view: string;
}

export class RollcallItem {
    id: number;
    type: RollcallType;

    constructor(dto: any) {
        this.id = dto.id;
        this.type = dto.type;
    }
}

class LeaveRequest {
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
    adminClass: string;
    subject: string;
    visible = true;
    statis: number[];
    isFreeListen: false;
    isCancelExam: false;
    rollcallItem: RollcallItem;
    leaveRequest: LeaveRequest;
    pending: false;
    hover: false;

    constructor(index: number, dto: any) {
        this.index = index;
        this.id = dto.id;
        this.name = dto.name;
        this.adminClass = dto.adminClass;
        this.subject = dto.subject;
        this.statis = [0, 0, 0, 0];
    }

    toggle(type: string): ToggleResult {
        if (this.pending ||
            this.isCancelExam ||
            this.isFreeListen ||
            this.leaveRequest) {
            return {op: 'none'};
        }

        // List view中按回车键时type为空
        if (!type) {
            if (this.rollcallItem) {
                // 执行取消操作
                if (this.rollcallItem.type === RollcallType.LateEarly) {
                    type = 'early';
                } else {
                    type = RollcallKeys.find(key => this.rollcallItem.type === RollcallTypes[key].value);
                }
            } else {
                // 默认为旷课
                type = 'absent';
            }
        }

        let currType = RollcallTypes[type].value;
        if (this.rollcallItem) {
            let prevType = this.rollcallItem.type;
            if (prevType === RollcallType.LateEarly) {
                if (RollcallTypes[type].comb) {
                    currType = RollcallTypes[type].comb;
                }
            } else {
                if (prevType === currType) {
                    return {op: 'delete'};
                } else {
                    if (prevType === RollcallTypes[type].comb) {
                        currType = RollcallType.LateEarly;
                    }
                }
            }
            return {op: 'update', type: currType};
        } else {
            return {op: 'insert', type: currType};
        }
    }

    get rollcallType(): RollcallType {
        return this.rollcallItem ? this.rollcallItem.type : RollcallType.None;
    }
}

export interface RollcallFormDto {
     students: any[];
     rollcallItems: {
         studentId: string;
     }[];
     leaveRequests: {
         studentId: string;
     }[];
     locked: boolean;
}

export class RollcallForm {
    students: Student[] = [];
    studentsMap: {[key: string]: Student} = {};
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

        dto.rollcallItems.forEach(i => this.studentsMap[i.studentId].rollcallItem = new RollcallItem(i));
        dto.leaveRequests.forEach(l => this.studentsMap[l.studentId].leaveRequest = new LeaveRequest(l));

        this.students.forEach(student => {
            if (student.isFreeListen) {
                this.freedStudents.push(student);
            } else if (student.isCancelExam) {
                this.cancelledStudents.push(student);
            } else if (student.leaveRequest) {
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
            if (s.rollcallItem) {
                return RollcallTypeNames[s.rollcallItem.type];
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
