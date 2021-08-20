import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NZ_I18N} from 'ng-zorro-antd/i18n';
import {en_US} from 'ng-zorro-antd/i18n';
import {registerLocaleData} from '@angular/common';
import en from '@angular/common/locales/en';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NzLayoutModule} from 'ng-zorro-antd/layout';
import {NzMenuModule} from 'ng-zorro-antd/menu';
import {NzGridModule} from 'ng-zorro-antd/grid';
import {HeaderComponent} from './shared/header/header.component';
import {FooterComponent} from './shared/footer/footer.component';
import {ListRecipeComponent} from './recipe/list-recipe/list-recipe.component';
import {NzCardModule} from 'ng-zorro-antd/card';
import {NzAvatarModule} from 'ng-zorro-antd/avatar';
import {NzIconModule} from 'ng-zorro-antd/icon';
import {NzSpaceModule} from 'ng-zorro-antd/space';
import {RecipeItemComponent} from './recipe/list-recipe/recipe-item/recipe-item.component';
import {NzSpinModule} from 'ng-zorro-antd/spin';
import {RecipeDetailComponent} from './recipe/recipe-detail/recipe-detail.component';
import {NzImageModule} from 'ng-zorro-antd/image';
import {NzListModule} from 'ng-zorro-antd/list';
import {NzDividerModule} from 'ng-zorro-antd/divider';
import {NzFormModule} from 'ng-zorro-antd/form';
import {LoginComponent} from './auth/login/login.component';
import {NzInputModule} from 'ng-zorro-antd/input';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {SignupComponent} from './auth/signup/signup.component';
import {NzAlertModule} from 'ng-zorro-antd/alert';
import {AuthInterceptorService} from './service/auth-interceptor.service';
import {NzModalModule} from 'ng-zorro-antd/modal';
import { AuthMessageComponent } from './auth/auth-message/auth-message.component';
import { AddRecipeComponent } from './recipe/add-recipe/add-recipe.component';
import {NzInputNumberModule} from 'ng-zorro-antd/input-number';
import {NzMessageModule} from 'ng-zorro-antd/message';
import {NzUploadModule} from 'ng-zorro-antd/upload';

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ListRecipeComponent,
    RecipeItemComponent,
    RecipeDetailComponent,
    LoginComponent,
    SignupComponent,
    AuthMessageComponent,
    AddRecipeComponent
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'serverApp'}),
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NzLayoutModule,
    NzMenuModule,
    NzGridModule,
    NzCardModule,
    NzIconModule,
    NzSpinModule,
    NzImageModule,
    NzListModule,
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    NzAlertModule,
    NzModalModule,
    NzInputNumberModule,
    NzMessageModule,
    NzUploadModule,
  ],
  providers: [
    {provide: NZ_I18N, useValue: en_US},
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
