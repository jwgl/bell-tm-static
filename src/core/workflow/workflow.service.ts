import {EventEmitter, Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import 'rxjs/add/operator/finally';

import {Dialog} from '../dialogs';
import {ListCounts, ListGroup} from '../models';
import {ApiUrl, Rest} from '../rest';
import {WorkflowAcceptDialog} from './accept.dialog';
import {WorkflowNextDialog} from './next.dialog';
import {WorkflowRejectDialog} from './reject.dialog';
import {WorkflowRevokeDialog} from './revoke.dialog';
import {WorkflowSubmitDialog} from './submit.dialog';
import {WorkflowWorkitemsDialog} from './workitems.dialog';

export interface SubmitOptions {
    id: any;
    type: 'check' | 'approve';
    what: string;
    validate?: () => string[];
}

export interface ReviewOptions {
    id: any;
    wi: string;
    type: 'check' | 'approve';
    what: string;
}

export interface RevokeOptions {
    id: any;
    what: string;
}

export interface NextOptions {
    id: any;
    wi?: string;
    type: string;
    what: string;
}

@Injectable()
export class Workflow {
    listGroup: ListGroup;
    pending = false;

    constructor(private dialog: Dialog, private rest: Rest, private api: ApiUrl) {}

    submit(options: SubmitOptions): Promise<void> {
        const whoUrl = options.type === 'check' ? this.api.checkers(options.id) : this.api.approvers(options.id);
        const does = this.typeLabel(options.type);
        this.pending = true;
        return this.dialog.open(WorkflowSubmitDialog, {
            whoUrl,
            does,
            what: options.what,
        }, () => {
            this.pending = false;
        }).then(result => {
            return this.rest.patch(this.api.submit(options.id), {
                title: result.what,
                to: result.to,
                comment: result.comment,
            }).finally(() => {
                this.pending = false;
            }).toPromise();
        }, () => {
            this.pending = false;
        });
    }

    accept(options: ReviewOptions): Promise<void> {
        const whoUrl = options.type === 'check' ? this.api.approvers(options.id) : null;
        const does = this.typeLabel(options.type);
        this.pending = true;
        return this.dialog.open(WorkflowAcceptDialog, {
            whoUrl,
            does,
            what: options.what,
        }, () => {
            this.pending = false;
        }).then(result => {
            return this.rest.patch(this.api.accept(options.id, options.wi), {
                title: result.what,
                to: result.to,
                comment: result.comment,
            }).do((data: {counts: ListCounts}) => {
                if (this.listGroup && data.counts) {
                    this.listGroup.update(data.counts);
                }
            }).finally(() => {
                this.pending = false;
            }).toPromise();
        });
    }

    reject(options: ReviewOptions): Promise<void> {
        const does = this.typeLabel(options.type);
        this.pending = true;
        return this.dialog.open(WorkflowRejectDialog, {
            does,
            what: options.what,
        }, () => {
            this.pending = false;
        }).then(result => {
            return this.rest.patch(this.api.reject(options.id, options.wi), {
                title: result.what,
                comment: result.comment,
            }).do((data: {counts: ListCounts}) => {
                if (this.listGroup && data.counts) {
                    this.listGroup.update(data.counts);
                }
            }).finally(() => {
                this.pending = false;
            }).toPromise();
        });
    }

    revoke(options: RevokeOptions): Promise<void> {
        this.pending = true;
        return this.dialog.open(WorkflowRevokeDialog, {
            what: options.what,
        }, () => {
            this.pending = false;
        }).then(result => {
            return this.rest.patch(this.api.revoke(options.id), {
                title: result.what,
                comment: result.comment,
            }).finally(() => {
                this.pending = false;
            }).toPromise();
        }, () => {
            this.pending = false;
        });
    }

    workitems(workflowInstanceId: string) {
        this.dialog.open(WorkflowWorkitemsDialog, {instance: workflowInstanceId});
    }

    typeLabel(type: 'check' | 'approve'): string {
        return type === 'check' ? '审核' : '审批';
    }

    loadList(options: {[key: string]: any} = {}): Observable<any> {
        return this.rest.get(this.api.list(options)).do((data: {counts: ListCounts}) => {
            if (this.listGroup && data.counts) {
                this.listGroup.update(data.counts);
                this.listGroup.activate(options.type);
            }
        });
    }

    loadItem(type: string, id: any, wi: string, query: string): Observable<any> {
        return this.rest.get(`${this.api.workitem(id, wi)}?type=${type}&query=${query}`).do((data: {counts: ListCounts}) => {
            if (this.listGroup && data.counts) {
                this.listGroup.update(data.counts);
                this.listGroup.activate(type);
            }
        });
    }

    next(options: NextOptions): Promise<void> {
        const whoUrl = this.api.tousers(options.id);
        const does = '下一步处理';
        this.pending = true;
        return this.dialog.open(WorkflowNextDialog, {
            whoUrl,
            does,
            what: options.what,
        }, () => {
            this.pending = false;
        }).then(result => {
            return this.rest.patch(this.api.next(options.id, options.wi), {
                title: result.what,
                to: result.to,
                comment: result.comment,
            }).do((data: {counts: ListCounts}) => {
                if (this.listGroup && data.counts) {
                    this.listGroup.update(data.counts);
                }
            }).finally(() => {
                this.pending = false;
            }).toPromise();
        });
    }
}
