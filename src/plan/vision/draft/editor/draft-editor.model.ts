import {Vision} from '../../shared/vision.model';

declare module '../../shared/vision.model' {
    interface Vision {
        toCreateDto(): any;
        toReviseDto(): any;
        toUpdateDto(): any;
    }
}

Vision.prototype.toCreateDto = function(this: Vision) {
    return {
        objective:       this.objective,
        specification:   this.specification,
        schoolingLength: this.schoolingLength,
        awardedDegree:   this.awardedDegree,
        programId:       this.programId,
        versionNumber:   this.versionNumber,
    };
};

Vision.prototype.toReviseDto = function(this: Vision) {
    return {
        previousId:      this.previousId,
        objective:       this.objective,
        specification:   this.specification,
        schoolingLength: this.schoolingLength,
        awardedDegree:   this.awardedDegree,
        programId:       this.programId,
        versionNumber:   this.versionNumber,
    };
};

Vision.prototype.toUpdateDto = function(this: Vision) {
    return {
        objective:       this.objective,
        specification:   this.specification,
        schoolingLength: this.schoolingLength,
        awardedDegree:   this.awardedDegree,
        programId:       this.programId,
    };
};
