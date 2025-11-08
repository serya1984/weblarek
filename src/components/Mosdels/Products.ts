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

  getItem(id: string): IProduct | undefined {
  return this.products.find((item) => item.id === id); 
  }

  setSavedItem(product: IProduct) {
    this.savedItem = product;
  }

  getSavedItem(): IProduct | undefined {
    return this.savedItem;
  }
}
