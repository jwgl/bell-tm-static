import {Pipe} from '@angular/core';
import {toVersionString} from '../utils/version-utils';

@Pipe({name: 'versionNumber'})
export class VersionNumberPipe {
    transform(version: any, args: any[]) {
        return toVersionString(version);
    }
}
