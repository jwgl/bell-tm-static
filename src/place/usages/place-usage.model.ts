export interface Place {
    id: string;
    name: string;
    seat: number;
    type: string;
}

export interface PlaceUsage {
    termId: number;
    placeId: string;
    startWeek: number;
    endWeek: number;
    oddEven: number;
    dayOfWeek: number;
    startSection: number;
    totalSection: number;
    type: string;
    department: string;
    description: string;
}
