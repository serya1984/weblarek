import { ICardActions } from "../../types";
import { ensureElement } from "../../utils/utils";
import { CardView } from "./CardView";

export interface IBasketCardView {
  index: number;
}

export class BasketCardView extends CardView<IBasketCardView> {
  protected basketIndex: HTMLElement;
  protected basketDeleteButton: HTMLButtonElement;

  constructor(container: HTMLElement, protected actions?: ICardActions) {
    super(container);

    this.basketIndex = ensureElement(".basket__item-index", this.container);
    this.basketDeleteButton = ensureElement(
      ".basket__item-delete",
      this.container
    ) as HTMLButtonElement;

    if (actions?.onClick) {
      this.basketDeleteButton.addEventListener("click", actions?.onClick);
    }
  }
  set index(value: number) {
    this.basketIndex.textContent = String(value);
  }
}
