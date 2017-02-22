import {
    ApplicationRef,
    ComponentFactoryResolver,
    ComponentRef,
    EmbeddedViewRef,
    EventEmitter,
    Injectable,
    Injector,
    OnInit,
    Type,
} from '@angular/core';

import {Observable} from 'rxjs/Observable';

import {DynamicDialog} from './base-dialog';

@Injectable()
export class Dialog {
    constructor(
        private applicationRef: ApplicationRef,
        private injector: Injector,
        private componentFactoryResolver: ComponentFactoryResolver,
    ) {}

    open(dialogType: Type<any>, options?: any, onCancel?: () => void): Promise<any> {
        return new Promise((resolve, reject) => {
            const location = this.getRootViewContainerNode();
            const componentFactory = this.componentFactoryResolver.resolveComponentFactory(dialogType);
            const componentRef = componentFactory.create(this.injector);
            const componentRootNode = this.getComponentRootNode(componentRef);

            this.applicationRef.attachView(componentRef.hostView);
            componentRef.onDestroy(() => {
                this.applicationRef.detachView(componentRef.hostView);
            });

            location.appendChild(componentRootNode);

            const instance = componentRef.instance as DynamicDialog;
            instance.nativeElement = componentRootNode;
            instance.options = options;
            instance.closed.subscribe(() => {
                componentRef.destroy();
            });
            instance.confirm.subscribe((value: any) => {
                resolve(value);
            }, (error: any) => {
                reject(error);
            });
            instance.cancel.subscribe(() => {
                if (onCancel) {
                    onCancel();
                }
            });
        });
    };

    private getRootViewContainer(): ComponentRef<any> {
        return this.applicationRef.components[0];
    }

    private getComponentRootNode(componentRef: ComponentRef<any>): HTMLElement {
        return (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
    }

    private getRootViewContainerNode(): HTMLElement {
        return this.getComponentRootNode(this.getRootViewContainer());
    }
}
