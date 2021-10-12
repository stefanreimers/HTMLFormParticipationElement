import { HTMLFormAssociatedElement } from './src/HTMLFormAssociatedElement.js';
import { HTMLFormAssociatedValidatingElement } from './src/HTMLFormAssociatedValidatingElement.js';

export {HTMLFormAssociatedElement, HTMLFormAssociatedValidatingElement}

export default ('checkValidity' in window.ElementInternals.prototype)?HTMLFormAssociatedValidatingElement:HTMLFormAssociatedElement;