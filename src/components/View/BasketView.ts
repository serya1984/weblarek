import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/Events";

export interface IBasketView {
  list: HTMLElement[];
  totalPrice: number;
}

export class BasketView extends Component<IBasketView> {
  protected basketList: HTMLElement;
  protected basketTotalPrice: HTMLElement;
  protected basketButton: HTMLElement;

  constructor(container: HTMLElement, protected events: IEvents) {
    super(container);

    this.basketList = ensureElement(".basket__list", this.container);
    this.basketTotalPrice = ensureElement(".basket__price", this.container);
    this.basketButton = ensureElement(".basket__button", this.container);
  
    this.basketButton.addEventListener('click', () => this.events.emit('checkout'))
  }

  set list(value: HTMLElement[]) {
    this.basketList.replaceChildren(...value);
  }
  set totalPrice(value: number) {
    this.basketTotalPrice.textContent = `${String(value)} синапсов`;
  }
    set activeButton(value: boolean) {
    if (value === true) {
      this.basketButton.removeAttribute("disabled");
    } else {
      this.basketButton.setAttribute("disabled", "disabled");
    }
  }
}
