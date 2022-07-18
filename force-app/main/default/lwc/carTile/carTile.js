import { api, LightningElement } from 'lwc';
import { deleteRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class CarTile extends LightningElement {
    @api car;

    get carBrandandModel() {
        return this.car.Brand__r.Name + ' ' + this.car.Model__r.Name;
    }

    get carPrice() {
        return (this.car.Price__c / 100000).toPrecision(2) + ' Lakh';
    }
    get kmsDriven() {
        return this.car.Kms_Driven__c.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    handleEditCar() {
        const modal = this.template.querySelector("c-car-edit-form");
        modal.show();
    }

    handleUpdate(event) {
        this.dispatchEvent(new CustomEvent('carupdate'))
    }

    handleDelCar(event) {
        deleteRecord(this.car.Id)
            .then(() => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Success',
                        message: 'Record deleted',
                        variant: 'success'
                    })
                );
                this.dispatchEvent(new CustomEvent('delrefresh', {detail: this.car.Id}));
            })
            .catch(error => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error deleting record',
                        message: error.body.message,
                        variant: 'error'
                    })
                );
            });
    }
}