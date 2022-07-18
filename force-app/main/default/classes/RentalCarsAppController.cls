public with sharing class RentalCarsAppController {
    public Apexpages.StandardSetController controller  {Set; get;}
    Public Boolean isEmptyList{get;set;}
    // public String searchString{get;set;}

    public RentalCarsAppController() {
        String searchString = ApexPages.currentPage().getParameters().get('searchString');
        if (searchString == '' || searchString == null) {
            searchString = '%';
        } else {
            searchString = '%' + searchString + '%';
        } 

        List<Car__c> cars = [SELECT ID, Name, Car_Owner__r.Name, Brand__r.Name,
            Model__r.Name, Kms_Driven__c, Price__c, Year__c, RTO__r.Name
            FROM Car__c
            WHERE Brand__r.Name LIKE :searchString
            OR Model__r.Name LIKE :searchString
            OR RTO__r.Name LIKE :searchString];

        controller = new Apexpages.StandardSetController(cars);
        controller.setPageSize(8);
        
        if(cars.size() > 0) {
            isEmptyList = false;
        } else {
            isEmptyList = true;
        }
    }

    public List<Car__c> getCarList() {
        List<Car__c> cars = (List<Car__c>) controller.getRecords();
        return cars;
    }

    @AuraEnabled(cacheable=false)
    public static List<Car__c> getAllCars(String searchKey) {
        searchKey = String.isBlank(searchKey) ? '%' : '%' + searchKey + '%';

        return [SELECT ID, Name, Car_Owner__r.Name, Brand__r.Name,
            Model__r.Name, Kms_Driven__c, Price__c, Year__c, RTO__r.Name
            FROM Car__c
            WHERE Brand__r.Name LIKE :searchKey
            OR Model__r.Name LIKE :searchKey
            OR RTO__r.Name LIKE :searchKey];
    }
}
