import {BlogRoutingModule} from './blog-routing.module';
import {CatalogComponent} from './catalog/catalog.component';
import {CommonModule} from '@angular/common';
import {DetailComponent} from './detail/detail.component';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "../../shared/shared.module";


@NgModule({
  declarations: [
    CatalogComponent,
    DetailComponent
  ],
  imports: [
    CommonModule,
    BlogRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class BlogModule {
}
