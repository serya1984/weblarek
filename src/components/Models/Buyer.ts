import { IBuyer, IBuyerError, TPayment } from "../../types";
import { IEvents } from "../base/Events";

export class Buyer {
  protected buyerPayment: TPayment | string = "";
  protected buyerEmail: string = "";
  protected buyerPhone: string = "";
  protected buyerAddress: string = "";

  constructor(protected events: IEvents) {}

  setPayment(payment: TPayment) {
    this.buyerPayment = payment;
    this.events.emit("buyer:changed-order");
  }

  setEmail(email: string) {
    this.buyerEmail = email;
    this.events.emit("buyer:changed-contacts");
  }

  setPhone(phone: string) {
    this.buyerPhone = phone;
    this.events.emit("buyer:changed-contacts");
  }

  setAddress(address: string) {
    this.buyerAddress = address;
    this.events.emit("buyer:changed-order");
  }

  getData(): IBuyer {
    return {
      buyerPayment: this.buyerPayment,
      buyerAddress: this.buyerAddress,
      buyerEmail: this.buyerEmail,
      buyerPhone: this.buyerPhone,
    };
  }

  validate(): IBuyerError {
    const errors: IBuyerError = {
      buyerPayment: "",
      buyerAddress: "",
      buyerEmail: "",
      buyerPhone: "",
    };

    if (!this.buyerPayment) {
      errors.buyerPayment = "Способ оплаты не выбран";
    } else if (!this.buyerAddress) {
      errors.buyerAddress = "Адрес не введён";
    } else if (!this.buyerEmail) {
      errors.buyerEmail = "Email не введён";
    } else if (!this.buyerPhone) {
      errors.buyerPhone = "Телефон не ввёдён";
    }
    return errors;
  }
}
