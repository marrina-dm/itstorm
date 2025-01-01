import {ArticleType} from "./article.type";


export interface ArticlesResponseType {
  count: number,
  pages: number,
  items: ArticleType[]
}
