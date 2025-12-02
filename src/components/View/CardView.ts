import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";

export interface ICardView {
  title: string;
  price: number | null;
}

export class CardView<T> extends Component<ICardView & T> {
  protected cardTitle: HTMLElement;
  protected cardPrice: HTMLElement;

  constructor(container: HTMLElement) {
    super(container);

    this.cardTitle = ensureElement(".card__title", this.container);
    this.cardPrice = ensureElement(".card__price", this.container);
  }
  set title(value: string) {
    this.cardTitle.textContent = value;
  }

  set price(value: number | null) {
    if (value === null) {
      this.cardPrice.textContent = "Бесценно";
    } else {
      this.cardPrice.textContent = String(`${value} синапсов`);
    }
  }
}
