import {Component, ElementRef, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {ArticleService} from "../../shared/services/article.service";
import {ArticleType} from "../../../types/article.type";
import {OwlOptions} from "ngx-owl-carousel-o";
import {Popup} from "../../../types/popup.enum";


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent implements OnInit {
  @ViewChild('popup') popup!: TemplateRef<ElementRef>;
  private dialogRef: MatDialogRef<any> | null = null;

  protected articles: ArticleType[] = [];
  protected popupType = Popup;
  protected serviceType = '';
  protected customOptionsBanners: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    dots: true,
    navText: ['', ''],
    items: 1,
    nav: false,
  };
  protected customOptionsReviews: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    dots: false,
    navText: ['', ''],
    items: 3,
    margin: 25,
    nav: false,
  };
  protected services = [
    {
      type: 'frilans',
      title: 'Создание сайтов',
      image: 'create-site.png',
      price: 7500,
      text: `В&nbsp;краткие сроки мы&nbsp;создадим качественный и&nbsp;самое главное продающий сайт для продвижения Вашего бизнеса!`
    },
    {
      type: 'target',
      title: 'Продвижение',
      image: 'moved.png',
      price: 3500,
      text: `Вам нужен качественный <br>SMM-специалист или грамотный таргетолог? Мы&nbsp;готовы оказать Вам услугу &laquo;Продвижения&raquo; на&nbsp;наивысшем уровне!`
    },
    {
      type: 'smm',
      title: 'Реклама',
      image: 'marketing.png',
      price: 1000,
      text: `Без рекламы не&nbsp;может обойтись ни&nbsp;один бизнес или специалист. Обращаясь к&nbsp;нам, мы&nbsp;гарантируем быстрый прирост клиентов за&nbsp;счёт правильно настроенной рекламы.`
    },
    {
      type: 'kopiraiting',
      title: 'Копирайтинг',
      image: 'copyright.png',
      price: 750,
      text: `Наши копирайтеры готовы написать Вам любые продающие текста, которые не&nbsp;только обеспечат рост охватов, но&nbsp;и помогут выйти на&nbsp;новый уровень в&nbsp;продажах.`
    },
  ];
  protected reviews = [
    {
      name: 'Станислав',
      image: 'review1.png',
      text: 'Спасибо огромное АйтиШторму за прекрасный блог с полезными статьями! Именно они и побудили меня углубиться в тему SMM и начать свою карьеру.'
    },
    {
      name: 'Алёна',
      image: 'review2.png',
      text: 'Обратилась в АйтиШторм за помощью копирайтера. Ни разу ещё не пожалела! Ребята действительно вкладывают душу в то, что делают, и каждый текст, который я получаю, с нетерпением хочется выложить в сеть.'
    },
    {
      name: 'Мария',
      image: 'review3.png',
      text: 'Команда АйтиШторма за такой короткий промежуток времени сделала невозможное: от простой фирмы по услуге продвижения выросла в мощный блог о важности личного бренда. Класс!'
    },
    {
      name: 'Аделина',
      image: 'review4.jpg',
      text: 'Спасибо огромное АйтиШторму за прекрасный блог с полезными статьями! Именно они и побудили меня углубиться в тему SMM и начать свою карьеру.'
    },
    {
      name: 'Яника',
      image: 'review5.jpg',
      text: 'Обратилась в АйтиШторм за помощью копирайтера. Ни разу ещё не пожалела! Ребята действительно вкладывают душу в то, что делают, и каждый текст, который я получаю, с нетерпением хочется выложить в сеть.'
    },
    {
      name: 'Марина',
      image: 'review6.jpg',
      text: 'Команда АйтиШторма за такой короткий промежуток времени сделала невозможное: от простой фирмы по услуге продвижения выросла в мощный блог о важности личного бренда. Класс!'
    },
    {
      name: 'Станислав',
      image: 'review7.jpg',
      text: 'Спасибо огромное АйтиШторму за прекрасный блог с полезными статьями! Именно они и побудили меня углубиться в тему SMM и начать свою карьеру.'
    }
  ];

  constructor(private articleService: ArticleService,
              private dialog: MatDialog,) {
  }

  public ngOnInit(): void {
    this.articleService.getTopArticles()
      .subscribe((data: ArticleType[]) => {
        this.articles = data;
      })
  }

  protected openPopup(serviceType: string): void {
    this.dialogRef = this.dialog.open(this.popup);
    this.serviceType = serviceType;
  }

  protected closePopup(): void {
    this.dialogRef?.close();
  }
}
