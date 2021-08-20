import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable, Subject, throwError} from 'rxjs';
import {environment} from '../../environments/environment';
import {AuthResponseModel} from '../models/auth-response.model';
import {catchError, tap} from 'rxjs/operators';
import {UserModel} from '../models/user.model';
import {NzModalService} from 'ng-zorro-antd/modal';
import {Router} from '@angular/router';
import {UserSaveModel} from '../models/user-save.model';
import {MessageModel} from '../models/message.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user = new BehaviorSubject<UserModel>(null);
  private tokenExpirationTimer: any;

  constructor(private http: HttpClient,
              private router: Router) {
  }

  login(username: string, password: string): Observable<AuthResponseModel> {
    const URL_LOGIN = environment.baseApiUrl + 'login';
    return this.http.post<AuthResponseModel>(URL_LOGIN, {
      username,
      password,
    }).pipe(catchError(err => {
      let error = 'An unknown error occured';
      // tslint:disable-next-line:triple-equals
      if (err.status == 401) {
        error = 'Invalid email or password';
      }
      return throwError(error);
    }), tap(resData => {
      const expirationDate = new Date(new Date().getTime() + resData.expiresIn);
      const userModel = new UserModel();
      userModel.username = resData.username;
      userModel.role = resData.role;
      userModel.id = resData.id;
      userModel.token = resData.token;
      userModel.tokenExpirationDate = expirationDate;

      this.user.next(userModel);
      this.autoLogout(resData.expiresIn);
      localStorage.setItem('userData', JSON.stringify(userModel));
    }));
  }

  logout(): void {
    this.user.next(null);
    this.router.navigate(['/login']);
    localStorage.removeItem('userData');

    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  autoLogin(): void {
    const userString: {
      id: string,
      role: string,
      token: string,
      username: string,
      tokenExpirationDate: string
    } = JSON.parse(localStorage.getItem('userData'));

    if (!userString) {
      return;
    }

    const loadedUser = new UserModel();
    loadedUser.id = +userString.id;
    loadedUser.role = userString.role;
    loadedUser.username = userString.username;
    loadedUser.token = userString.token;
    loadedUser.tokenExpirationDate = new Date(userString.tokenExpirationDate);

    if (loadedUser.getToken) {
      this.user.next(loadedUser);
      const expirationDuration = new Date(userString.tokenExpirationDate).getTime() - new Date().getTime();
      this.autoLogout(expirationDuration);
    }
  }

  autoLogout(expirationDuration: number): void {
    console.log(expirationDuration);
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  signup(userSaveModel: UserSaveModel): Observable<MessageModel> {
    const URL_SIGNIN = environment.baseServiceUrl + 'user';
    return this.http
      .post<MessageModel>(URL_SIGNIN, userSaveModel)
      .pipe(catchError(err => {
        console.log(err);
        let error = 'An unknown error occured';
        if (err.error.message === 'EMAIL_ALREADY_EXISTS') {
          error = 'Email already taken';
        }

        if (err.error.message === 'USER_NOT_ACTIVE') {
          error = 'User already registered please activate your account';
        }
        return throwError(error);
      }));
  }
}
