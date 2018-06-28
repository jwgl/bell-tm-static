import {getProgramType} from '../../shared/utils';

export class Vision {
    id: number;
    grade: number;
    subjectName: string;
    departmentId: string;
    departmentName: string;
    programId: number;
    programType: number;
    schemeId: number;
    objective: string;
    specification: string;
    schoolingLength: string;
    minLengthOfSchooling: number;
    maxLengthOfSchooling: number;
    lengthOfSchooling: number;
    awardedDegree: string;
    degreeName: string;
    status: string;
    versionNumber: number;
    previousId: number;
    previousVersionNumber: number;
    workflowInstanceId: string;

    constructor(dto: any) {
        this.id = dto.id;
        this.grade = dto.grade;
        this.subjectName = dto.subjectName;
        this.departmentId = dto.departmentId;
        this.departmentName = dto.departmentName;
        this.programId = dto.programId;
        this.programType = dto.programType;
        this.schemeId = dto.schemeId;
        this.objective = dto.objective;
        this.awardedDegree = dto.awardedDegree;
        this.degreeName = dto.degreeName;
        this.specification = dto.specification;
        this.schoolingLength = dto.schoolingLength;
        this.minLengthOfSchooling = dto.minLengthOfSchooling;
        this.maxLengthOfSchooling = dto.maxLengthOfSchooling;
        this.lengthOfSchooling = dto.lengthOfSchooling;
        this.status = dto.status;
        this.versionNumber = dto.versionNumber;
        this.previousId = dto.previousId;
        this.previousVersionNumber = dto.previousVersionNumber;
        this.workflowInstanceId = dto.workflowInstanceId;
    }

    get title(): string {
        return `${this.grade}级${this.subjectName}专业${getProgramType(this.programType)}培养方案`;
    }
}
