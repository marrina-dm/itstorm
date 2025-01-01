import {BlogCardComponent} from './components/blog-card/blog-card.component';
import {CommonModule} from '@angular/common';
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {NgModule} from '@angular/core';
import {NgxMaskDirective} from "ngx-mask";
import {PopupOrderComponent} from './components/popup-order/popup-order.component';
import {ReactiveFormsModule} from "@angular/forms";
import {RouterLink} from "@angular/router";


@NgModule({
  declarations: [
    BlogCardComponent,
    PopupOrderComponent,
  ],
  imports: [
    CommonModule,
    MatProgressSpinner,
    RouterLink,
    ReactiveFormsModule,
    NgxMaskDirective
  ],
  exports: [
    BlogCardComponent,
    PopupOrderComponent
  ],
})
export class SharedModule {
}
