import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Petfriendly1Component } from './petfriendly1/petfriendly1.component';



@NgModule({
  declarations: [Petfriendly1Component],
  imports: [
    CommonModule
  ],
  exports: [Petfriendly1Component]
})
export class AdvertisementModule { }
