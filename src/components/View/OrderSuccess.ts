import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/Events";

interface  IOrderSuccess {
 totalPrice: number
}

export class OrderSuccess extends Component<IOrderSuccess> {
   protected descriptionTotalPriceOrder: HTMLElement;
   protected battonSuccessOrder: HTMLButtonElement;

   constructor(container: HTMLElement, protected events: IEvents) {
    super(container);

    this.descriptionTotalPriceOrder = ensureElement('.order-success__description', this.container);
    this.battonSuccessOrder = ensureElement('.order-success__close', this.container) as HTMLButtonElement;

    this.battonSuccessOrder.addEventListener('click', () => events.emit('order:completed'))
   }
   set totalPrice(value: number) {
    this.descriptionTotalPriceOrder.textContent = `Списано ${value} синапсов`
   }
}