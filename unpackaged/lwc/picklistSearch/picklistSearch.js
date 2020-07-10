import { LightningElement, track, wire} from 'lwc';
import { getPicklistValues } from 'lightning/uiObjectInfoApi';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';
import ACCOUNT_OBJECT from '@salesforce/schema/Account';
import Type_FIELD from '@salesforce/schema/Account.Type';

export default class PicklistSearch extends LightningElement {
    @track selectedValue = 'Prospect';
    
    @wire(getObjectInfo, { objectApiName: ACCOUNT_OBJECT })
    objectInfo;

    @wire(getPicklistValues, { recordTypeId: '$objectInfo.data.defaultRecordTypeId', fieldApiName: Type_FIELD})
    typePicklistValues;

    handleChange(event){
        this.selectedValue = event.detail.value;
        console.log("selectedValue === "+this.selectedValue);
    }
    //passing the "selectedValue" to next component
    handleAccountType(){
        console.log(this.selectedValue);
        this.dispatchEvent(new CustomEvent('searchtermselected', {detail: this.selectedValue}));
    }
}