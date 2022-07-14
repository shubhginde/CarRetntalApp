import { api, LightningElement } from 'lwc';

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

    handleShowModal() {
        const modal = this.template.querySelector("c-car-details-popup");
        modal.show();
    }
}