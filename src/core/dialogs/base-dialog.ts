import {EventEmitter, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';

export interface DynamicDialog {
    nativeElement: any;
    closed: EventEmitter<any>;
    confirm: EventEmitter<any>;
    options: any;
}

export class BaseDialog implements DynamicDialog, OnInit {
    nativeElement: any;
    $modal: JQuery;
    confirm: EventEmitter<any>;
    confirmed: boolean;
    closed: EventEmitter<void>;
    options: any;

    constructor() {
        this.confirm = new EventEmitter();
        this.closed = new EventEmitter<void>();
    }

    ngOnInit() {
        this.$modal = $(this.nativeElement).find('.modal');

        this.$modal.on('show.bs.modal', () => {
            this.confirmed = false;
        }).on('hide.bs.modal', () => {
            if (this.confirmed) {
                this.confirm.emit(this.onConfirmed());
            }
        }).on('hidden.bs.modal', () => {
            this.closed.emit(null);
        });
        this.open();
    }

    ok() {
        this.confirmed = true;
        this.$modal.modal('hide');
    }

    open() {
        const result = this.onOpening();
        if (result) {
            result.subscribe(value => {
                this.options.data = value;
                this.$modal.modal('show');
            }, error => {
                this.confirm.error(error);
            });
        } else {
            this.$modal.modal('show');
        }
    }

    /**
     * 打开对话框时的初始化操作。
     */
    protected onOpening(): Observable<any> {
        return null;
    }

    /**
     * 如果希望对话框返回值，覆盖此方法。
     */
    protected onConfirmed(): any {
        return null;
    }
}
