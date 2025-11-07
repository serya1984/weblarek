import { IProduct } from "../../types";

export class Products {
  protected products: IProduct[] = [];
  protected savedItem: IProduct | undefined;

  constructor() {}
  setItems(items: IProduct[]) {
    this.products = items;
  }

  getItems(): IProduct[] {
    return this.products;
  }

  getItem(id: string) {
    const item = this.products.find((item) => item.id === id);
    return item;
  }

  setSavedItem(product: IProduct) {
    this.savedItem = product;
  }

  getSavedItem(): IProduct | undefined {
    return this.savedItem;
  }
}
