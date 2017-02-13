export interface Label {
    text: string;
    class: string;
}

export interface LabelMap {
    [key: string]: Label;
}

export interface LabelArrayMap {
    [key: string]: Label[];
}
