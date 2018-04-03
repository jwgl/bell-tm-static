export class DeptAdminForm {
    id: number;
    departmentId: string;
    departmentName: string;
    teacherId: string;
    teacherName: string;

    constructor(dto: any) {
        this.id = dto.id;
        this.departmentId = dto.departmentId;
        this.departmentName = dto.departmentName;
        this.teacherId = dto.teacherId;
        this.teacherName = dto.teacherName;
    }
}
