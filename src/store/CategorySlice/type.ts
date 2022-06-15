import CategoryType from "../../@Types/CategoryType";

export interface CategoryState {
  error: boolean;
  loading: boolean;
  category: CategoryType[];
  count: number;
}

export interface fetchCategoryState {
  skip: number;
  limit: number;
}
