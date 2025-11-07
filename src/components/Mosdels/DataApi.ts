import { IApi, ICreateOrder, IDataApi, IOrderComplite, IProduct } from "../../types";


export class DataApi {
  private apiService: IApi;

  constructor(apiService: IApi) {
    this.apiService = apiService;
  }

  getProducts(): Promise<IProduct[]> {
    return this.apiService.get<IDataApi>(`/product`).then((data) => {
      const items = data.items;
      return items;
    });
  }

 createOrder(order: ICreateOrder): Promise<IOrderComplite> {
    return this.apiService.post<IOrderComplite>('/order', order, 'POST').then((response) => {
      return {
        id: response.id,
        total: response.total
      }
    })
  }
}
