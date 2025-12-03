import { Products } from "./components/Models/Products";
import "./scss/styles.scss";
import { Basket } from "./components/Models/Basket";
import { Buyer } from "./components/Models/Buyer";
import { DataApi } from "./components/Models/DataApi";
import { API_URL } from "./utils/constants";
import { Api } from "./components/base/Api";
import { Header } from "./components/View/Header";
import { cloneTemplate, ensureElement } from "./utils/utils";
import { EventEmitter } from "./components/base/Events";
import { Gallery } from "./components/View/Gallery";
import { GalleryCardView } from "./components/View/GalleryCardView";
import { ModalWindow } from "./components/View/ModalWindow";
import { ModalCardView } from "./components/View/ModalCardView";
import { BasketView } from "./components/View/BasketView";
import { IProduct } from "./types";
import { BasketCardView } from "./components/View/BasketCardView";
import { FormOrder } from "./components/View/FormOrder";
import { FormContacts } from "./components/View/FormContacts";
import { OrderSuccess } from "./components/View/OrderSuccess";

const events = new EventEmitter();

const products = new Products(events);
const basket = new Basket(events);
const buyer = new Buyer(events);
const gallery = new Gallery(ensureElement(".page__wrapper"));
const modalWindow = new ModalWindow(ensureElement("#modal-container"), events);
const header = new Header(ensureElement(".header"), events);
const basketView = new BasketView(
  ensureElement(cloneTemplate("#basket")),
  events
);
const formOrder = new FormOrder(cloneTemplate("#order"), events);
const formContacts = new FormContacts(cloneTemplate("#contacts"), events);
const orderSuccess = new OrderSuccess(cloneTemplate("#success"), events);

const api = new Api(API_URL);
const dataApi = new DataApi(api);

dataApi.getProducts().then((data) => {
  products.setItems(data);
  const catalog = products.getItems().map((item) => {
    const card = new GalleryCardView(cloneTemplate("#card-catalog"), {
      onClick: () => events.emit("card:select", item),
    });

    return card.render(item);
  });
  gallery.render({ catalog });
});

events.on("card:select", (product: IProduct) => {
  products.setSavedItem(product);
});

function getModelCardContent(product: IProduct): HTMLElement {
  const modalCardView = new ModalCardView(cloneTemplate("#card-preview"));

  if (product.price === null) {
    modalCardView.setButtonDisabled();
  }

  if (basket.hasProduct(product.id)) {
    modalCardView.setFromBasketButton();
  }
  modalCardView.setButtonListener({
    onClick: () => {
      if (basket.hasProduct(product.id)) {
        events.emit("product:unselect");
      } else {
        events.emit("product:select");
      }
    },
  });

  events.on("itemsProducts:changed", () => {
    if (basket.hasProduct(product.id)) {
      modalCardView.setFromBasketButton();
    } else {
      modalCardView.setToBasketButton();
    }
  });

  return modalCardView.render(product);
}

events.on("product:save", () => {
  const product = products.getSavedItem();

  if (!product) return;
  const content = getModelCardContent(product);
  modalWindow.render({ content });
  modalWindow.openModalWindow();
});

events.on("close:window", () => {
  modalWindow.closeModalWindow();
});

events.on("open:basket", () => {
  const content = basketView.render();
  modalWindow.render({ content });
  modalWindow.openModalWindow();
});

events.on("product:select", () => {
  const getProduct = products.getSavedItem();
  if (getProduct !== undefined) {
    basket.addProduct(getProduct);
  }
  modalWindow.closeModalWindow();
});

events.on("product:unselect", () => {
  const getProduct = products.getSavedItem();
  if (getProduct !== undefined) {
    basket.removeProduct(getProduct.id);
    modalWindow.closeModalWindow();
  }
});

events.on("itemsProducts:changed", () => {
  const counter = basket.getProductsCount();
  header.render({ counter });
  const totalPrice = basket.getTotalPrice();
  const list = basket.getItemsProducts().map((item, index) => {
    const basketCardItem = {
      title: item.title,
      price: item.price,
      index: index + 1,
    };

    const card = new BasketCardView(cloneTemplate("#card-basket"), {
      onClick: () => events.emit("product:delete", item),
    });

    return card.render(basketCardItem);
  });
  basketView.render({ list, totalPrice });
});

events.on("product:delete", (item: IProduct) => {
  basket.removeProduct(item.id);
});

events.on("itemsProducts:changed", (args: { countItems: number }) => {
  if (args.countItems === 1) {
    basketView.enableButton();
  } else if (args.countItems === 0) {
    basketView.disableButton();
  }
});

events.on("checkout", () => {
  const buyerData = buyer.getData();
    const error = buyer.validate();
  const errorString = error.buyerPayment + error.buyerAddress;
   const isEmptyOrder = (buyerData.buyerAddress + buyerData.buyerPayment === '');

  const formData = {
    payment: buyerData.buyerPayment,
    address: buyerData.buyerAddress,
    error: isEmptyOrder ? '' : errorString,
    activeButton: errorString === '',
  };
  
  const content = formOrder.render(formData);
  modalWindow.render({ content });
});

events.on("paymenеMethod:card", () => {
  buyer.setPayment("CARD");
});

events.on("paymenеMethod:cash", () => {
  buyer.setPayment("CASH");
});

events.on("buyer:changed-order", () => {
  const buyerData = buyer.getData();
  const error = buyer.validate();
  const errorString = error.buyerPayment + error.buyerAddress;

  const formData = {
    payment: buyerData.buyerPayment,
    address: buyerData.buyerAddress,
    error: errorString,
    activeButton: errorString === "",
  };
  formOrder.render(formData);
});

events.on("inputAddressValue:changed", (data: { input: string }) => {
  buyer.setAddress(data.input);
});

events.on("buttonOrder:click", () => {
  const buyerData = buyer.getData();
   const error = buyer.validate();

  const errorString = error.buyerEmail + error.buyerPhone;
  const isEmptyContacts = (buyerData.buyerEmail + buyerData.buyerPhone === '');

  const formData = {
    email: buyerData.buyerEmail,
    phone: buyerData.buyerPhone,
    error: isEmptyContacts ? '' : errorString,
    activeButton: errorString === '',
  };

  const content = formContacts.render(formData);
  modalWindow.render({ content });
});

events.on("inputEmail:changed", (data: { input: string }) => {
  buyer.setEmail(data.input);
});

events.on("inputPhone:changed", (data: { input: string }) => {
  buyer.setPhone(data.input);
});

events.on("buyer:changed-contacts", () => {
  const buyerData = buyer.getData();
  const error = buyer.validate();

  const errorString = error.buyerEmail + error.buyerPhone;

  const formData = {
    email: buyerData.buyerEmail,
    phone: buyerData.buyerPhone,
    error: errorString,
    activeSubmitButton: errorString === "",
  };
  formContacts.render(formData);
});

events.on("buttonSubmit:click", () => {
  const buyerData = buyer.getData();
  const itemsId = basket.getItemsProducts().map((item) => {
    return item.id;
  });
  const data = {
    payment: buyerData.buyerPayment,
    address: buyerData.buyerAddress,
    email: buyerData.buyerEmail,
    phone: buyerData.buyerPhone,
    total: basket.getTotalPrice(),
    items: itemsId,
  };
  dataApi.createOrder(data).then((data) => {
    const total = {
      totalPrice: data.total,
    };
    const content = orderSuccess.render(total);

    modalWindow.render({ content });
  });
});

events.on("order:completed", () => {
  basket.clearBasket();
  buyer.clearDataBuyer();
  modalWindow.closeModalWindow();
});
