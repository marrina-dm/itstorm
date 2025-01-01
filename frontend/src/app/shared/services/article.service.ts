import {ActiveParamsType} from "../../../types/active-params.type";
import {ArticleType} from "../../../types/article.type";
import {ArticlesResponseType} from "../../../types/articles-response.type";
import {CategoryType} from "../../../types/category.type";
import {HttpClient} from "@angular/common/http";
import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  constructor(private http: HttpClient) {
  }

  public getTopArticles(): Observable<ArticleType[]> {
    return this.http.get<ArticleType[]>(environment.api + 'articles/top');
  }

  public getCategories(): Observable<CategoryType[]> {
    return this.http.get<CategoryType[]>(environment.api + 'categories');
  }

  public getArticles(params: ActiveParamsType): Observable<ArticlesResponseType> {
    return this.http.get<ArticlesResponseType>(environment.api + 'articles', {
      params: params
    });
  }

  public getArticle(url: string): Observable<ArticleType> {
    return this.http.get<ArticleType>(environment.api + 'articles/' + url);
  }

  public getRelatedArticle(url: string): Observable<ArticleType[]> {
    return this.http.get<ArticleType[]>(environment.api + 'articles/related/' + url);
  }
}
