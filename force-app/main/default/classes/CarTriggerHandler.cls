public without sharing class CarTriggerHandler implements TriggerHandler {
    private boolean triggerIsExecuting;
    private integer triggerSize;
    public CarTriggerHelper helper;
    public CarTriggerHandler(boolean triggerIsExecuting, integer triggerSize) {
        this.triggerIsExecuting = triggerIsExecuting;
        this.triggerSize = triggerSize;
        this.helper = new CarTriggerHelper();
    }
    public void beforeInsert(List<Car__c> newCars) {
        // helper.doTask1();
        // helper.doTask2();
    }
    public void beforeUpdate(List<Car__c> oldCars, List<Car__c> newCars, Map<ID, SObject> oldCarMap, Map<ID, SObject> newCarMap) {
        // helper.doTask3();
        // helper.doTask4();
    }
    public void beforeDelete(List<Car__C> oldCars, Map<ID, SObject> oldCarMap) {
        // helper.doTask5();
        // helper.doTask1();
    }
    public void afterInsert(List<Car__c> newCars, Map<ID, SObject> newCarMap) {
        helper.insertCarAuditRecord();
        // helper.doTask3();
    }
    public void afterUpdate(List<Car__c> oldCars, List<Car__c> newCars, Map<ID, SObject> oldCarMap, Map<ID, SObject> newCarMap) {
        helper.insertCarAuditRecord();
        // helper.doTask5();
    }
    public void afterDelete(List<Car__c> oldCars, Map<ID, SObject> oldCarMap) {
        // helper.doTask3();
        // helper.doTask1();
    }
    public void afterUndelete(List<Car__c> newCars, Map<ID, SObject> newCarMap) {
        // helper.doTask4();
        // helper.doTask2();
    }
}