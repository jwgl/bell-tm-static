import {
    Injectable,
    Type,
    EventEmitter,
    OnInit,
    ApplicationRef,
    ViewContainerRef,
    ComponentFactoryResolver,
} from '@angular/core';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/empty';

@Injectable()
export class Dialog {
    constructor(private appRef: ApplicationRef, private componentFactoryResolver: ComponentFactoryResolver) {}

    open(dialogType: Type<any>, options: any = {}): Promise<any> {
        return new Promise((resolve, reject) => {
            let location: ViewContainerRef = (<any>this.appRef)['_rootComponents'][0]._hostElement.vcRef;
            let componentFactory = this.componentFactoryResolver.resolveComponentFactory(dialogType);
            let contextInjector = location.parentInjector;
            let childInjector = contextInjector;
            let componentRef = location.createComponent(componentFactory, location.length, childInjector);

            let nativeElement = componentRef.location.nativeElement;
            document.body.appendChild(nativeElement);

            let instance = <DynamicDialog>componentRef.instance;
            instance.nativeElement = nativeElement;
            instance.options = options;
            instance.closed.subscribe((value: any) => {
                componentRef.destroy();
            });
            instance.confirm.subscribe((value: any) => {
                resolve(value);
            }, (error: any) => {
                reject(error);
            });
        });
    };
}

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

    /**
     * 如果希望对话框返回值，覆盖此方法。
     */
    protected onConfirmed(): any {
        return null;
    }

    open() {
        let result = this.onOpening();

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
}
