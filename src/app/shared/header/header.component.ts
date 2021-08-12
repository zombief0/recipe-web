import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../../service/auth.service';
import {Subscription} from 'rxjs';
import {NzModalRef, NzModalService} from 'ng-zorro-antd/modal';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  email = null;
  private userSub: Subscription;
  confirmModal?: NzModalRef;

  constructor(private authService: AuthService,
              private modalService: NzModalService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user;
      if (user) {
        this.email = user.username;
      }
    });
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

  onLogout(): void {
    this.confirmModal = this.modalService.confirm({
      nzTitle: 'Do you want to logout?',
      nzContent: '',
      nzOnOk: () => {
      this.authService.logout();
    }
    });
  }
}
