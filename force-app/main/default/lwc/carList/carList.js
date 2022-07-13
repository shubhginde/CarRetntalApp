import { LightningElement, wire } from 'lwc';
import getAllCars from '@salesforce/apex/RentalCarsAppController.getAllCars'

export default class CarList extends LightningElement {
    searchKey = '';
    data;
    allCars;
    startingRecord = 1;
    page = 1;
    endingRecord = 0;
    totalRecordCount;
    totalPage;
    pageSize = 8;

    @wire(getAllCars, { searchKey : '$searchKey'})
    fetchCars(cars) {
        if (cars.data) {
            this.allCars = cars.data;
            this.totalRecordCount = cars.data.length;
            this.totalPage = Math.ceil(this.totalRecordCount / this.pageSize);
            this.data = this.allCars.slice(0, this.pageSize);
            this.endingRecord = this.pageSize;
        }
    }

    handleSearchTermChange(event) {
        window.clearTimeout(this.delayTimeout);
		const searchKey = event.target.value;
		// eslint-disable-next-line @lwc/lwc/no-async-operation
		this.delayTimeout = setTimeout(() => {
			this.searchKey = searchKey;
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

}