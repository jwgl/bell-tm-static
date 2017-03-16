export interface BookingAuth {
    id: number;
    departmentId: string;
    typeId: number;
    typeName: string;
    checkerId: string;
    checkerName: string;
    checkerPhone: string;
}

export interface BookingType {
    id: number;
    name: string;
    isTeaching: boolean;
}

export interface Teacher {
    id: string;
    name: string;
    phone: string;
}

export interface Department {
    id: string;
    name: string;
    isTeaching: boolean;
}
