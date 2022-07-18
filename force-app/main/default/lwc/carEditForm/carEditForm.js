import { LightningElement, api } from 'lwc';
import NAME_FIELD from '@salesforce/schema/Car__c.Name';
import CAR_OWNER_FIELD from '@salesforce/schema/Car__c.Car_Owner__r.Name';
import PRICE_FIELD from '@salesforce/schema/Car__c.Price__c';
import YEAR_FIELD from '@salesforce/schema/Car__c.Year__c';
import KMSDRIVEN_FIELD from '@salesforce/schema/Car__c.Kms_Driven__c';
import BRAND_FIELD from '@salesforce/schema/Car__c.Brand__r.Name';
import MODEL_FIELD from '@salesforce/schema/Car__c.Model__r.Name';
import RTO_FIELD from '@salesforce/schema/Car__c.RTO__r.Name';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class CarEditForm extends LightningElement {
    // Expose a field to make it available in the template
    fields = [NAME_FIELD, CAR_OWNER_FIELD, BRAND_FIELD, MODEL_FIELD, PRICE_FIELD, YEAR_FIELD, KMSDRIVEN_FIELD, RTO_FIELD];

    // Flexipage provides recordId and objectApiName
    showModal = false;
    @api car;
        
    @api show() {
        this.showModal = true;
    }

    handleDialogClose() {
        this.showModal = false;
    }

    handleSuccess(event) {
        // alert(event.detail.fields.Car_Owner__c)
        // console.log(event.detail.fields.Car_Owner__c)
        this.dispatchEvent(new CustomEvent('carupdate'));
    }
}