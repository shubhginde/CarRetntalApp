import { api, LightningElement } from 'lwc';

export default class Paginator extends LightningElement {
    @api page;
    @api totalpages;

    handlePrevious() {
        this.dispatchEvent(new CustomEvent('previous'));
    }

    handleNext() {
        this.dispatchEvent(new CustomEvent('next'));
    }
}