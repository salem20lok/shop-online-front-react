import UserType from "../../@Types/UserType";

export interface UsersState {
  loading: boolean;
  error: boolean;
  users: UserType[];
  count: number;
}

export interface fetchUsersState {
  skip: number;
  limit: number;
}
