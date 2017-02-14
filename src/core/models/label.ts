import {Type} from '@angular/core';

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

export function labelClass(labelMap: LabelMap, key: any): string {
    return labelMap[key].class;
}

export function labelText(labelMap: LabelMap, key: any): string {
    return labelMap[key].text;
}

export class Labels<T> {
    constructor(private type: any, private labelMap: LabelMap) {}

    getText(key: T): string {
        return this.labelMap[this.type[key]].text;
    }

    getClass(key: T): string {
        return this.labelMap[this.type[key]].class;
    }
}
