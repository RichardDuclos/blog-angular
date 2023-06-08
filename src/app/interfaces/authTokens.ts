import {User} from "../models/user.model";

export interface AuthTokens {
  accessToken: string;
  user: User;
}
