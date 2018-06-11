import { AgreementForm, AgreementItem } from '../../shared/form.model';

declare module '../../shared/form.model' {
    interface AgreementForm {
        removedItems: AgreementItem[];

        addItem(item: AgreementItem): void;
        removeItem(item: AgreementItem): void;
        toServerDto(): any;
        getAddedItems(): any[];
    }
}

AgreementForm.prototype.addItem = function(this: AgreementForm, item: AgreementItem): void {
    if (this.items.find(it => it.equalsTo(item))) {
        return;
    }

    const removedItem = this.removedItems.find(i => i.equalsTo(item));
    if (removedItem) {
        this.removedItems.splice(this.removedItems.indexOf(removedItem), 1);
        this.items.push(removedItem);
    } else {
        this.items.push(item);
    }
};

AgreementForm.prototype.removeItem = function(this: AgreementForm, item: AgreementItem): void {
    const agreementItem = this.items.find(it => it.equalsTo(item));

    if (agreementItem) {
        this.items.splice(this.items.indexOf(agreementItem), 1);
        if (agreementItem.id) {
            this.removedItems.push(agreementItem);
        }
    }
};

AgreementForm.prototype.toServerDto = function(this: AgreementForm): any {
    return {
        agreementName: this.agreementName,
        regionId: this.regionId,
        universityCn: this.universityCn,
        universityEn: this.universityEn,
        addedItems: this.getAddedItems(),
        removedItems: this.id ? this.removedItems.map(it => it.id) : null,
        memo: this.memo,
    };
};

AgreementForm.prototype.getAddedItems = function(this: AgreementForm): any[] {
    return this.items.map(it => ({
        id: it.id,
        majorOptions: it.majorOptions,
        majorOptionsCn: it.majorOptionsCn,
    }));
};
