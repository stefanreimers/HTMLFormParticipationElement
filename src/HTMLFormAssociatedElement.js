/**
 * Sources: https://web.dev/more-capable-form-controls/
 */
export class HTMLFormAssociatedElement extends HTMLElement {
    constructor() {
        super();
        this.__name = '';
        //@ts-ignore
        this.internals = this.attachInternals();
    }
    get form() { return this.internals.form; }
    get name() { return this.__name; }
    set name(v) {
        if (this.__name !== v) {
            this.__name = v;
            this.setAttribute('name', v);
        }
    }
    get value() { return this.__value; }
    set value(v) {
        if (this.__onUpdateValue(v) !== false)
            this.setAttribute('value', v);
        ;
    }
    get required() { return this.hasAttribute('required'); }
    set required(v) {
        if (!!v)
            this.setAttribute('required', '');
        else
            this.removeAttribute('required');
    }
    __onUpdateValue(v) {
        if (this.__value == v || this.matches(':disabled'))
            return false;
        if (!this.__onBeforeValueChange(v))
            return false;
        this.__value = v;
        //@ts-expect-error
        if ('setFormValue' in window.ElementInternals.prototype)
            this.internals.setFormValue(this.__value);
    }
    __onBeforeValueChange(v) {
        return true;
    }
    static get observedAttributes() { return ['name', 'value']; }
    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue === newValue)
            return;
        //@ts-ignore
        this[name] = newValue;
    }
}
HTMLFormAssociatedElement.formAssociated = true;
