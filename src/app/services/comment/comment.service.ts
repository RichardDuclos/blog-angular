import {Injectable} from "@angular/core";
import {environment} from "../../../environments/environment";
import {Comment} from "../../models/comment.model";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Article} from "../../models/article.model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: "root"
})
export class CommentService {
  apiUrl: string;
  constructor(private http: HttpClient) {
    this.apiUrl = environment.apiURL;
  }

  create(comment: Comment) {
    // -------------
    if(comment.article) {
      comment.article = undefined;
    }
    if(comment.user) {
      comment.user = undefined
    }
    // this is specific to json server as we don't want to duplicate users and articles
    comment.date = new Date()
    return this.http.post<Comment>(`${this.apiUrl}/comments`, comment)
  }

  get(article: Article, limit: number): Observable<HttpResponse<Comment[]>> {
    return this.http.get<Comment[]>(`${this.apiUrl}/articles/${article.id}/comments?_expand=article&_expand=user&_limit=${limit}&_sort=date&_order=asc`, {observe: 'response'})
  }

  delete(comment: Comment) {
    return this.http.delete(`${this.apiUrl}/comments/${comment.id}`)
  }

  edit(comment: Comment): Observable<Comment> {
    return this.http.patch<Comment>(`${this.apiUrl}/comments/${comment.id}`, comment)
  }
}
