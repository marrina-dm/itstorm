import {RouterModule, Routes} from '@angular/router';
import {CatalogComponent} from "./catalog/catalog.component";
import {DetailComponent} from "./detail/detail.component";
import {NgModule} from '@angular/core';


const routes: Routes = [
  {path: 'blog', component: CatalogComponent},
  {path: 'blog/:url', component: DetailComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogRoutingModule {
}
