import {ApplicationForm} from '../../shared/form.model';

declare module '../../shared/form.model' {
    interface ApplicationForm {
        toServerDto(): any;
    }
}

ApplicationForm.prototype.toServerDto = function(this: ApplicationForm): any {
    return {
        awardId: this.awardId,
        universityCooperative: this.universityCooperative,
        majorCooperative: this.majorCooperative,
        email: this.email,
        linkman: this.linkman,
        phone: this.phone,
    };
};
