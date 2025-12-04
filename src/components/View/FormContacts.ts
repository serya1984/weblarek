import { ensureElement } from "../../utils/utils";
import { IEvents } from "../base/Events";
import { Form } from "./Form";

interface IFormContacts {
  email: string;
  phone: string;
}

export class FormContacts extends Form<IFormContacts> {
  protected formInputEmail: HTMLInputElement;
  protected formInputPhone: HTMLInputElement;

  constructor(container: HTMLElement, protected events: IEvents) {
    super(container, events);
    this.formInputEmail = ensureElement(
      '[name="email"]',
      this.container
    ) as HTMLInputElement;
    this.formInputPhone = ensureElement(
      '[name="phone"]',
      this.container
    ) as HTMLInputElement;

    this.formInputEmail.addEventListener("input", () =>
      this.events.emit("inputEmail:changed", {
        input: this.formInputEmail.value,
      })
    );
    this.formInputPhone.addEventListener("input", () =>
      this.events.emit("inputPhone:changed", {
        input: this.formInputPhone.value,
      })
    );
  }
  set email(value: string) {
    this.formInputEmail.value = value;
  }

  set phone(value: string) {
    this.formInputPhone.value = value;
  }
}
