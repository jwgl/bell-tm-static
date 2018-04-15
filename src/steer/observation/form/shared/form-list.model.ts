export interface ObservationItem {
    id: number;
    supervisorId: string;
    supervisorName: string;
    supervisorDate: string;
    observerType: number;
    isAdmin: boolean;
    evaluateLevel: string;
    status: number;
    scheduleId: string;
    courseClassName: string;
    departmentName: string;
    teacherId: string;
    teacherName: string;
    dayOfWeek: number;
    startSection: number;
    totalSection: number;
    formTotalSection: number;
    course: string;
    place: string;
    termId?: number;
    isLegacy?: boolean;
}

export const ListFilter = [
    { key: 'teacherName', name: '教师姓名' },
    { key: 'course', name: '课程名' },
    { key: 'departmentName', name: '开课单位' },
    { key: 'evaluateLevel', name: '评价等级' },
    { key: 'status', name: '状态' },
    { key: 'observerType', name: '督导类型' },
    { key: 'supervisorName', name: '督导姓名' }];
