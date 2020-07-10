import { LightningElement,api, wire } from 'lwc';
import getAccountsByType from '@salesforce/apex/getAccountRecord.getAccountsByType';
import { refreshApex } from '@salesforce/apex';
import { CurrentPageReference } from 'lightning/navigation';
import { registerListener,unregisterAllListeners } from 'c/pubsub';

export default class SearchResults extends LightningElement {

    @api selectedValue;
    @wire (getAccountsByType,{searchkey: '$selectedValue',  recordNumber: 50}) mAccountType;
    @wire(CurrentPageReference) pageRef;
   
    connectedCallback(){
        //register application event sent by cardcomponent
        console.log('inside connectedCallback')
        registerListener("refreshaccount", this.refreshData,this);
    }
    disconnectedCallback()
    {
    unregisterAllListeners(this);
    }
    refreshData(){
        console.log('inside refresh');
        return refreshApex(this.mAccountType);
    }
}