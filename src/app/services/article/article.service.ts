import {Injectable} from "@angular/core";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {Article} from "../../models/article.model";
import {HttpClient} from "@angular/common/http";
import {Comment} from "../../models/comment.model";

@Injectable({
  providedIn: "root"
})
export class ArticleService {
  apiUrl: string;
  constructor(private http: HttpClient) {
    this.apiUrl = environment.apiURL + '/articles'
  }
  getAll(): Observable<Article[]> {
    return this.http.get<Article[]>(`${this.apiUrl}?_expand=user&_embed=comments`)
  }

  get(id: number): Observable<Article> {
    return this.http.get<Article>(`${this.apiUrl}/${id}/?_embed=comments&_expand=user`)
  }

  create(article: Article): Observable<Article> {
    // -------------
    if(article.user) {
      article.user = undefined
    }
    // this is specific to json server as we don't want to duplicate users and articles
    return this.http.post(`${this.apiUrl}`, article)
  }
  delete(article: Article) {
    return this.http.delete(`${this.apiUrl}/${article.id}`)
  }
}
