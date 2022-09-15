# HTMLFormParticipationElement
A web component base class for custom elements that are associated to native forms

&nbsp;
## About
Conventional custom elements do not participate in HTML forms just like that. That is when a form is submitted, custom elements can not append any values to the form data or can be validated alongside with native controls.
To make this possible the Form-associated custom elements API enable components to act like built-in controls.

The HTMLFormParticipationElement is a JavaScript class that can act as a super class to custom elements instead of HTMLElement. 
It equips it's child components with the following form related properties and functions:


Property               | Type | Description
----------------------- | ---- | -----------------------------------
form | HTMLFormElement | Readonly property to get the associated form for the component
name | string | A unique name, will result in a property of this name in the formdata
value | Any | The value of the component which will be part of the formdata 
required | Boolean | Whether the component must provide a value; See Validation section below



&nbsp;
## How To use
The entrypoint of this repo is the index.js file, which is a ES module.
It exports the <code>HTMLFormAssociatedElement</code> and <code>HTMLFormAssociatedValidatingElement</code>.
While the prior is the base class providing the functionality of Form-associated custom elements API, the latter is an extended version which provides validation functionality on top, see the Validation section below.

You can alternatively import the following
```javascript
import { HTMLFormAssociatedElement } from '../index.js';
import { HTMLFormAssociatedValidatingElement } from '../index.js';
import { default as FormElement} from '../index.js'; // Will import HTMLFormAssociatedValidatingElement when supported by your user agent, or HTMLFormAssociatedElement otherwise
```


## Basic example

```html
...
<script type="module" >

    import { default as FormElement } from '../index.js';

    // Create a component that extends the named HTMLFormAssociatedElement
    class CustomInput extends FormElement {

      constructor(){
        super();
      }

      get template(){
        return `<div style="border: 1px solid red; display:block"></div>`
      }

      connectedCallback(){
        this.innerHTML = this.template;
      }

    }
    // Define a custom element based on the above class
    window.customElements.define('custom-input', CustomInput);

  </script>

  <!-- Use the custom element alongside with native form controls -->
  <form id="formValues">
    <input type="text" name="native" value="abc">
    <custom-input name="custom" value="def"></custom-input>
  </form>

  <script>


    const form = document.getElementById('formValues');
    form.addEventListener('submit', function(evt) {
      let formdata = new FormData(evt.target)
      evt.preventDefault();
      // See the custom element submit it's value
      console.log(evt, Array.from(formdata.values()));
      return false;
    })

  </script>
...
```

Find more comprehensive examples in the <code>examples</code> folder in this repository


## Validation