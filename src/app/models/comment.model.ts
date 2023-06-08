import {User} from "./user.model";
import {Article} from "./article.model";

export interface Comment {
  id?: number;
  content?: string;
  user?: User;
  article?: Article;
  userId?: number;
  articleId?: number;
  date?: Date
}
