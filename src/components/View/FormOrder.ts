import { TPayment } from "../../types";
import { ensureElement } from "../../utils/utils";
import { IEvents } from "../base/Events";
import { Form } from "./Form";

interface IFormOrder {
  address: string;
}

export class FormOrder extends Form<IFormOrder> {
  protected formCardButton: HTMLButtonElement;
  protected formCashButton: HTMLButtonElement;
  protected formInputAddress: HTMLInputElement;

  constructor(container: HTMLElement, protected events: IEvents) {
    super(container, events);

    this.formCardButton = ensureElement(
      '[name="card"]',
      this.container
    ) as HTMLButtonElement;
    this.formCashButton = ensureElement(
      '[name="cash"]',
      this.container
    ) as HTMLButtonElement;
    this.formInputAddress = ensureElement(
      '[name="address"]',
      this.container
    ) as HTMLInputElement;

    this.formCardButton.addEventListener("click", () =>
      this.events.emit("paymenеMethod:card")
    );
    this.formCashButton.addEventListener("click", () =>
      this.events.emit("paymenеMethod:cash")
    );
    this.formInputAddress.addEventListener("input", () =>
      this.events.emit("inputAddressValue:changed", {
        input: this.formInputAddress.value,
      })
    );
  }
  set address(value: string) {
    this.formInputAddress.value = value;
  }

  set payment(value: TPayment) {
    this.formCardButton.classList.toggle("button_alt-active", value === "CARD");
    this.formCashButton.classList.toggle("button_alt-active", value === "CASH");
  }
}
