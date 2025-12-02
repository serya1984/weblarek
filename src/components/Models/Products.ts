import { IProduct } from "../../types";
import { IEvents } from "../base/Events";

export class Products {
  protected products: IProduct[] = [];
  protected savedItem: IProduct | undefined;

  constructor(protected events: IEvents) {}

  setItems(items: IProduct[]) {
    this.products = items;
    this.events.emit('items:changed')
  }

  getItems(): IProduct[] {
    return this.products;
  }

  getItem(id: string): IProduct | undefined {
    return this.products.find((item) => item.id === id);
  }

  setSavedItem(product: IProduct | undefined) {
    this.savedItem = product;
    this.events.emit('product:save')
  }

  getSavedItem(): IProduct | undefined {
    return this.savedItem;
  }
}
