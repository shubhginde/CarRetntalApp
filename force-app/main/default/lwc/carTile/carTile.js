import { api, LightningElement } from 'lwc';

export default class CarTile extends LightningElement {
    @api car;

    get carBrandandModel() {
        return this.car.Brand__r.Name + ' ' + this.car.Model__r.Name;
    }
}