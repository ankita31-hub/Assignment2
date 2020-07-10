import { LightningElement,api,wire } from 'lwc';
import { CurrentPageReference } from 'lightning/navigation';
import { fireEvent } from 'c/pubsub';
export default class CardComponent extends LightningElement {
    @api account;
    @wire(CurrentPageReference) pageRef;
    displayAcctDetails(){
        fireEvent(this.pageRef, "eventdetails", this.account.Id);
        console.log('this acc id ===>>>'+this.account.Id);
    }
}