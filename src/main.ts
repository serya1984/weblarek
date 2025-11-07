import { Products } from "./components/Mosdels/Products";
import "./scss/styles.scss";
import { apiProducts } from "./utils/data";
import { Basket } from "./components/Mosdels/Basket";
import { Buyer } from "./components/Mosdels/Buyer";
import { DataApi } from "./components/Mosdels/DataApi";
import { API_URL } from "./utils/constants";
import { Api } from "./components/base/Api";

const products = new Products();
const basket = new Basket();
const buyer = new Buyer();

products.setItems(apiProducts.items);
const firstItem = apiProducts.items[0];
const secondItem = apiProducts.items[1];
console.log("Массив товаров из каталога", products.getItems());
console.log("Второй товар из массива", products.getItem(secondItem.id));
products.setSavedItem(secondItem);
console.log(
  "Получение товара для подробного отображения",
  products.getSavedItem()
);

basket.addProduct(firstItem);
basket.addProduct(secondItem);
console.log("Получение массива товаров", basket.getItemsProducts());
console.log("Общее колличество товаров в козине", basket.getProductsCount());
console.log("Общая цена всех продуктов в корзине", basket.getTotalPrice());
console.log(
  "Проверка наличия товара в козине",
  basket.hasProduct(secondItem.id)
);
basket.removeProduct(firstItem.id);
console.log(basket.getItemsProducts());

buyer.setPayment("CARD");
buyer.setEmail("serya@mail.ru");
buyer.setPhone("+79008001030");
buyer.setAddress("п.Омский, ул.Западная");
console.log("Объект с данными покупателя", buyer.getData());
console.log(buyer.validate());

const api = new Api(API_URL);
const dataApi = new DataApi(api);

dataApi.getProducts().then((data) => {
  products.setItems(data);
  console.log(products.getItems());
});
