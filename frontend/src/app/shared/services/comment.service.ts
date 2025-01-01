import {Action} from "../../../types/action.enum";
import {ActionResponseType} from "../../../types/actions-response.type";
import {CommentResponse} from "../../../types/comments-response.type";
import {DefaultResponseType} from "../../../types/default-response.type";
import {HttpClient} from "@angular/common/http";
import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class CommentService {
  constructor(private http: HttpClient) {
  }

  public getComments(id: string, offset = 0): Observable<CommentResponse> {
    return this.http.get<CommentResponse>(environment.api + 'comments', {
      params: {
        offset: offset,
        article: id
      }
    });
  }

  public addComment(text: string, articleId: string): Observable<DefaultResponseType> {
    return this.http.post<DefaultResponseType>(environment.api + 'comments', {
      text,
      article: articleId
    });
  }

  public getActions(articleId: string): Observable<ActionResponseType[] | DefaultResponseType> {
    return this.http.get<ActionResponseType[] | DefaultResponseType>(environment.api + `comments/article-comment-actions`, {
      params: {articleId: articleId}
    });
  }

  public sendAction(action: Action, commentId: string): Observable<DefaultResponseType> {
    return this.http.post<DefaultResponseType>(environment.api + `comments/${commentId}/apply-action`, {
      action
    });
  }
}
