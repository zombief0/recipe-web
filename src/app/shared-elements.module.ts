import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NzGridModule} from 'ng-zorro-antd/grid';
import {NzIconModule} from 'ng-zorro-antd/icon';
import {NzSpinModule} from 'ng-zorro-antd/spin';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {NzMessageModule} from 'ng-zorro-antd/message';

@NgModule({
  imports: [
    CommonModule,
    NzGridModule,
    NzIconModule,
    NzSpinModule,
    NzButtonModule,
    NzMessageModule,
  ],
  exports: [
    CommonModule,
    NzGridModule,
    NzIconModule,
    NzSpinModule,
    NzButtonModule,
    NzMessageModule,
  ]
})
export class SharedElementsModule {

}
