public with sharing class getAccountRecord {
    
	@AuraEnabled(cacheable =true)
    public static List<Account> getAccounts(string searchTerm)
        {
            System.debug('AccountName' +  searchTerm);
            //System.debug('Record' +  noOfAccounts);
            searchTerm = '%'+ searchTerm +'%';
            return [Select Id,Name,Type from Account where Name like :searchTerm];
        }
    
    @AuraEnabled(cacheable =true)
    public static List<Account> getAccountsByType(string searchkey, Integer recordNumber){
            string searchTerm = '%'+ searchkey +'%';
            return [Select Id,Name,Type,OwnerId,Website,Industry,Phone from Account where type like :searchTerm LIMIT :recordNumber];
        }
    
    @AuraEnabled(cacheable=true)
    public static Account[] getAccountDetails(){
       return [SELECT Id,Name,type FROM Account];
    }
}