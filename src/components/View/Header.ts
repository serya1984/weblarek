import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/Events";

export interface IHeaderData {
  counter: number;
}

export class Header extends Component<IHeaderData> {
  protected headerCounter: HTMLElement;
  protected headerButton: HTMLButtonElement;

  constructor(container: HTMLElement, protected events: IEvents) {
    super(container);

    this.headerCounter = ensureElement(
      ".header__basket-counter",
      this.container
    );
    this.headerButton = ensureElement(
      ".header__basket",
      this.container
    ) as HTMLButtonElement;

    this.headerButton.addEventListener("click", () =>
      this.events.emit("open:basket")
    );
  }

  set counter(value: number) {
    this.headerCounter.textContent = String(value);
    this.events.emit("value:changed");
  }
}
