import {Injectable} from "@angular/core";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {Article} from "../../models/article.model";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Comment} from "../../models/comment.model";

@Injectable({
  providedIn: "root"
})
export class ArticleService {
  apiUrl: string;
  constructor(private http: HttpClient) {
    this.apiUrl = environment.apiURL
  }
  getAll(limit: number, page: number, userId?: number): Observable<HttpResponse<Article[]>> {
    if(!userId) {
      return this.http.get<Article[]>(`${this.apiUrl}/articles?_expand=user&_embed=comments&_limit=${limit}&_page=${page}`, {observe: 'response'})
    } else {
      return this.http.get<Article[]>(`${this.apiUrl}/users/${userId}/articles?_expand=user&_embed=comments&_limit=${limit}&_page=${page}`, {observe: 'response'})
    }
  }

  get(id: number): Observable<Article> {
    return this.http.get<Article>(`${this.apiUrl}/articles/${id}/?_embed=comments&_expand=user`)
  }

  create(article: Article): Observable<Article> {
    // -------------
    if(article.user) {
      article.user = undefined
    }
    // this is specific to json server as we don't want to duplicate users and articles
    return this.http.post(`${this.apiUrl}/articles`, article)
  }
  delete(article: Article) {
    return this.http.delete(`${this.apiUrl}/articles/${article.id}`)
  }
}
