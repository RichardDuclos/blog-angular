import {User} from "./user.model";
import {Comment} from "./comment.model";

export interface Article {
  id?: number;
  title?: string;
  content?: string;
  user?: User,
  userId?: number,
  comments?: Comment[];
}
