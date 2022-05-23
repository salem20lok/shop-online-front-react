import UserType from "../../@Types/UserType";

export interface UserState {
  error: boolean;
  loading: boolean;
  profile: UserType;
}

export interface saveProfilePayload {
  profile: UserType;
}
