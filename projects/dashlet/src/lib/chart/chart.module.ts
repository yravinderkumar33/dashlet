import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartjsComponent } from './components';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [ChartjsComponent],
  imports: [
    ChartsModule,
    CommonModule
  ],
  exports: [ChartjsComponent]
})
export class ChartModule { }
