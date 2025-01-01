import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBarModule} from "@angular/material/snack-bar";
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {AuthInterceptor} from "./core/auth/auth.interceptor";
import {BrowserModule} from '@angular/platform-browser';
import {CarouselModule} from "ngx-owl-carousel-o";
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {FooterComponent} from './shared/layout/footer/footer.component';
import {HeaderComponent} from './shared/layout/header/header.component';
import {LayoutComponent} from './shared/layout/layout.component';
import {MainComponent} from './views/main/main.component';
import {MatMenuModule} from "@angular/material/menu";
import {NgModule} from '@angular/core';
import {PolicyComponent} from './views/policy/policy.component';
import {SharedModule} from "./shared/shared.module";
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {provideEnvironmentNgxMask} from "ngx-mask";


@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    HeaderComponent,
    FooterComponent,
    MainComponent,
    PolicyComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FontAwesomeModule,
    MatSnackBarModule,
    MatMenuModule,
    SharedModule,
    CarouselModule
  ],
  providers: [
    provideAnimationsAsync(),
    {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 2500}},
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    provideEnvironmentNgxMask()
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
