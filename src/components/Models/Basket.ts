import { IProduct } from "../../types";
import { IEvents } from "../base/Events";



export class Basket {
  protected itemsProducts: IProduct[] = [];

  constructor(protected events: IEvents) {}

  getItemsProducts(): IProduct[] {
    return this.itemsProducts;
  }

  addProduct(product: IProduct) {
    this.itemsProducts.push(product);
    this.events.emit("itemsProducts:changed", {countItems: this.itemsProducts.length});
  }

  removeProduct(id: string) {
    this.itemsProducts = this.itemsProducts.filter((item) => item.id !== id);
    this.events.emit("itemsProducts:changed", {countItems: this.itemsProducts.length});
  }

  clearBasket() {
    this.itemsProducts = [];
    this.events.emit("itemsProducts:changed", {countItems: this.itemsProducts.length});
  }

  getTotalPrice(): number {
    return this.itemsProducts.reduce((total, item) => {
      if (item.price !== null) {
        return (total += item.price);
      }
      return total;
    }, 0);
  }

  getProductsCount(): number {
    return this.itemsProducts.length;
  }

  hasProduct(id: string): boolean {
    return this.itemsProducts.some((item) => item.id === id);
  }
}
