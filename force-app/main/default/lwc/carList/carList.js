import { api, LightningElement } from 'lwc';

export default class CarList extends LightningElement {

    @api cars;
    
    get hasRecords() {
        return (this.cars && this.cars.length > 0);
    }

    handleDelRefresh(event) {
        this.dispatchEvent(new CustomEvent('delete'))
    }

    handleRUpdate(event) {
        this.dispatchEvent(new CustomEvent('carupdate'));
    }

    handleCreate(detail) {
        this.cars.push(detail)
    }
}