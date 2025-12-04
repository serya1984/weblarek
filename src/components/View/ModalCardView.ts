import { ICardActions } from "../../types";
import { categoryMap, CDN_URL } from "../../utils/constants";
import { ensureElement } from "../../utils/utils";
import { IEvents } from "../base/Events";
import { CardView } from "./CardView";

export interface IModalCardView {
  image: string;
  category: string;
  description: string;
  activeButton: boolean;
  buttonText: string;
}

export class ModalCardView extends CardView<IModalCardView> {
  protected cardImage: HTMLImageElement;
  protected cardCategory: HTMLElement;
  protected cardDescription: HTMLElement;
  protected addButton: HTMLButtonElement;

  constructor(container: HTMLElement, protected events: IEvents) {
    super(container);

    this.cardImage = ensureElement(
      ".card__image",
      this.container
    ) as HTMLImageElement;
    this.cardCategory = ensureElement(".card__category_other", this.container);
    this.cardDescription = ensureElement(".card__text", this.container);
    this.addButton = ensureElement(
      ".card__button",
      this.container
    ) as HTMLButtonElement;
  
   this.addButton.addEventListener('click', () => this.events.emit('modalCardView:click'))
  
  }

  set image(value: string) {
    this.setImage(this.cardImage, CDN_URL + value);
  }
  set category(value: string) {
    this.cardCategory.textContent = value;

    if (categoryMap[value as keyof typeof categoryMap]) {
      this.cardCategory.classList.add(
        categoryMap[value as keyof typeof categoryMap]
      );
    }
  }

  set description(value: string) {
    this.cardDescription.textContent = value;
  }

  set activeButton(value: boolean) {
    this.addButton.disabled = !value;
  }

  setButtonListener(actions: ICardActions) {
    this.addButton.addEventListener("click", actions?.onClick);
  }
  set buttonText(value: string) {
     this.addButton.textContent = value;
  }
}
