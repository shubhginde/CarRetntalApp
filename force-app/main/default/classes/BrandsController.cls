public with sharing class BrandsController {
    public BrandsController() {

    }

@AuraEnabled(cacheable=true scope='global')
    public static List<Brand__c> getAllBrands(String searchKey) {
        searchKey = String.isBlank(searchKey) ? '%' : '%' + searchKey + '%';

        return [SELECT ID, Name
            FROM Brand__c
            WHERE Name LIKE :searchKey];
    }    
}
