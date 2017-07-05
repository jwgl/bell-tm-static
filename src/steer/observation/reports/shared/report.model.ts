export interface TeacherItem {
    teacherId: string;
    teacherName: string;
    departmentName: string;
    isnew?: string;
    hasSupervisor?: string;
}

export interface DepartmentTeacherMap {
    key: string;
    value: TeacherItem[];
}
