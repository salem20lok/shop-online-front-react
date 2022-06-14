import ProductsType from "../../@Types/ProductsType";

export interface ProductsState {
  count: number;
  products: ProductsType[];
  error: boolean;
  loading: boolean;
}

export interface FetchProductsState {
  limit: number;
  skip: number;
}
