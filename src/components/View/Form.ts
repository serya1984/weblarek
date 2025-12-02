import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/Events";

interface IForm {
  error: string;
}

export class Form<T> extends Component<IForm & T> {
  formError: HTMLElement;
  
  constructor(container: HTMLElement, protected events: IEvents) {
    super(container);

    this.formError = ensureElement(".form__errors", this.container);
  }
  set error(value: string) {
       this.formError.textContent = value;
  } 
}
