public without sharing class CarTriggerHelper {
    public CarTriggerHelper() {
        System.debug('Inside CarTriggerHelper Constructor');
    }
    public void insertCarAuditRecord(List<Car__c> newCars, String Operation) {
        List<Car_Audit__c> carAudits = new List<Car_Audit__c>();

        for(Car__c car : (List<Car__c>) newCars) {
            Car_Audit__c carAudit = new Car_Audit__c();
            carAudit.Operation__c = Operation;
            carAudit.Car__c = car.ID;
            carAudit.Timestamp__c = System.now();
            carAudit.ModifiedBy__c = userinfo.getUserId();
            carAudits.add(carAudit);
        }

        insert carAudits;
    }
}