import { LightningElement, api, wire } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class CarAddForm extends LightningElement {

    handleSuccess(event) {
        const toastEvent = new ShowToastEvent({
            title: "Car Record created",
            message: "Record ID: " + event.detail.id,
            variant: "success"
        });
        this.dispatchEvent(toastEvent);
        this.dispatchEvent(new CustomEvent('created'))
    }

    showModal = false;
        
    @api show() {
        this.showModal = true;
    }

    handleDialogClose() {
        this.showModal = false;
    }
}