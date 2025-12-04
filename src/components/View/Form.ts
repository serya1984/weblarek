import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/Events";

interface IForm {
  error: string;
}

export class Form<T> extends Component<IForm & T> {
  protected formError: HTMLElement;
  protected formButton: HTMLButtonElement;

  constructor(container: HTMLElement, protected events: IEvents) {
    super(container);

    this.formError = ensureElement(".form__errors", this.container);
    this.formButton = ensureElement('.button', this.container) as HTMLButtonElement;

      this.container.addEventListener('submit', (e: Event) => {
      e.preventDefault();
      this.events.emit(`${this.container.getAttribute('name')}:submit`);
    }); 
  }
  set error(value: string) {
    this.formError.textContent = value;
  }

  set activeButton(value: boolean) {
  this.formButton.disabled = !value; 
  }
}
