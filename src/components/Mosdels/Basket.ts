import { IProduct } from "../../types";

export class Basket {
  protected itemsProducts: IProduct[] = [];

  constructor() {}

  getItemsProducts(): IProduct[] {
    return this.itemsProducts;
  }

  addProduct(product: IProduct) {
    this.itemsProducts.push(product);
  }

  removeProduct(id: string) {
    this.itemsProducts = this.itemsProducts.filter((item) => item.id !== id);
  }

  clearBasket() {
    this.itemsProducts = [];
  }

  getTotalPrice(): number {
    return this.itemsProducts.reduce((total, item) => {
      if (item.price !== null) {
        return (total += item.price);
      }
      return total;
    }, 0);
  }

  getProductsCount() {
    return this.itemsProducts.length;
  }

  hasProduct(id: string): boolean {
    return this.itemsProducts.some((item) => item.id === id);
  }
}
