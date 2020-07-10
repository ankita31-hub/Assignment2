import { LightningElement,track,wire } from 'lwc';
import { registerListener, unregisterAllListeners,fireEvent } from 'c/pubsub';
import { CurrentPageReference } from 'lightning/navigation';
import ACCOUNT_NAME from '@salesforce/schema/Account.Name';
import ACCOUNT_TYPE from '@salesforce/schema/Account.Type';
import ACCOUNT_OWNER from '@salesforce/schema/Account.OwnerId';
import ACCOUNT_WEBSITE from '@salesforce/schema/Account.Website';
import ACCOUNT_INDUSTRY from '@salesforce/schema/Account.Industry';
import ACCOUNT_PHONE from '@salesforce/schema/Account.Phone';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class IdsDetailComponent extends LightningElement {
    @track details;
    @track selectedFields;
    @track recordView = false;
    @track recordEdit = false;
    @wire(CurrentPageReference) pageRef;
    connectedCallback() {
        registerListener("eventdetails", this.sutUpDetails, this);
        
    }
     
    disconnectedCallback() {
        unregisterAllListeners(this);
    }
    sutUpDetails(dogDtl){
        this.details = dogDtl;
        this.recordView = true;
    }

    selectedFields = [ACCOUNT_NAME, ACCOUNT_TYPE, ACCOUNT_OWNER,ACCOUNT_WEBSITE,ACCOUNT_INDUSTRY,ACCOUNT_PHONE];

    editRec(){
        this.recordView = false;
        this.recordEdit = true;
    }
    handleAccountEdit(event){
        this.recordView = true;
        this.recordEdit = false;
        let message = 'Record Updated successfully !!!';
        const toastEvent  = new ShowToastEvent({
            mode: 'sticky',
            title: 'Successfull',
            message: message,
            variant: 'success',
        });
        this.dispatchEvent(toastEvent);
        fireEvent(this.pageRef, "refreshaccount","");
    }

}