import {Component, Directive, Attribute, Input} from 'angular2/core';

@Component({
    selector: 'modal-dialog',
    template: `
    <div class="modal fade" tabindex="-1">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal"><span>&times;</span></button>
                    <h4 class="modal-title">{{title}}</h4>
                </div>
                <div class="modal-body">
                    <ng-content select="modal-body"></ng-content>
                </div>
                <div class="modal-footer">
                    <ng-content select="modal-footer"></ng-content>
                </div>
            </div>
        </div>
    </div>
    `,
})
export class ModalDialogDirective {
    @Input() title: string;

    constructor(@Attribute('title') title: string) {
        this.title = title;
    }
}

/**
 * <button type="button" class="btn btn-secondary" data-dismiss="modal">取消</button>
 */
@Directive({
    selector: 'modal-dialog button[modalCancel]',
    host: {
        '[attr.type]': "'button'",
        '[class.btn]': 'true',
        '[class.btn-secondary]': 'true',
        '[attr.data-dismiss]': "'modal'",
    },
})
export class ModalCancelButtonDirective {

}

/**
 * <button type="button" class="btn btn-primary" (click)="ok()">确定</button>
 */
@Directive({
    selector: 'modal-dialog button[modalOk]',
    host: {
        '[attr.type]': "'button'",
        '[class.btn]': 'true',
        '[class.btn-primary]': 'true',
    },
})
export class ModalOkButtonDirective {

}
