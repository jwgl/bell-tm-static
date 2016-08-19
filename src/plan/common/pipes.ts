import {PrimaryCoursesPipe} from './pipes/primary-courses';
import {ProgramTypePipe, getProgramType} from './pipes/program-type';
import {VersionNumberPipe} from './pipes/version-number';
import {ZeroEmptyPipe} from './pipes/zero-empty';
import {SchemeTermNamePipe, SchemeTermTitlePipe} from './pipes/scheme-term';
import {GradeFilterPipe} from './pipes/grade-filter';

export {
    PrimaryCoursesPipe,
    ProgramTypePipe,
    getProgramType,
    VersionNumberPipe,
    ZeroEmptyPipe,
    SchemeTermNamePipe,
    SchemeTermTitlePipe,
    GradeFilterPipe,
};

export const PLAN_PIPES = [
    PrimaryCoursesPipe,
    ProgramTypePipe,
    VersionNumberPipe,
    ZeroEmptyPipe,
    SchemeTermNamePipe,
    SchemeTermTitlePipe,
];
