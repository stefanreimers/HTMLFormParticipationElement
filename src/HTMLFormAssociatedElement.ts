/**
 * Sources: https://web.dev/more-capable-form-controls/
 */

export class HTMLFormAssociatedElement extends HTMLElement {

  static formAssociated = true;

  //@ts-ignore
  public internals: ElementInternals;
  private __value: any;
  private __name: string;

  constructor() {
    super();

    this.__name = '';
    //@ts-ignore
    this.internals = this.attachInternals();
  }

  get form() { return this.internals.form; }

  get name() { return this.__name }
  set name(v: string) {
    if (this.__name !== v) {
      this.__name = v;
      this.setAttribute('name', v);
    }

  }

  get value() { return this.__value }
  set value(v) {
    if(this.__onUpdateValue(v) !== false) this.setAttribute('value', v);;
  }

  get required(): boolean { return this.hasAttribute('required') }
  set required(v: boolean) {
    if (!!v) this.setAttribute('required', '')
    else this.removeAttribute('required');
  }

  __onUpdateValue(v: any) {

    if (this.__value == v || this.matches(':disabled')) return false;

    if (!this.__onBeforeValueChange(v)) return false;

    this.__value = v;

    //@ts-expect-error
    if ('setFormValue' in window.ElementInternals.prototype)
      this.internals.setFormValue(this.__value);
  }

  __onBeforeValueChange(v: any): boolean {
    return true
  }

  static get observedAttributes() { return ['name', 'value']; }

  attributeChangedCallback(name: string, oldValue: any, newValue: any) {

    if (oldValue === newValue) return;

    //@ts-ignore
    this[name] = newValue;
  }

}