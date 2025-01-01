import {ActivatedRoute, Router} from "@angular/router";
import {Component, HostListener, OnInit} from '@angular/core';
import {ActiveParamsType} from "../../../../types/active-params.type";
import {ActiveParamsUtil} from "../../../shared/utils/active-params.util";
import {AppliedFilterType} from "../../../../types/applied-filter.type";
import {ArticleService} from "../../../shared/services/article.service";
import {ArticleType} from "../../../../types/article.type";
import {ArticlesResponseType} from "../../../../types/articles-response.type";
import {CategoryType} from "../../../../types/category.type";
import {debounceTime} from "rxjs";


@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.scss'
})
export class CatalogComponent implements OnInit {
  protected articles: ArticleType[] = [];
  protected categories: CategoryType[] = [];
  protected isOpenFilter = false;
  protected activeParams: ActiveParamsType = {categories: []};
  protected appliedFilters: AppliedFilterType[] = [];
  protected pages: number[] = [];

  constructor(private articleService: ArticleService,
              private router: Router,
              private activatedRoute: ActivatedRoute,) {
  }

  public ngOnInit(): void {
    this.articleService.getCategories()
      .subscribe((data: CategoryType[]) => {
        this.categories = data;

        this.activatedRoute.queryParams
          .pipe(
            debounceTime(500)
          )
          .subscribe(params => {
            this.activeParams = ActiveParamsUtil.processParams(params);

            this.appliedFilters = [];
            this.activeParams.categories.forEach(url => {
              const foundCategory = this.categories.find(item => item.url === url);

              if (foundCategory) {
                this.appliedFilters.push({
                  name: foundCategory.name,
                  url: url
                });
              }
            });

            this.articleService.getArticles(this.activeParams)
              .subscribe((data: ArticlesResponseType) => {
                this.pages = [];
                for (let i = 1; i <= data.pages; i++) {
                  this.pages.push(i);
                }
                this.articles = data.items;
              });
          });
      });
  }

  protected toggleFilter(): void {
    this.isOpenFilter = !this.isOpenFilter;
  }

  protected updateFilterParam(url: string): void {
    if (this.activeParams.categories && this.activeParams.categories.length > 0) {
      const existingCategoryInParams = this.activeParams.categories.find(item => item === url);

      if (existingCategoryInParams) {
        this.activeParams.categories = this.activeParams.categories.filter(item => item !== url);
      } else {
        this.activeParams.categories = [...this.activeParams.categories, url];
      }
    } else {
      this.activeParams.categories = [url];
    }

    this.activeParams.page = 1;
    this.router.navigate(['/blog'], {queryParams: this.activeParams}).then();
  }

  protected removeAppliedFilter(url: string): void {
    this.activeParams.categories = this.activeParams.categories.filter(item => item !== url);
    this.activeParams.page = 1;
    this.router.navigate(['/blog'], {queryParams: this.activeParams}).then();
  }

  protected openPage(page: number): void {
    this.activeParams.page = page;
    this.router.navigate(['/blog'], {queryParams: this.activeParams}).then();
  }

  protected openPrevPage(): void {
    if (this.activeParams.page && this.activeParams.page > 1) {
      this.activeParams.page--;
      this.router.navigate(['/blog'], {queryParams: this.activeParams}).then();
    }
  }

  protected openNextPage(): void {
    if (!this.activeParams.page) {
      this.activeParams.page = 1;
    }

    if (this.activeParams.page && this.activeParams.page < this.pages.length) {
      this.activeParams.page++;
      this.router.navigate(['/blog'], {queryParams: this.activeParams}).then();
    }
  }

  @HostListener('document:click', ['$event'])
  click(event: Event): void {
    const target = event.target as HTMLElement;
    if (this.isOpenFilter && target.className && target.className.indexOf('catalog-filter') === -1) {
      this.isOpenFilter = false;
    }
  }
}
