import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";


interface IForm {
  error: string;
}

export class Form<T> extends Component<IForm & T> {
  formError: HTMLElement;
  
  constructor(container: HTMLElement) {
    super(container);

    this.formError = ensureElement(".form__errors", this.container);
  }
  set error(value: string) {
       this.formError.textContent = value;
  } 
}
