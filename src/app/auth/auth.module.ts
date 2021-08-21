import {NgModule} from '@angular/core';
import {LoginComponent} from './login/login.component';
import {SignupComponent} from './signup/signup.component';
import {AuthMessageComponent} from './auth-message/auth-message.component';
import {SharedFormModule} from '../shared-form.module';
import {NzAlertModule} from 'ng-zorro-antd/alert';
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent,
    AuthMessageComponent,
  ],
  imports: [
    SharedFormModule,
    NzAlertModule,
    RouterModule.forChild([
      {
        path: 'login', component: LoginComponent,
        children: [
          {
            path: ':data', component: AuthMessageComponent
          }
        ]
      },
      {
        path: 'signup', component: SignupComponent
      }
    ])
  ]
})
export class AuthModule {

}
