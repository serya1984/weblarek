import { ICardActions } from "../../types";
import { categoryMap, CDN_URL } from "../../utils/constants";
import { ensureElement } from "../../utils/utils";
import { CardView } from "./CardView";

export interface IGalleryCardView {
  category: string;
  image: string;
}

export class GalleryCardView extends CardView<IGalleryCardView> {
  protected cardCategory: HTMLElement;
  protected cardImage: HTMLImageElement;

  constructor(container: HTMLElement, protected actions?: ICardActions) {
    super(container);

    this.cardCategory = ensureElement(".card__category", this.container);
    this.cardImage = ensureElement(
      ".card__image",
      this.container
    ) as HTMLImageElement;

    if (actions?.onClick) {
      this.container.addEventListener("click", actions?.onClick);
    }
  }

  set category(value: string) {
    this.cardCategory.textContent = value;

    if (categoryMap[value as keyof typeof categoryMap]) {
      this.cardCategory.classList.add(
        categoryMap[value as keyof typeof categoryMap]
      );
    }
  }

  set image(value: string) {
    this.setImage(this.cardImage, CDN_URL + value);
  }
}
