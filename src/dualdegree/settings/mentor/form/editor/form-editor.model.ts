import {MentorForm} from '../../shared/form.model';

declare module '../../shared/form.model' {
    interface MentorForm {
        toServerDto(): any;
    }
}

MentorForm.prototype.toServerDto = function(this: MentorForm): any {
    return {
        teacherId: this.teacherId,
        email: this.email,
    };
};
