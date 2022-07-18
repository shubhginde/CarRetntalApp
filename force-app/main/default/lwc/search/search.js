import { LightningElement } from 'lwc';

export default class Search extends LightningElement {

    handleChange(event) {
        this.dispatchEvent(new CustomEvent('search', {
            detail: event.target.value
        }))
    }
}