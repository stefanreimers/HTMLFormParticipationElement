import { HTMLFormAssociatedElement } from './HTMLFormAssociatedElement.js';
export class HTMLFormAssociatedValidatingElement extends HTMLFormAssociatedElement {
    __onBeforeValueChange(v) {
        if (this.required && v == null) {
            this.internals.setValidity({ customError: true }, '');
            return false;
        }
        else {
            this.internals.setValidity({});
            return true;
        }
    }
    /* --- Validation --- */
    get validity() { return this.internals.validity; }
    get validationMessage() { return this.internals.validationMessage; }
    get willValidate() { return this.internals.willValidate; }
    checkValidity() { return this.internals.checkValidity(); }
    reportValidity() { return this.internals.reportValidity(); }
}
