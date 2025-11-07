export type ApiPostMethods = "POST" | "PUT" | "DELETE";
export type TPayment = "CARD" | "CASH";

export interface IApi {
  get<T extends object>(uri: string): Promise<T>;
  post<T extends object>(
    uri: string,
    data: object,
    method?: ApiPostMethods
  ): Promise<T>;
}

export interface IProduct {
  id: string;
  title: string;
  image: string;
  price: number | null;
  category: string;
  description: string;
}

export interface IBuser {
  buyerPayment: TPayment;
  buyerEmail: string;
  buyerPhone: string;
  buyerAddress: string;
}

export interface IDataApi {
  total?: number;
  items: IProduct[];
}

export interface IBuserError {
  buyerPayment: string;
  buyerEmail: string;
  buyerPhone: string;
  buyerAddress: string;
}

export interface ICreateOrder {
  payment: TPayment;
  email: string;
  phone: string;
  address: string;
  total: number;
  items: string[];
}
export interface IOrderComplite {
  id: string;
  total: number;
}
