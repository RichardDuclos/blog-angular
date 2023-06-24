import {Article} from "./article.model";

export interface User {
  id?: number;
  username?: string;
  email?: string;
  password?: string;
  admin?: boolean;
  comments?: Comment[];
  articles?: Article[];
}
