import {GradeFilterPipe} from './pipes/grade-filter';
import {PrimaryCoursesPipe} from './pipes/primary-courses';
import {getProgramType, ProgramTypePipe} from './pipes/program-type';
import {SchemeTermNamePipe, SchemeTermTitlePipe} from './pipes/scheme-term';
import {VersionNumberPipe} from './pipes/version-number';
import {ZeroEmptyPipe} from './pipes/zero-empty';

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
