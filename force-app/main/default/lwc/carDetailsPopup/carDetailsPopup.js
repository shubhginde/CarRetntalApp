import { LightningElement, api } from "lwc";


export default class CarDetailsPopup extends LightningElement {
    showModal = false;
    @api car;
        
    @api show() {
        this.showModal = true;
    }

    get kmsDriven() {
        return this.car.Kms_Driven__c.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    get price() {
        return this.car.Price__c.toLocaleString('en-IN', {
                maximumFractionDigits: 0,
                style: 'currency',
                currency: 'INR'
            });
    }

    handleDialogClose() {
        this.showModal = false;
    }
}