import { LightningElement, wire } from 'lwc';
import getAllCars from '@salesforce/apex/RentalCarsAppController.getAllCars';
import { refreshApex } from '@salesforce/apex';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class CarsApp extends LightningElement {
    searchKey = '';
    data;
    allCars;
    startingRecord = 1;
    page = 1;
    endingRecord = 0;
    totalRecordCount;
    totalPage;
    pageSize = 8;
    wiredActivities;

    handleSearchTermChange(event) {
        window.clearTimeout(this.delayTimeout);
		const searchKey = event.detail;
		this.delayTimeout = setTimeout(() => {
            this.searchKey = searchKey;
            this.fetchCars();
		}, 300);
    }

    handlePrevious(event) {
        // alert('Previuos');
        if (this.page > 1) {
            this.page = this.page - 1;
            this.displayRecordsPerPage(this.page);
        }
    }

    handleNext(event) {
        // alert('Next');
        if (this.page < this.totalPage && this.page !== this.totalPage) {
            this.page = this.page + 1;
            this.displayRecordsPerPage(this.page);
        }
    }
    
    displayRecordsPerPage(page) {
        this.startingRecord = (page - 1) * this.pageSize;
        this.endingRecord = page * this.pageSize;
        this.endingRecord = (this.endingRecord > this.totalRecordCount) ? this.totalRecordCount : this.endingRecord;
        this.data = this.allCars.slice(this.startingRecord, this.endingRecord);
        this.startingRecord = this.startingRecord + 1;
    }

    get hasRecords() {
        return this.totalRecordCount > 0;
    }

    handleSizeSelected(event) {
        this.pageSize = parseInt(event.detail);
        this.totalPage = Math.ceil(this.totalRecordCount / this.pageSize);
        this.data = this.allCars.slice(0, this.pageSize);
        this.endingRecord = this.pageSize;
    }

    handleNewRecord() {
        const modal = this.template.querySelector("c-car-add-form");
        modal.show();
    }

    handleUpdate() {
        const toastEvent = new ShowToastEvent({
            title: "Car Record created",
            message: "Record Updated Successfully",
            variant: "success"
        });
        this.dispatchEvent(toastEvent);
        this.fetchCars();
    }

    fetchCars() {
        getAllCars({ searchKey: this.searchKey })
            .then((cars) => {
                this.allCars = cars;
                this.totalRecordCount = cars.length;
                this.totalPage = Math.ceil(this.totalRecordCount / this.pageSize);
                this.data = this.allCars.slice(0, this.pageSize);
                this.endingRecord = this.pageSize;
                // this.wiredActivities = cars;
                console.log(cars);
            }).catch((err) => {
                console.log(err);
            })
    }

    connectedCallback() {
        this.fetchCars();
    }
}