import { IBuser, IBuserError, TPayment } from "../../types";

export class Buyer {
  protected buyerPayment: TPayment = "CARD";
  protected buyerEmail: string = "";
  protected buyerPhone: string = "";
  protected buyerAddress: string = "";

  constructor() {}

  setPayment(payment: TPayment) {
    this.buyerPayment = payment;
  }

  setEmail(email: string) {
    this.buyerEmail = email;
  }

  setPhone(phone: string) {
    this.buyerPhone = phone;
  }

  setAddress(address: string) {
    this.buyerAddress = address;
  }

  getData(): IBuser {
    return {
      buyerPayment: this.buyerPayment,
      buyerEmail: this.buyerEmail,
      buyerPhone: this.buyerPhone,
      buyerAddress: this.buyerAddress,
    };
  }

  validate(): IBuserError {
    const errors: IBuserError = {
      buyerPayment: "",
      buyerEmail: "",
      buyerPhone: "",
      buyerAddress: "",
    };

    if (!this.buyerPayment) {
      errors.buyerPayment = "Способ оплаты не выбран";
    } else if (!this.buyerEmail) {
      errors.buyerEmail = "Email не введён";
    } else if (!this.buyerPhone) {
      errors.buyerPhone = "Телефон не ввёдён";
    } else if (!this.buyerAddress) {
      errors.buyerAddress = "Адрес не введён";
    }
    return errors;
  }
}
