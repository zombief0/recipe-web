import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {NzInputNumberModule} from 'ng-zorro-antd/input-number';
import {NzUploadModule} from 'ng-zorro-antd/upload';
import {NzFormModule} from 'ng-zorro-antd/form';
import {SharedElementsModule} from './shared-elements.module';
import {NzInputModule} from 'ng-zorro-antd/input';

@NgModule({
  imports: [
    ReactiveFormsModule,
    NzInputNumberModule,
    NzUploadModule,
    NzFormModule,
    SharedElementsModule,
    NzInputModule,
  ],
  exports: [
    ReactiveFormsModule,
    NzInputNumberModule,
    NzUploadModule,
    NzFormModule,
    SharedElementsModule,
    NzInputModule,
  ]
})
export class SharedFormModule {

}
