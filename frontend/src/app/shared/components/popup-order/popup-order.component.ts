import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {ArticleService} from "../../services/article.service";
import {CategoryType} from "../../../../types/category.type";
import {DefaultResponseType} from "../../../../types/default-response.type";
import {OrderRequestType} from "../../../../types/order-request.type";
import {OrderService} from "../../services/order.service";
import {Popup} from "../../../../types/popup.enum";


@Component({
  selector: 'app-popup-order',
  templateUrl: './popup-order.component.html',
  styleUrl: './popup-order.component.scss'
})
export class PopupOrderComponent implements OnInit, OnChanges {
  @Input() type: Popup = Popup.order;
  @Input() service = 'frilans';

  @Output() closePopup = new EventEmitter();

  protected title = 'Заявка на услугу';
  protected buttonText = 'Оставить заявку';
  protected services: CategoryType[] = [];
  protected popupType = Popup;
  protected isSuccess = false;
  protected error = false;
  protected orderForm = this.fb.group({
    service: [this.service, Validators.required],
    name: ['', Validators.required],
    phone: ['', Validators.required],
  })

  constructor(private articleService: ArticleService,
              private orderService: OrderService,
              private fb: FormBuilder,) {
  }

  public ngOnInit(): void {
    if (this.type === Popup.consultation) {
      this.title = 'Закажите бесплатную консультацию!';
      this.buttonText = 'Заказать консультацию';
    }

    this.articleService.getCategories()
      .subscribe((data: CategoryType[]) => {
        this.services = data;
      })
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['service']) {
      this.orderForm.controls.service.setValue(this.service);
    }

    if (changes['type']) {
      if (this.type === Popup.consultation) {
        this.orderForm.controls.service.clearValidators();
      } else {
        this.orderForm.controls.service.setValidators(Validators.required);
      }
    }
  }

  protected close(): void {
    this.closePopup.emit();
  }

  protected createOrder(): void {
    if (this.orderForm.valid && this.orderForm.value.name && this.orderForm.value.phone) {
      let request: OrderRequestType = {
        type: this.type,
        name: this.orderForm.value.name,
        phone: this.orderForm.value.phone,
      };

      if (this.type === Popup.order) {
        request = {
          ...request,
          service: this.orderForm.value.service!
        }
      }

      this.orderService.order(request)
        .subscribe({
          next: (data: DefaultResponseType) => {
            if (data.error) {
              this.error = true;
              throw new Error(data.message);
            }

            this.isSuccess = true;
            this.title = 'Спасибо за вашу заявку!';
          },
          error: () => {
            this.error = true;
          }
        })
    }
  }
}
