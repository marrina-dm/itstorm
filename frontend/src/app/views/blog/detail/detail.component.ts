import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Action} from "../../../../types/action.enum";
import {ActionResponseType} from "../../../../types/actions-response.type";
import {ActivatedRoute} from "@angular/router";
import {ArticleService} from "../../../shared/services/article.service";
import {ArticleType} from "../../../../types/article.type";
import {AuthService} from "../../../core/auth/auth.service";
import {CommentResponse} from "../../../../types/comments-response.type";
import {CommentService} from "../../../shared/services/comment.service";
import {CommentType} from "../../../../types/comment.type";
import {DefaultResponseType} from "../../../../types/default-response.type";
import {HttpErrorResponse} from "@angular/common/http";
import {MatSnackBar} from "@angular/material/snack-bar";
import {environment} from "../../../../environments/environment";


@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss'
})
export class DetailComponent implements OnInit {
  protected article!: ArticleType;
  protected relatedArticles: ArticleType[] = [];
  protected comments: CommentType[] = [];
  protected serverStaticPath = environment.serverStaticPath;
  protected isLogged = false;
  protected allCount = 0;
  protected offset = 3;
  protected action = Action;
  protected appliedLikes: string[] = [];
  protected appliedDislikes: string[] = [];
  protected commentForm: FormGroup = this.fb.group({
    text: ['', Validators.required],
  });

  constructor(private articleService: ArticleService,
              private commentService: CommentService,
              private authService: AuthService,
              private activatedRoute: ActivatedRoute,
              private fb: FormBuilder,
              private _snackBar: MatSnackBar,) {
    this.isLogged = this.authService.getIsLoggedIn();
  }

  public ngOnInit(): void {
    this.authService.isLogged$.subscribe(isLogged => {
      this.isLogged = isLogged;
    });

    this.activatedRoute.params.subscribe(params => {
      this.articleService.getArticle(params['url'])
        .subscribe((data: ArticleType) => {
          this.article = data;

          this.commentService.getComments(this.article.id)
            .subscribe((comments: CommentResponse) => {
              this.comments = comments.comments.slice(0, 3);
              this.allCount = comments.allCount;

              this.getAppliedActions();
            });
        });

      this.articleService.getRelatedArticle(params['url'])
        .subscribe((data: ArticleType[]) => {
          this.relatedArticles = data;
        });
    });
  }

  protected addComment(): void {
    if (this.commentForm.valid && this.commentForm.value.text) {
      this.commentService.addComment(this.commentForm.value.text, this.article.id)
        .subscribe((data: DefaultResponseType) => {
          if (!data.error) {
            this.commentService.getComments(this.article.id)
              .subscribe((comments: CommentResponse) => {
                this.comments = comments.comments.slice(0, 3);
                this.allCount = comments.allCount;
              });

            this.commentForm.reset();
            this.offset = 3;
          }

          this._snackBar.open(data.message);
        });
    }
  }

  protected openMoreComments(): void {
    this.commentService.getComments(this.article.id, this.offset)
      .subscribe((comments: CommentResponse) => {
        this.comments = [...this.comments, ...comments.comments.slice(0, 10)];
        this.offset += 10;
      });
  }

  protected sendAction(action: Action, id: string): void {
    if (!this.isLogged) {
      this._snackBar.open('Войдите или зарегистрируйтесь!');
    } else {
      this.commentService.sendAction(action, id)
        .subscribe({
          next: (data: DefaultResponseType) => {
            if (data.error) {
              this._snackBar.open(data.message);
              throw new Error(data.message);
            }

            if (action === Action.violate) {
              this._snackBar.open('Жалоба отправлена');
            } else {
              this._snackBar.open('Ваш голос учтен');
              this.commentService.getComments(this.article.id)
                .subscribe((comments: CommentResponse) => {
                  this.comments = comments.comments.slice(0, this.offset);

                  this.getAppliedActions();
                });
            }
          },
          error: () => {
            if (action === Action.violate) {
              this._snackBar.open('Жалоба уже отправлена');
            }
          }
        });
    }
  }

  private getAppliedActions(): void {
    if (this.isLogged) {
      this.commentService.getActions(this.article.id)
        .subscribe({
          next: (data: DefaultResponseType | ActionResponseType[]) => {
            if ((data as DefaultResponseType).error !== undefined) {
              const error = (data as DefaultResponseType).message;

              this._snackBar.open(error);
              throw new Error(error);
            }

            const response = data as ActionResponseType[];
            this.appliedLikes = response.filter(item => item.action === Action.like).map(item => item.comment);
            this.appliedDislikes = response.filter(item => item.action === Action.dislike).map(item => item.comment);
          },
          error: (errorResponse: HttpErrorResponse) => {
            if (errorResponse.error && errorResponse.error.message) {
              this._snackBar.open(errorResponse.error.message);
            } else {
              this._snackBar.open('Ошибка получения данных о реакциях');
            }
          }
        });
    }
  }
}
