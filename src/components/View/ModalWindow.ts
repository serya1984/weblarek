import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/Events";

export interface IModalWindow {
  content: HTMLElement;
}

export class ModalWindow extends Component<IModalWindow> {
  protected modalContent: HTMLElement;
  protected modalCloseButton: HTMLButtonElement;

  constructor(container: HTMLElement, protected events: IEvents) {
    super(container);

    this.modalContent = ensureElement(".modal__content", this.container);
    this.modalCloseButton = ensureElement(
      ".modal__close",
      this.container
    ) as HTMLButtonElement;

    this.modalCloseButton.addEventListener("click", () =>
      this.events.emit("close:window")
    );
    this.container.addEventListener('click', (evt) => { 
      if(evt.target === this.container) {
        this.events.emit("close:window")
      }
    })
  }

  set content(value: HTMLElement) {
    this.modalContent.replaceChildren(value);
  }

  openModalWindow(): void {
    this.container.classList.add("modal_active");
  }

  closeModalWindow(): void {
    this.container.classList.remove("modal_active");
  }
}
