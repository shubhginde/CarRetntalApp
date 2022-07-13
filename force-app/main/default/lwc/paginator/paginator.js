import { api, LightningElement } from 'lwc';

export default class Paginator extends LightningElement {
    @api page;
    @api totalpages;

    get options() {
        return [
            { label: '4', value: '4' },
            { label: '8', value: '8' },
            { label: '12', value: '12' },
        ];
    }

    handlePrevious() {
        this.dispatchEvent(new CustomEvent('previous'));
    }

    handleNext() {
        this.dispatchEvent(new CustomEvent('next'));
    }

    handleChange(event) {
        this.dispatchEvent(new CustomEvent('psizeselected', {
            detail: event.target.value
        }));
    }
}